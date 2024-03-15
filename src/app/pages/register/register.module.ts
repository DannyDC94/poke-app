import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ComponentsModule } from '../../components/components.module'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    RegisterComponent
  ],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxMaskModule.forRoot()
    ]
})
export class RegisterModule { }
