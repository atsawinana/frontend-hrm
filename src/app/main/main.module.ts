import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutes } from './main.routing';
import { SharedComponentModule } from './shared-component/buttun-over-page/shared-component.module';

@NgModule({
    imports: [
        CommonModule,
        MainRoutes,
    ],
    declarations: [
    ]
})
export class MainModule { }
