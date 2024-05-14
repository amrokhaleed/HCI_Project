import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, deleteDoc, setDoc,query, where,getDocs } from '@angular/fire/firestore';

import { response } from 'express';
import { from , Observable } from 'rxjs';
import { User_account } from '../Interfaces/user-account'; // Import the user interface
import { map } from 'rxjs/operators';
import { company_account } from '../Interfaces/company-account';
@Injectable({
  providedIn: 'root'
})
export class AccountsDataService {

  private firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'Users');
  campaniesCollection = collection(this.firestore, 'Companies');

  constructor() {}

  gettype(): string {
    const type = localStorage.getItem('type');
    return type !== null ? type : ''; // Return type if found, otherwise an empty string
}

getemail(): string {
    const email = localStorage.getItem('email');
    return email !== null ? email : ''; // Return email if found, otherwise an empty string
}


getuserobject(): Observable<User_account | undefined> {
  let email = this.getemail();
  const usersQuery = query(this.usersCollection, where('email', '==', email));
  return from(getDocs(usersQuery)).pipe(
    map((querySnapshot) => {
      if (!querySnapshot.empty) {
        // If there is at least one document matching the query
        const userData = querySnapshot.docs[0].data(); // Assuming there's only one user with the provided email
        const id = querySnapshot.docs[0].id;
        return {
          id,
          fname: userData['fname'],
          lname: userData['lname'],
          email: userData['email'],
          password: userData['password'],
          job_title: userData['job_title'],
          decription_of_job: userData['decription_of_job'],
          salary: userData['salary'],
          address: userData['address'],
          jobs_completed: userData['jobs_completed'],
          skills: userData['skills'],
        } as User_account; // Create a User_account object with id and user data
      } else {
        // If no document matches the query
        return undefined; // Return undefined indicating no user found
      }
    })
  );
}


  getAllUsers(): Observable<User_account[]> {
    return collectionData(this.usersCollection , {idField:'id'}) as Observable<User_account[]>;
  }

  getAllcompanies(): Observable<company_account[]> {
    return collectionData(this.campaniesCollection , {idField:'id'}) as Observable<company_account[]>;
  }



  /*checkUserIfExists(email: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map(users => {
        return users.some(u => u.email === email);}));
  }

  checkCompaniesIfExists(email: string): Observable<boolean> {
    return this.getAllcompanies().pipe(
      map(companies => {
        return companies.some(u => u.email === email);}));
  }*/


  addUser(user: User_account): Observable<string> {
    const respon =  addDoc(this.usersCollection, user).then((response)=>{
      return response.id;
    });

    return from(respon);
  }

  addcompany(company: company_account): Observable<string> {
    const respon =  addDoc(this.campaniesCollection, company).then((response)=>{
      return response.id;
    });

    return from(respon);
  }
  updateUser(user: User_account): Observable<void> {
    let email = this.getemail();
    const usersQuery = query(this.usersCollection, where('email', '==', email));

    return from(getDocs(usersQuery).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const userDocRef = doc.ref;
        setDoc(userDocRef, user, { merge: true }); // Use merge option to merge with existing document if it exists
      });
    }));
  }

  /*updateUser(id:string , user: User_account): Observable<void> {

    const userDoc = doc(this.usersCollection, 'Users'+id);
    const promises = setDoc(userDoc, user);

    return from(promises);
  }



  deleteUser(userId: string): Observable<void> {
    const userDoc = doc(this.usersCollection, 'Users'+userId);
    const promises = deleteDoc(userDoc);
    return from(promises);
  }*/


}
