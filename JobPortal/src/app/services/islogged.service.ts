import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsloggedService {
  sharedData: boolean;

  constructor() {
    // Initialize sharedData from storage, if available
    const storedValue = localStorage.getItem('isLogged');
    this.sharedData = storedValue ? JSON.parse(storedValue) : false;
  }

  // Function to set the value of sharedData and update storage
  setLoggedStatus(value: boolean) {
    this.sharedData = value;
    localStorage.setItem('isLogged', JSON.stringify(value));
  }

  // Function to get the current value of sharedData
  isLogged() {
    return this.sharedData;
  }
}
