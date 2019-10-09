import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { PopOverComponent } from '../pop-over/pop-over.component';



const routes: Routes = [
  
  {
    path: '',
    component: ProfilePage,
  
  }
  
  
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: 'main',
  //       loadChildren: '../main/main.module#MainPageModule'
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [ProfilePage,PopOverComponent],
  entryComponents: [
    PopOverComponent
  ]
})
export class ProfilePageModule {}
