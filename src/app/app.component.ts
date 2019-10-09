import { Component, HostListener } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '../environments/firebase_config';

import { TabsService } from './core/tabs.service';

import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
signal_app_id:string ='d0d13732-1fec-4508-b72b-86eaa0c62aa4';
firbase_id:string='580007341136';

  public unsubscribeBackEvent: any;

  db = firebase.firestore()
  constructor(
    private platform: Platform,
    public tabs: TabsService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public alertCtrl: AlertController,
    public oneSignal: OneSignal
    
  ) 
  
  
  {

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
       this.router.navigate(['/onboarding']);
       unsubscribe();
      } else {
       console.log('The user email is',user.email);
       this.router.navigate(['main/the-map']);
       unsubscribe();
      }
      });

  }



//   initializeApp() {

//     this.platform.ready().then(() => {
//         this.backButton()
//       firebase.auth().onAuthStateChanged(function (user) {
        
//         if (user) {
//           // User is signed in.
//           this.router.navigateByUrl('main/the-map');
          
//           console.log('Current user in', user.uid);
//         } else {
//           // No user is signed in.
       
          
//           // this.router.navigateByUrl('/');
//         }
// if(this.platform.is('cordova')){
//   this.setupPush();
// }


//       });
//       this.splashScreen.hide();
//     });
//   }

initializeApp() {
  this.platform.ready().then(() => {
    this.backButton()
    this.statusBar.styleDefault();

   


    if (this.platform.is('cordova')) {
      this.setupPush();
    }
  });
}


  async backButton() {
    this.platform.backButton.subscribeWithPriority(1, async () => {
      console.log(this.router.url);
      if (this.router.url == '/past-b') {
      this.router.navigate(['main/profile']);
      } else {
        let alerter = await this.alertCtrl.create({
          message: 'Do you want to exit the App?',
          buttons: [{
            text: 'No',
            role: 'cancel'
          },
        {
          text: 'Yes',
          handler: ()=> {
              navigator['app'].exitApp();
          }
        }]
        })
        alerter.present()
      }
  });
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    console.log(route);

    let authInfo = {
        authenticated: false
    };

    if (!authInfo.authenticated) {
        this.router.navigate(['login']);
        return false;
    }

    return true;

}

ngOnInit() {
  
   this.initializeBackButtonCustomHandler();
  
 }

 ionViewWillLeave() {
  // Unregister the custom back button action for this page
  this.unsubscribeBackEvent && this.unsubscribeBackEvent();
}

initializeBackButtonCustomHandler(): void {

// this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999,  () => {
//     // alert("back pressed home" + this.constructor.name);
   
// });
/* here priority 101 will be greater then 100 
if we have registerBackButtonAction in app.component.ts */
}

setupPush() {
  // I recommend to put these into your environment.ts
  this.oneSignal.startInit('d0d13732-1fec-4508-b72b-86eaa0c62aa4', '580007341136');

  this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

  // Notifcation was received in general
  this.oneSignal.handleNotificationReceived().subscribe(data => {
    let msg = data.payload.body;
    let title = data.payload.title;
    let additionalData = data.payload.additionalData;
    this.showAlert(title, msg, additionalData.task);
  });

  // Notification was really clicked/opened
  this.oneSignal.handleNotificationOpened().subscribe(data => {
    console.log(data)
    // Just a note that the data is a different place here!
    let additionalData = data.notification.payload.additionalData;

    this.showAlert('Notification opened', 'You already read this before', additionalData.task);
  });

  this.oneSignal.endInit();
}

async showAlert(title, msg, task) {
  const alert = await this.alertCtrl.create({
    header: title,
    subHeader: msg,
    buttons: [
      {
        text: `Action: ${task}`,
        handler: () => {
          // E.g: Navigate to a specific screen
        }
      }
    ]
  })
  alert.present();
}
@HostListener('document:readystatechange', ['$event'])
onReadyStateChanged(event) {
    if (event.target.readyState === 'complete') {
        this.splashScreen.hide();
    }
}
}
