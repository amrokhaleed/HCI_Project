import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, deleteDoc, setDoc,query, where,getDocs ,updateDoc, getDoc} from '@angular/fire/firestore';
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

  getJobById(jobId: string): Observable<Job> {
    const jobDocRef = doc(this.firestore, 'Jobs', jobId);
    return from(getDoc(jobDocRef)).pipe(
      map(doc => {
        if (doc.exists()) {
          const data = doc.data() as Job;
          data.id = doc.id;
          return data;
        } else {
          throw new Error('Job not found');
        }
      })
    );
  }

  getJobsByEmail(email: string): Observable<Job[]> {
    const jobsQuery = query(this.jobssCollection, where('email', '==', email));
    return from(getDocs(jobsQuery)).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        const data = doc.data() as Job;
        data.id = doc.id;
        return data;
      }))
    );
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
