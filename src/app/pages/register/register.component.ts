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
  hobbies: any[] = [
    { id: 1, nombre: 'Jugar Fútbol' },
    { id: 2, nombre: 'Jugar Basketball' },
    { id: 3, nombre: 'Jugar Tennis' },
    { id: 4, nombre: 'Jugar Voleibol' },
    { id: 5, nombre: 'Jugar Fifa' },
    { id: 6, nombre: 'Jugar Videojuegos' }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      hobby: [''],
      birthday: ['', Validators.required],
      document: ['', Validators.required]
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
    let data = {
      ...this.formGroup?.value,
      image: this.imageLoad,
      isAdult: this.usedMask,
      age: this.currentAge
    }
    const idHobby = this.formGroup.get('hobby')?.value;
    if (idHobby) {
      const hobby = this.hobbies.find(h => h.id === idHobby);
      data.hobbyName = hobby.nombre;
    }
    localStorage.setItem('userInfo', JSON.stringify(data));
    this.router.navigate(['/administrator'], { replaceUrl: true });
  }

}
