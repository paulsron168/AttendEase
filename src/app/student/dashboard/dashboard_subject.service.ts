import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Allsubjects } from './dashboard_subject.model'
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root', 
})
export class dashboardService extends UnsubscribeOnDestroyAdapter {
  
  
  private readonly API_SUBJECT_URL = 'http://localhost:5005/subject';
  
  
  isTblLoading = true;
  dataSubjectChange: BehaviorSubject<Allsubjects[]> = new BehaviorSubject<Allsubjects[]>(
    []);
  
   
  // Temporarily stores data from dialogs
  dialogData!: Allsubjects ;

  constructor(private httpClient: HttpClient) {
    super();
  }
  
  get dataSubjects(): Allsubjects[] {
    return this.dataSubjectChange.value;
  }
  

  getDialogData() {
    return this.dialogData;
  }


  //---- Display Subject ----//

  getAllsubjects(): Observable<Allsubjects[]> {
    return this.httpClient.get<Allsubjects[]>(this.API_SUBJECT_URL);
  }

  
  }
 