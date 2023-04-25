import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    DialogModule,
    NgxSpinnerModule
  ],
  exports:[
    FileUploadComponent
  ]
})
export class FileUploadModule { }
