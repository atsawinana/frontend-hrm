import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main-component/main.component';
import { IntercrptorService } from './login/loading/intercrptor.service';
import { LoadingComponent } from './login/loading/loading-template/loading.component';
import { SideBarComponent } from './main/main-component/side-bar/side-bar/side-bar.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        LoadingComponent,
        SideBarComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PaginationModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: IntercrptorService, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
