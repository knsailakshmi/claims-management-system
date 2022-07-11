import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

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

// adding custom validators required while submitting claims
// checking entered date is greater than equal to today
export function dateGreaterThanEqualToToday(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    dateDiff(new Date(control.value),new Date()) < 0 ? {invalidDate:control.value} : null
}
// checking entered date is less than equal to today
export function dateLessThanEqualToToday(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    dateDiff(new Date(control.value),new Date()) > 0 ? {invalidDate:control.value} : null
}
// A validator to check input field is not blank in forms
export function noWhitespaceValidator():ValidatorFn{
  return (control:AbstractControl):{[key:string]:any} | null =>
    control.value.trim().length === 0 ? {'whitespace':control.value} : null
}
// min claim amount is 1000
export function minClaimAmountValidator():ValidatorFn{
  return (control:AbstractControl):{[key:string]:any} | null =>
    control.value < 1000 ? {invalidMinAmount:control.value}:null
}
// maximum claim amount is 10,000,000
export function maxClaimAmountValidator():ValidatorFn{
  return (control:AbstractControl):{[key:string]:any} | null =>
    control.value > 10000000 ? {invalidMaxAmount:control.value}:null
}
// A function to get difference between two dates
export function dateDiff(date1: Date,date2: Date){
  // milliseconds in a day
  const _MS_PER_DAY=1000*60*60*24
  // Changing both dates to UTC
  const firstDate=Date.UTC(date1.getFullYear(),date1.getMonth(),date1.getDate())
  const secondDate=Date.UTC(date2.getFullYear(),date2.getMonth(),date2.getDate())
  const dateDifference=Math.floor((firstDate-secondDate)/_MS_PER_DAY)
  return dateDifference;
}

