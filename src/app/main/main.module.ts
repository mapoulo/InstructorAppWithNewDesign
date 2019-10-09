import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'the-map',
        children: [
          {
            path: '',
            loadChildren: '../the-map/the-map.module#TheMapPageModule'
          }
        ]
      },

      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: '../map/map.module#MapPageModule'
          }
        ]
      },


      {
        path: 'bookings',
        children: [
          {
            path: '',
            loadChildren: '../pastbookings/pastbookings.module#PastbookingsPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'analytics',
        children: [
          {
            path: '',
            loadChildren: '../analytics/analytics.module#AnalyticsPageModule'
          }
        ]
      },
      {
        path: 'help',
        children: [
          {
            path: '',
            loadChildren: '../help/help.module#HelpPageModule'
          }
        ]
      }
    ]
  },{
    path: 'main/the-map',
    redirectTo: 'main/the-map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
