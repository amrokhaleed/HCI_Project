import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, deleteDoc, setDoc,query, where,getDocs } from '@angular/fire/firestore';
import { from , map, Observable } from 'rxjs';
import { Job } from '../Interfaces/job';

@Injectable({
  providedIn: 'root'
})
export class JobsDataService {

  private firestore = inject(Firestore);
  jobssCollection = collection(this.firestore, 'Jobs');


  constructor() { }

  getAlljobs(): Observable<Job[]> {
    return collectionData(this.jobssCollection , {idField:'id'}) as Observable<Job[]>;
  }

  getJobsByEmail(email:string):Observable<Job[]>{
    const jobsQuery = query(this.jobssCollection, where('email', '==', email));
    return from(getDocs(jobsQuery)).pipe( map(snapshot => snapshot.docs.map(doc => doc.data() as Job)));

  }



  addjob(job: Job): Observable<string> {
    const respon =  addDoc(this.jobssCollection, job).then((response)=>{
      return response.id;
    });

    return from(respon);
  }


  deleteJob(jobId: string): Observable<void> {

    const jobDocRef = doc(this.firestore, 'Jobs', jobId);
    const deletionPromise = deleteDoc(jobDocRef);
    return from(deletionPromise);

  }

  updateJob(jobId: string, updatedJob: Job): Observable<void> {

    const jobDocRef = doc(this.firestore, 'Jobs', jobId);
    const updatePromise = setDoc(jobDocRef, updatedJob, { merge: true });
    return from(updatePromise);

  }






}
