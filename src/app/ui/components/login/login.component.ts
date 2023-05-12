import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { ActivatedRoute , Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

constructor(
  private userService : UserService,
  spinner :NgxSpinnerService,
  private authService: AuthService,
  private activatedRoute : ActivatedRoute,
  private router : Router,
  private socialAuthService: SocialAuthService,
) {

  super(spinner);
  this.socialAuthService.authState.subscribe(async(user: SocialUser) => {
    console.log(user);
    this.showSpinner(SpinnerType.Cog);
    await userService.googleLogin(user,()=>{
      authService.identityCheck();
      this.hideSpinner(SpinnerType.Cog);
    });
  });
}
  async login(usernameOrEmail: string,  password: string){
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(usernameOrEmail, password, ()=> {
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params =>{
        const returnUrl : string = params["returnUrl"];

        if(returnUrl)
          this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.BallAtom)});
  }
}
