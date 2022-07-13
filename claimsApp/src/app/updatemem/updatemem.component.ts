import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../_helper/confiremed.validator';
import { AuthService } from '../_services/auth.service';

import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-updatemem',
  templateUrl: './updatemem.component.html',
  styleUrls: ['./updatemem.component.css']
})
export class UpdatememComponent implements OnInit {
  public form: FormGroup=new FormGroup({});
  passwordError:boolean=false;
  error:boolean|null=null;

  constructor(private router:Router,private authService:AuthService,private tokenStorage:TokenStorageService,private fb: FormBuilder) {
    const user=this.tokenStorage.getUser()
    const userId=user.userid

    this.authService.getUser(userId).subscribe(
      data=>{
        console.log(data);
        this.form=fb.group({
          form1:fb.group({
            name:[data.name,[Validators.required]],
            email:[data.email,[Validators.required]],
            password:[""]
          }),
          form2:fb.group({
            confirmPassword:[''],
            address:[data.address,[Validators.required]],
            mobileNo:[data.phoneNo,[Validators.required]]
          }),validator: ConfirmedValidator('form1.password', 'form2.confirmPassword')
        })
      }
    )

   }
   get f1(){
    return (this.form.controls.form1 as FormGroup).controls;
  }
  get f2(){
    return (this.form.controls.form2 as FormGroup).controls;
  }

  ngOnInit(): void {

  }
  onSubmit():void{
    const firstForm=this.form.get('form1') as FormGroup
  //  this.form.get('form1')?.value.password);
  console.log(this.form);
  const userid=this.tokenStorage.getUser().userid;
  
  const secondForm=this.form.get('form2') as FormGroup
  //  console.log(this.form.get('form2')?.value.confirmPassword);
  console.log(typeof(firstForm));
  
     if(firstForm?.value.password!==secondForm?.value.confirmPassword){
      this.passwordError=true;
      console.log("inside the sumit");
      return 
     }else{
      this.passwordError=false
     }
     this.authService.updateUser(firstForm,secondForm,userid).subscribe(
      (data)=>{
        console.log(data)

        let user=this.tokenStorage.getUser();
        user.name=data.name;        
        this.tokenStorage.saveUser(user);
        this.error=false;
       
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.error= null;
          this.router.navigateByUrl('home')
          window.location.reload();
      }, 2000);


         
        
        
        
      },(error)=>{
        this.error=true
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.error= null;
      }, 3000);
      }
     )
     
      
  

   
   
  }

}
