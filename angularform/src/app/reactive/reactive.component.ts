import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  submitted :boolean= false;
  exampleForm: FormGroup;

  person = { firstName: '', 
  lastName: '', 
  address: { city: '', state: '', zip: '' }, 
  dob: '', 
  gender: '',
  userID: {userName:'', password:''},
  phoneNumber:'',
  verify:'' };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.exampleForm = this.formBuilder.group({
      firstName:['',[Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      lastName:['',[Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
    })
  }

  resetForm(form: any) {
    this.submitted = false;
    console.log(this.submitted);
    form.reset();
  }
  hasErrors(field: any) {
    return (this.exampleForm.get(field).invalid && this.exampleForm.get(field).touched && this.exampleForm.get(field).errors);
  }

  validateForm(form: any) {

    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl){
        control.markAsTouched({onlySelf:true});
      }else if(control instanceof FormGroup) {
        this.validateForm(control);
      }
    })
  
  }
  submitForm(form: any) {
    if (form.valid) {
      this.submitted = true;
      console.log(this.firstName)
      // form.reset();
    } 
    else {
      this.validateForm(form);
    }
  }

  get firstName(){ return this.exampleForm.get('firstName')}
  get lastName(){ return this.exampleForm.get('lastName')}

}
