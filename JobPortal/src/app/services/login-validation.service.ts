import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginValidationService {

  constructor() { }

  validate(username: string, password: string): boolean {
    // Dummy data for validation
    const dummyUsername = 'user';
    const dummyPassword = 'password';

    // Check if username and password match the dummy data
    return username === dummyUsername && password === dummyPassword;
  }
}
