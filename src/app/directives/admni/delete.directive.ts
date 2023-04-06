import { Directive, ElementRef, HostListener, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
declare var $ : any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element : ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private alertify:AlertifyService,
    ) {
      const img = _renderer.createElement("img");
      img.setAttribute("src" ,   "../../../../../assets/delete.png");
      img.setAttribute("style" ,"cursor: pointer;");

      _renderer.appendChild(element.nativeElement, img)
    }


    @Input() id: string;
    @Input() controller: string;
    @Output() callback: EventEmitter<any> =new EventEmitter;


    @HostListener("click")
    async onclick(){
      this.openDialog(async()=>{
        const td : HTMLTableCellElement=this.element.nativeElement;
        await this.httpClientService.delete({controller:this.controller},this.id).subscribe(data=>{
          $(td.parentElement).fadeOut(1000,()=>{
            this.callback.emit();
            this.alertify.message("Ürün başarıyla silinmiştir.",{
              dismissOther  :true,
              messageType:MessageType.Success,
              position: Position.TopRight
            });
          });
        },(errorResponse: HttpErrorResponse)=>{
          this.alertify.message("Ürün bsilinirken bir hata oluştu",{
            dismissOther  :true,
            messageType:MessageType.Error,
            position: Position.TopRight
          });
        });


       });
    }

    openDialog(afterClosed: any): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width:'250px',
        data: DeleteState.Yes,
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result==DeleteState.Yes) {
          afterClosed();
        }
      });
    }





}
