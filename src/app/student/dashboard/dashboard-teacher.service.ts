import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Allteachers } from './dashboard_teacher.model';

@Injectable({
  providedIn: 'root', 
})
export class DashboardTeacherService extends UnsubscribeOnDestroyAdapter {
 
  private readonly API_TEACHER_URL = 'http://localhost:5005/teacher';
  
  
  isTblLoading = true;
  dataTeacherChange: BehaviorSubject<Allteachers[]> = new BehaviorSubject<Allteachers[]>(
    []);
  
   
  // Temporarily stores data from dialogs
  dialogData!: Allteachers ;

  constructor(private httpClient: HttpClient) {
    super();
  }
  
  get dataSubjects(): Allteachers[] {
    return this.dataTeacherChange.value;
  }
  

  getDialogData() {
    return this.dialogData;
  }


  //---- Display Subject ----//

  getAllteachers(): Observable<Allteachers[]> {
    return this.httpClient.get<Allteachers[]>(this.API_TEACHER_URL);
  }

  
  }
 