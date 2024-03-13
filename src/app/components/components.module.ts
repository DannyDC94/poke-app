import { NgModule } from '@angular/core';
import { HeaderComponent } from  './header/header.component';
import { LoadImageComponent } from './load-image/load-image.component';
import { LoadingComponent } from './loading/loading.component'
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [HeaderComponent, LoadImageComponent, LoadingComponent],
    imports: [
        CommonModule
    ],
    exports: [HeaderComponent, LoadImageComponent, LoadingComponent]
})
export class ComponentsModule { }
