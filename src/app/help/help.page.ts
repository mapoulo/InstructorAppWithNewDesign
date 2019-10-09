import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { OnboardingPage } from '../onboarding/onboarding.page';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  public unsubscribeBackEvent: any;

  constructor( private platform: Platform,  private router: Router, ) { }

   ngOnInit() {
    // this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    // this.unsubscribeBackEvent && this.unsubscribeBackEvent();
  }

//   initializeBackButtonCustomHandler(): void {

//     this.platform.backButton.subscribeWithPriority(1, () => {
//       alert("Do you want to exit the App");
//       navigator['app'].exitApp();
// });
  

//   // this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999,  () => {
//   //     // alert("back pressed home" + this.constructor.name);
     
//   // });
//   /* here priority 101 will be greater then 100 
//   if we have registerBackButtonAction in app.component.ts */
// }

  ionViewDidEnter(){
    this.platform.ready().then(() => {
      console.log('Core service init');
      const tabBar = document.getElementById('myTabBar');
       tabBar.style.display = 'flex';
    });
  }

  showTab(){
    this.platform.ready().then(() => {
      console.log('Core service init');
      const tabBar = document.getElementById('myTabBar');
      tabBar.style.display = 'flex';
    });   
  }
instruct(){
  this.router.navigateByUrl('Onboarding');
}
}
