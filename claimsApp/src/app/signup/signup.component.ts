import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ConfirmedValidator, validateEmail } from '../_helper/confiremed.validator';
import { EmailIdValidator } from '../_validator/email-validation';
import { PhoneNoValidator } from '../_validator/phoneno-validation';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({});
 
  // form: any = {
    // username: null,
    // email:null,
    // password: null,
    // confirmPassword:null,
    // address:null,
    // phoneNo:null
  // };
  isLoggedIn:boolean=false
  isValidating: boolean = false;
  isPhoneNo: boolean|null = null;
  error = null;
  token:string|null=null
  // emailRegex = `(?:[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])`;

  constructor(private authService: AuthService, 
    private router: Router,
    private tokenStorageService:TokenStorageService,
    private fb: FormBuilder,
    emailIdValidator:EmailIdValidator,
    phoneNoValidator:PhoneNoValidator) {
    this.form=fb.group({
      username:['',[Validators.required,Validators.minLength(4), Validators.maxLength(20)]],
      email:['',[Validators.required,Validators.maxLength(50),],emailIdValidator.validate.bind(emailIdValidator)],
      password: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword:['',[Validators.required,Validators.minLength(8), Validators.maxLength(20)]],
      address:['',[Validators.required]],
      phoneNo:['',[Validators.required,,Validators.minLength(10), Validators.maxLength(10)],phoneNoValidator.validate.bind(phoneNoValidator)]
    }, { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
   }
  
  

  ngOnInit(): void {
    console.log(this.form.controls.email.errors?.pattern);
    this.token= this.tokenStorageService.getToken();
    if (this.token) {
  this.router.navigate(['./memberportal']);
  
  
}
  }

  get f(){
    if(this.form.controls.phoneNo.value.length==10){
      this.isPhoneNo=true
    }else{
      this.isPhoneNo=false;
    }
    
    return this.form.controls;
  }

 
  onSubmit():void {
    const {username,email,password,address,phoneNo}=this.form.value
    this.authService.register(username,email,password,phoneNo,address).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        console.log(data);
        
        this.isLoggedIn=true
        window.location.reload();
        this.error = null;
        this.router.navigate(['./memberportal']);
        
      },
      err => {
        this.isValidating = false;
        this.error = err;
      }
    );
   
    
        
    
    this.form.value.username=''
    this.form.value.password=''
    this.form.value.email=''
    this.form.value.confirmPassword=''
    this.form.value.address=''
    this.form.value.phoneNo=''
    
  }
  disableButton(){
    let temp=this.form.controls;
    // console.log( temp.username.invalid +"||"+ 
    //   temp.email.invalid +"||"+
    //    temp.password.invalid+ "||" +
    //    temp.confirmPassword.invalid +"||" +
    //    temp.address.invalid +"||"+
    //    temp.phoneNo.invalid);
    
   
    if(temp.username.invalid || 
      temp.email.errors?.required||
       temp.password.invalid || 
       temp.confirmPassword.invalid || 
       temp.address.invalid ||
       temp.phoneNo.errors?.required||temp.phoneNo.errors?.phoneNoTaken||temp.email.errors?.emailIdTaken){
        return true
       }else{
        return false
       }
      }

      // hasError(field: string, error: string): boolean {
      //   const ctrl = this.form.get(field);
      //   return ctrl !== null && ctrl.dirty && ctrl.hasError(error);
      // }

}
