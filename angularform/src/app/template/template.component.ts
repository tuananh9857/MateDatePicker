import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  submitted: boolean = false;
  person = { firstName: '', 
             lastName: '', 
             address: { city: '', state: '', zip: '' }, 
             dob: '', 
             gender: '',
             userID: {userName:'', password:''},
             phoneNumber:'',
             verify:'' };

  date = new FormControl(new Date());

  minDate: Date;
  maxDate: Date;
  constructor() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 65, 0, 1);
    this.maxDate = new Date(currentYear - 6, 11, 28);
  }

  ngOnInit(): void {}

  resetForm(form: any) {
    this.submitted = false;
    console.log(this.submitted);
    form.reset();
  }
  hasErrors(field: any) {
    return (field.invalid && field.touched && field.errors);
  }

  validateForm(form: any) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.control[field];
      control.markAsTouched({ onlySelf: true });
    });
  }
  submitForm(form: any) {
    if (form.valid) {
      this.submitted = true;
      console.log(this.person.address);
      // form.reset();
    } else {
      this.validateForm(form);
    }
  }
}
