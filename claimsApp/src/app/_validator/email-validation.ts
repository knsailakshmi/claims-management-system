import {HttpClient} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import {Injectable} from '@angular/core';

const AUTH_API = 'http://localhost:8080/api/auth/';
@Injectable({
  providedIn: 'root'
})
export class EmailIdValidator {
    
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
      if (!value || !this.validateEmail(value)) {
        return Promise.resolve(null);
      }
  
      return new Promise((resolve) => {
        this.timeout = window.setTimeout(() => {
          this.http.get<boolean>(`${AUTH_API}check-email/${control.value}`)
            .subscribe(flag => {
                console.log(`${AUTH_API}check-email/${control.value}`);
                if (flag) {
                    
                    
                    console.log("inside the flag in "+flag);
                    
                  resolve({emailIdTaken: true});
                } else {
                  resolve({emailIdTaken:false});
                }
              },
              (err) => {
                
                console.log(err);
              }
            );
        });
      });
    }
    validateEmail (email:string):boolean
    {
        const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log("inside the validator "+regularExpression.test(String(email).toLowerCase()));
        
        return regularExpression.test(String(email).toLowerCase());
    }
  }