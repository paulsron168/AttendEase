import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClassSchedule } from './classSchedule.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class ClassScheduleService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'http://localhost:5005/classschedule';
  private readonly ADD_CLASSSCHEDULE_URL = 'http://localhost:5005/addclassschedule';

  isTblLoading = true;
  dataChange: BehaviorSubject<ClassSchedule[]> = new BehaviorSubject<ClassSchedule[]>([]);
  dialogData!: ClassSchedule;


  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): ClassSchedule[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


 //---- Display Class Schedule ----//

  getAllClassSchedule(): void {
    this.subs.sink = this.httpClient.get<ClassSchedule[]>(this.API_URL).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }

 //---- Add  Class Schedule ----//
  addClassSchedule(classScheduleData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_CLASSSCHEDULE_URL, classScheduleData);


  }

   //---- Update  Class Schedule ----//

  updateClassSchedule(ID:number, updatedClassSchedule: any):  Observable<any> {
    const url = `${this.API_URL}/${ID}`;
    return this.httpClient.put(url, updatedClassSchedule);
  
  }

  deleteClassSchedule(class_ID:number): Observable<any> {
    const url = `${this.API_URL}/${class_ID}`;
    return this.httpClient.delete(url);
    
  }
}
