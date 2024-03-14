import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorComponent } from './administrator.component';
import { ComponentsModule } from "../../components/components.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { PokemonService } from '../../services/pokemon.service';
import {TranslationPipe} from "../../pipes/translation.pipe";


@NgModule({
  declarations: [
    AdministratorComponent,
    TranslationPipe
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PokemonService
  ]
})
export class AdministratorModule { }
