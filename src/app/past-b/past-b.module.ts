import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PastBPage } from './past-b.page';
import { StarRating } from 'ionic4-star-rating';
const routes: Routes = [
  {
    path: '',
    component: PastBPage
  }
];

@NgModule({
  declarations: [ PastBPage,StarRating],
  imports: [
  
  
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  
  ],
 
  
  exports: [ StarRating ],
})
export class PastBPageModule {}
