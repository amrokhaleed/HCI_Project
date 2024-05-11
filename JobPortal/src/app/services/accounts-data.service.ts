import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
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
