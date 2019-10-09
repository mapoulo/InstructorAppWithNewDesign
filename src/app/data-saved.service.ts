import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSavedService {

  constructor() { }

  SavedData = [];
  DeclinedData = [];
}
