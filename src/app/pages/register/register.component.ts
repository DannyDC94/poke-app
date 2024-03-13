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
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      hobby: ['', Validators.required],
      birthday: ['', Validators.required],
      document: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  getImage(evt: string) {
    this.imageLoad = evt;
  }

  onSubmit() {
    if (this.formGroup.valid && this.imageLoad !== '') {
      const data = {
        ...this.formGroup?.value,
        image: this.imageLoad
      }
      localStorage.setItem('userInfo', JSON.stringify(data));
      this.router.navigate(['/administrator'], { replaceUrl: true });
    }
  }

}
