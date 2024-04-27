import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Allclass } from './dashboard-class.model';

@Injectable({
  providedIn: 'root', 
})
export class DashboardClassService extends UnsubscribeOnDestroyAdapter {
  private readonly API_CLASS_URL = 'http://localhost:5005/class';
  
  
  isTblLoading = true;
  dataClassChange: BehaviorSubject<Allclass[]> = new BehaviorSubject<Allclass[]>(
    []);
    
   
  // Temporarily stores data from dialogs
  dialogData!: Allclass ;

  constructor(private httpClient: HttpClient) {
    super();
  }
  
  get dataClass(): Allclass[] {
    return this.dataClassChange.value;
  }
  

  getDialogData() {
    return this.dialogData;
  }


  //---- Display Subject ----//

  getAllclass(): Observable<Allclass[]> {
    return this.httpClient.get<Allclass[]>(this.API_CLASS_URL);
  }

  
  }