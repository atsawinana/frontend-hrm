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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [			
    AppComponent,
      LoginComponent,
      MainComponent,
      LoadingComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: IntercrptorService,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
