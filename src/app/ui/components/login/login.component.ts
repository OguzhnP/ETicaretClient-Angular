import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
 
constructor(
  private userService : UserService, 
  spinner :NgxSpinnerService
) {
  super(spinner);
}
  async login(usernameOrEmail: string,  password: string){
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(usernameOrEmail, password, ()=> this.hideSpinner(SpinnerType.BallAtom));
  }
}
