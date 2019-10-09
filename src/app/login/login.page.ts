import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../app/user/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Directive, HostListener, Output, EventEmitter, ElementRef, Input } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
@Directive({
  selector: '[br-data-dependency]' // Attribute selector
})
export class LoginPage implements OnInit {

  public onSubmit(): void {
    // ...
    // ... // ...
    // ...
  }
  db = firebase.firestore()
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    
    private FormsModule: FormsModule,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });


    
  }

  async ngOnInit() {

    let loader = await this.loadingCtrl.create({
      message: 'Just a sec'
    })
    // loader.present()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {

        console.log("The current user id is", user.uid);

        loader.dismiss()
        this.db.collection('drivingschools').where('schooluid', '==', user.uid).get().then(res => {
          if (res.empty) {
            
            this.router.navigateByUrl('profile');
          } else {
            
            this.router.navigate(['main']);
          }
        })
      } else {
loader.dismiss()
      }
    })
  }

  async loginUser(loginForm: FormGroup): Promise<void> {

    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
      
      let loading = await this.loadingCtrl.create();
      await loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 4000)


      const email = loginForm.value.email;
      const password = loginForm.value.password;

      this.authService.loginUser(email, password).then(
        (user) => {
          // this.loading.dismiss().then(() => {
          //   this.router.navigateByUrl('main');
          // });
          firebase.auth().onAuthStateChanged(user => {
            if (user.uid) {
              this.db.collection('drivingschools').where('schooluid', '==', user.uid).get().then(res => {
                if (res.empty) {
                  // this.loading.dismiss();
                  this.router.navigate(['profile']);
                  
                } else {
                  // this.loading.dismiss()
                  this.router.navigate(['main/the-map']);
                }
              })
            }
          })
        },
        async (error) => {
          // this.loading.dismiss().then(async () => {
          //   const alert = await this.alertCtrl.create({
          //     message: error.message,
          //     buttons: [{ text: 'Ok', role: 'cancel' }]
          //   });
          //   await alert.present();
          // });

          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          await alert.present();
        }
      );
    }
  }

  forgetpassword() {
    this.router.navigate(['reset-password']);
  }

  goToRegister(){
    this.router.navigate(['register']);
  }


  handleLogin() {
    // Do your stuff here
}
}
