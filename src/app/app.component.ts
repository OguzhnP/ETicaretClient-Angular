import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    public authService: AuthService,
    private toastrService : CustomToastrService,
    private router : Router

  ){
    authService.identityCheck()
  }
  ngOnInit() { }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""])
    this.toastrService.message("Çıkış işleminiz başarıyla gerçekleştirilmiştir." , "Yine bekleriz... " ,{
      messageType: ToastrMessageType.Warning,
      position : ToastrPosition.TopRight
    });
  }

}
