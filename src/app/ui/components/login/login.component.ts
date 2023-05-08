import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { ActivatedRoute , Router } from '@angular/router';

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
  private router : Router
) {
  super(spinner);
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
