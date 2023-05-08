import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { FileUploadComponent } from './services/common/file-upload/file-upload.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MatButton, MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: ()=>localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7233"],
      }
    })
  ],
  providers: [
    {provide : "baseUrl",useValue:"https://localhost:7233/api",multi :true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
