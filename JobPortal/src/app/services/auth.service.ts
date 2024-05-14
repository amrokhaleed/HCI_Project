import { inject,Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { response } from 'express';

import { auth } from '../Interfaces/auth';
import { BehaviorSubject, from , map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseauth = inject(Auth);
  user$ = user(this.firebaseauth);
  curentUserSin = signal<auth | null | undefined>(undefined);
  static islogin:boolean = false;



  constructor() {}




  getCurenttype(): Observable<string> {
    return new Observable<string>((observer) => {
      this.user$.subscribe((user) => {
        if (user) {
          const type: string = user.displayName || '';
          //console.log('User Name:', name);
          observer.next(type);
        } else {
          //console.log('No user logged in');
          observer.next('');
        }
        observer.complete(); // Complete the observable after emitting the value
      });
    });
  }





  /*getCurentstatus(): boolean {
    let check: boolean = false;
    this.user$.subscribe((user) => {
      if (user) {
        check = true;
      } else {
        check = false;
      }
    });
    return check;
  }*/




  register(email:string, type: string , pass:string):Observable<void>{
    const promises = createUserWithEmailAndPassword(this.firebaseauth,email,pass).then(response => updateProfile(response.user , {displayName :type}));
    return from(promises);
  }



  login(email:string, pass:string):Observable<void>{
    localStorage.setItem('dataSource', "true");

    AuthService.islogin=true;
    const promises = signInWithEmailAndPassword(this.firebaseauth,email,pass).then(()=>{});
    return from(promises);
  }


  logout():Observable<void>{
    localStorage.setItem('dataSource', "false");
    localStorage.setItem('type', "");
    localStorage.setItem('email', "");
    AuthService.islogin=false;
    const promises = signOut(this.firebaseauth);
    return from(promises);
  }

}
