import { FormGroup } from '@angular/forms';
    
export function ConfirmedValidator(controlName: string, matchingControlName: string){
    console.log("inside the validator");
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        
        
        
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}