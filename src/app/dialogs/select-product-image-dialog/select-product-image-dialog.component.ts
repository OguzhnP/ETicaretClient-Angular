import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit{
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner : NgxSpinnerService
  ) {
    super(dialogRef);
  }


  @Output() options : Partial<FileUploadOptions>={
    accept:".jpg, .jpeg, .png, .gif",
    action :"upload",
    controller:"products",
    explanation:"Ürün resmini seçiniz veya bu alana sürükleyiniz.",
    isAdminPage:true,
    queryString:`id=${this.data}`
  }

  images: List_Product_Image[];

  async ngOnInit(){
    this.spinner.show(SpinnerType.Cog);
    this.images=await this.productService.readImages(this.data as string, ()=>this.spinner.hide(SpinnerType.Cog));
  }
  

}


export enum SelectProductImageState{
  Cancel
}
