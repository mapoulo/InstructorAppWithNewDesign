import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/user/auth.service';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public signupForm: FormGroup;
  public loading: any;
  constructor(
    public platform : Platform,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public router: Router
    ) { 
      this.signupForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: [
          '',
          Validators.compose([Validators.minLength(6), Validators.required])
        ]
      });
    }

  ngOnInit() {}

  
  async signupUser(signupForm: FormGroup): Promise<void> {
    console.log('Method is called');

    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ',
        signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;

      this.authService.signupUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            // this.router.navigateByUrl('profile');
            this.router.navigateByUrl('profile');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }



  goToLogin() {
    this.router.navigate(['login']);
  }
  
}
