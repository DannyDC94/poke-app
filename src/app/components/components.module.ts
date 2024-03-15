import { NgModule } from '@angular/core';
import { HeaderComponent } from  './header/header.component';
import { LoadImageComponent } from './load-image/load-image.component';
import { LoadingComponent } from './loading/loading.component'
import { CommonModule } from "@angular/common";
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { TranslationPipe } from "../pipes/translation.pipe";

@NgModule({
    declarations: [
      HeaderComponent,
      LoadImageComponent,
      LoadingComponent,
      DetailPokemonComponent,
      TranslationPipe
    ],
    imports: [
      CommonModule
    ],
    exports: [
      HeaderComponent,
      LoadImageComponent,
      LoadingComponent,
      DetailPokemonComponent
    ]
})
export class ComponentsModule { }
