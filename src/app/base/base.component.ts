import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService){}

  showSpinner(spinnerNameType: SpinnerType){
    this.spinner.show(spinnerNameType);
     setTimeout(() => this.hideSpinner(spinnerNameType), 300);
  }
  hideSpinner(sipinnerNameType: SpinnerType){
    this.spinner.hide(sipinnerNameType);
  }
}

export enum SpinnerType{
BallAtom="s1",
SquareJelly="s2",
Cog="s3"
}
