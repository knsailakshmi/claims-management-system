import {HttpClient} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import {Injectable} from '@angular/core';

const AUTH_API = 'http://localhost:8080/api/auth/';
@Injectable({
  providedIn: 'root'
})
export class UserIdValidator {
    
    private timeout: number | null = null;
  
    constructor(private readonly http: HttpClient) {
    }
  
    validate(control: AbstractControl): Promise<{ [key: string]: boolean } | null> {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
  
      const value = control.value;

  
      // do not call server when input is empty or shorter than 2 characters
      if (!value || value.length <1) {
        return Promise.resolve(null);
      }
  
      return new Promise((resolve) => {
        this.timeout = window.setTimeout(() => {
          this.http.get<boolean>(`${AUTH_API}user-id/${control.value}`)
            .subscribe(flag => {
                console.log(`${AUTH_API}user-id/${control.value}`);
                if (flag) {
                    
                    
                    console.log("inside the flag in "+flag);
                    
                  resolve({userIdTaken: true});
                } else {
                  resolve({userIdTaken:false});
                }
              },
              (err) => {
                
                console.log(err);
              }
            );
        }, 200);
      });
    }
  
  }