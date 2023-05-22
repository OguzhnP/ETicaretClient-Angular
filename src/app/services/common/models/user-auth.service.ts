import { Injectable } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Observable, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private httpClientService: HttpClientService,
    private toastrService : CustomToastrService
    ) { }

  async login(usernameOrEmail : string , password: string , callBackFunction?:()=> void):Promise<any | Token>{
    const observable: Observable<any | TokenResponse>= this.httpClientService.post<any | TokenResponse>({
      action:"login",
      controller:"auth"
    },{usernameOrEmail, password});
    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.." , "Giriş başarılı !",{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    callBackFunction();
  }

  async googleLogin(user : SocialUser, callBackFunction?:()=>void): Promise<any>{

  const observable :Observable<SocialUser |TokenResponse>=this.httpClientService.post<SocialUser |TokenResponse>({
    action : "google-login",
    controller:"auth"
  }, user);

  const tokenResponse : TokenResponse= await firstValueFrom(observable) as TokenResponse;

  if (tokenResponse) {
    localStorage.setItem("accessToken",tokenResponse.token.accessToken);
    this.toastrService.message("Google üzerinden giriş sağlanmıştır." ,"Giriş Başarılı",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
    });
  }
  callBackFunction();
}

}
