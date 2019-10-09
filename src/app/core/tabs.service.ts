import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})

export class TabsService {


  hideTabBarPages = [
    // 'profile',
    // 'the-map',
    // 'past-b',
    // 'analytics',
    // 'graphs',
    // 'help',
    // 'bookings'
  ];

  routeParamPages: string[] = [
    'main',
  ];

  constructor(private router: Router, private platform: Platform) {
   
  }


  ionViewWillEnter(){

    this.platform.ready().then(() => {
      console.log('Core service init');
      this.navEvents();
    });

  }

  public hideTabs() {
    console.log("hideTabs tab method is called");
    const tabBar = document.getElementById('myTabBar');
    if (tabBar.style.display !== 'none') tabBar.style.display = 'none';
  }

  public showTabs() {
    console.log("showTabs tab method is called");
    
    const tabBar = document.getElementById('myTabBar');
    if (tabBar.style.display !== 'flex') tabBar.style.display = 'flex';
  }

  // A simple subscription that tells us what page we're currently navigating to.
  public navEvents() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      console.log(e);
      this.showHideTabs(e);
    });
  }

  public showHideTabs(e: any) {
    // Result:  e.url: "/tabs/groups/new-group?type=group"
    console.log(e);
    // Split the URL up into an array.
    const urlArray = e.url.split('/');
    // Result: urlArray: ["", "tabs", "groups", "new-group?type=group"]
    // Grab the parentUrl
    const pageUrlParent = urlArray[urlArray.length - 2];
    // Grab the last page url.
    const pageUrl = urlArray[urlArray.length - 1];
    // Result: new-group?type=group

    const page = pageUrl.split('?')[0];
    // Result: new-group
// Check if it's a routeParamPage that we need to hide on
     const hideParamPage = this.routeParamPages.indexOf(pageUrlParent) > -1 && !isNaN(Number(page));
// Check if we should hide or show tabs.
    const shouldHide = this.hideTabBarPages.indexOf(page) > -1 || hideParamPage;
    // Result: true

    // Not ideal to set the timeout, but I haven't figured out a better method to wait until the page is in transition...
    try {
      setTimeout(() => shouldHide ? this.hideTabs() : this.showTabs(), 100);
    } catch (err) {
    }
  }

}