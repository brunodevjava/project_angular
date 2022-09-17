import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AuthGuard} from "../../guards/auth-guard";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private qrcode: any;
  public google: any = '';
  private image: string | ArrayBuffer;
  private umlImage: SafeHtml;
  public user: any;
  public keyAuth: any;
  public respAuth: any;
  public googleKey: any = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private guard: AuthGuard,
    private dialogService: DialogService,
    private dialog: MatDialog,
    public googleAuth: GoogleAuthService,
    private sanitizer: DomSanitizer
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {

  }

  validation() {
    console.log(this.keyAuth);
    console.log(this.user.email);

    this.googleAuth.validationKey(this.user.email, this.keyAuth).then((response: any) => {
      // this.dialogService.openAlertDialog('Leitura do QRCODE feita com sucesso.', '');
      console.log('r auth: ', response);
      this.respAuth = response;
      if (this.respAuth.valid == true) {
        this.googleKey = localStorage.getItem('accessType');
        if(this.googleKey == 'AM'){
          this.router.navigateByUrl('main/sample');
        }else{
          this.router.navigateByUrl('access-type');
        }
        return true;
      } else {
        this.dialogService.openAlertDialog('Código autenticação inválido!', '')
        return false
      }

    }).catch(error =>{
      console.log(error);
    });
  }

  login(): void {
    this.loginForm.value.password = Md5.hashStr(this.loginForm.value.password);
    this.auth.login(this.loginForm.value).subscribe(async (res: any) => {
        this.guard.login(res);
        this.user = JSON.parse(<string>window.localStorage.getItem('user'));

          if (res.profile.value === 'AMOSTRA') {
            localStorage.setItem('accessType', 'AM');
            this.user = JSON.parse(<string>window.localStorage.getItem('user'));
            console.log('VALIDATION ', this.user);
            this.google = this.user.googleAuth;
            if (this.user.googleAuth === false) {
              this.googleAuth.getImage(this.user.email).subscribe((response: any) => {
                // this.router.navigateByUrl('access-type');

                this.qrcode = response;
                const url = URL.createObjectURL(response);
                console.log('responseUrl: ', url);
                this.qrcode = URL.createObjectURL(response);
                this.qrcode.replace('blob:', '');
                this.dialogService.openGoogleAuth(this.qrcode, '');

              });

               this.dialogService.openGoogleAuth(this.qrcode, 'Acesso negado! Por favor, verifique se  o e-mail e senha informados estão corretos e tente novamente. Caso tenha esquecido suas credenciais, clique em "Esqueci minha senha". Se o problema persistir, entre em contato com a administração.');

            }
            // this.router.navigateByUrl('main/sample');
            // this.user = JSON.parse(window.localStorage.getItem('user'));

          } else {
            this.user = JSON.parse(window.localStorage.getItem('user'));
            console.log('VALIDATION ', this.user);
            this.google = this.user.googleAuth;

            if (this.user.googleAuth === false) {
              this.googleAuth.getImage(this.user.email).subscribe((response: any) => {
                // this.router.navigateByUrl('access-type');

                this.qrcode = response;
                const url = URL.createObjectURL(response);
                console.log('responseUrl: ', url);
                this.qrcode = URL.createObjectURL(response);
                this.qrcode.replace('blob:', '');
                this.dialogService.openGoogleAuth(this.qrcode, '');

              });

               this.dialogService.openGoogleAuth(this.qrcode, 'Acesso negado! Por favor, verifique se  o e-mail e senha informados estão corretos e tente novamente. Caso tenha esquecido suas credenciais, clique em "Esqueci minha senha". Se o problema persistir, entre em contato com a administração.');

            }
          }
      },
      () => {
        this.dialogService.openAlertDialog('', 'Acesso negado! Por favor, verifique se  o e-mail e senha informados estão corretos e tente novamente. Caso tenha esquecido suas credenciais, clique em "Esqueci minha senha". Se o problema persistir, entre em contato com a administração.');
      });
  }


  resetPasword(): void {
    this.router.navigateByUrl('send-email');
  }

  firstAccess(): void {
    this.router.navigateByUrl('first-access');
  }

}
