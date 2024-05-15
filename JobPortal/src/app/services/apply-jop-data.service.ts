import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, deleteDoc, setDoc,query, where,getDocs } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { applyjob } from '../Interfaces/applyjob';

@Injectable({
  providedIn: 'root'
})
export class ApplyJopDataService {

  private firestore = inject(Firestore);
  applyjobCollection = collection(this.firestore, 'applyJob');

  constructor() { }



  getapplicationsByidOfJob(idOfJob:string):Observable<applyjob[]>{
    const jobsQuery = query(this.applyjobCollection, where('idOfJob', '==', idOfJob));
    return from(getDocs(jobsQuery)).pipe( map(snapshot => snapshot.docs.map(doc => doc.data() as applyjob)));
  }



  addJobApplication(application: applyjob): Observable<string> {
    const respon =  addDoc(this.applyjobCollection, application).then((response)=>{
      return response.id;
    });

    return from(respon);
  }



}
