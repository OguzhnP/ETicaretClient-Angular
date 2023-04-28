import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit  {


  constructor(private productService : ProductService, spinner: NgxSpinnerService, private alertifyService : AlertifyService) {
    super(spinner);
  }


  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate','photos','edit','delete'];

  dataSource: MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: { totalCount: number; products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0,this.paginator ? this.paginator.pageSize: 5,()=>this.hideSpinner(SpinnerType.BallAtom),errorMessage=> this.alertifyService.message(errorMessage,{
       dismissOther:true,
       messageType:MessageType.Error,
       position:Position.TopRight
    }));
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }


  // delete(id,event){
  //   const img : HTMLImageElement = event.srcElement;
  //   $(img.parentElement.parentElement).fadeOut(1450);
  // }

  async pageChanged(){
    await this.getProducts()
  }


  async ngOnInit(){
    await this.getProducts();

  }

}
