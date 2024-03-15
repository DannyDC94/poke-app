import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  imageLoad = '';
  currentAge: number = 0;
  usedMask: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      hobby: [''],
      birthday: ['', Validators.required],
      document: ['']
    });
  }

  ngOnInit(): void {
  }

  calculateAge(): void {
    const selectDate = new Date(this.formGroup.get('birthday')?.value);
    const currentDate = new Date();
    this.currentAge = currentDate.getFullYear() - selectDate.getFullYear();
    this.usedMask = this.currentAge >= 18;
    this.formGroup.patchValue({ document: '' });
    this.formGroup.get('document')?.setValidators(this.usedMask ? Validators.required : null);
    this.formGroup.get('document')?.updateValueAndValidity();
  }

  getImage(evt: string) {
    this.imageLoad = evt;
  }

  onSubmit() {
    const data = {
      ...this.formGroup?.value,
      image: this.imageLoad,
      isAdult: this.usedMask,
      age: this.currentAge
    }
    localStorage.setItem('userInfo', JSON.stringify(data));
    this.router.navigate(['/administrator'], { replaceUrl: true });
  }

}
