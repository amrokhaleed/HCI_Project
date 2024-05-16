import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { savedjobs } from '../Interfaces/savedjobs';

@Injectable({
  providedIn: 'root'
})
export class JobsavedService {

  private firestore = inject(Firestore);
  jobsavedCollection = collection(this.firestore, 'jobsaved');

  constructor() { }

  savejob(job: savedjobs): Observable<string> {
    const respon =  addDoc(this.jobsavedCollection, job).then((response)=>{
      return response.id;
    });

    return from(respon);
  }


  getsavedjobsByemailofuser(emailofuser:string):Observable<savedjobs[]>{
    const jobsQuery = query(this.jobsavedCollection, where('emailofuser', '==', emailofuser));
    return from(getDocs(jobsQuery)).pipe( map(snapshot => snapshot.docs.map(doc => doc.data() as savedjobs)));
  }




  unsavejob(jobId: string): Observable<void> {
    const querySnapshotPromise = getDocs(query(this.jobsavedCollection, where('idofjob', '==', jobId)));

    return from(querySnapshotPromise).pipe(
      map(querySnapshot => {
        querySnapshot.forEach(doc => {
          deleteDoc(doc.ref);
        });
      })
    );
  }

}
