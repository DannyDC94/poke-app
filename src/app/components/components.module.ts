import { NgModule } from '@angular/core';
import { HeaderComponent } from  './header/header.component';
import { LoadImageComponent } from './load-image/load-image.component';
import { LoadingComponent } from './loading/loading.component'

@NgModule({
  declarations: [HeaderComponent, LoadImageComponent, LoadingComponent],
  exports: [HeaderComponent, LoadImageComponent, LoadingComponent]
})
export class ComponentsModule { }
