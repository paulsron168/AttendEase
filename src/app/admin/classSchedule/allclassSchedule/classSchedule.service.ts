import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClassSchedule } from './classSchedule.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ClassScheduleService extends UnsubscribeOnDestroyAdapter {

  private readonly SCHEDULE_FOR_ROSTER_URL = environment.apiUrl + '/schedule_roster';
  private readonly SCHEDULE_URL = environment.apiUrl + '/class_schedule';
  private readonly ADD_SCHEDULE_URL = environment.apiUrl + '/add_schedule';
  private readonly UPD_SCHEDULE_URL = environment.apiUrl + '/update_schedule';
  private readonly DEL_SCHEDULE_URL = environment.apiUrl + '/delete_schedule';

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
    this.subs.sink = this.httpClient.get<ClassSchedule[]>(this.SCHEDULE_URL).subscribe({
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

  //---- GET  Class Schedule ----//
  getSchedule(): Observable<any> {
    return this.httpClient.get<any>(this.SCHEDULE_FOR_ROSTER_URL);
  }
  
  //---- Add  Class Schedule ----//
  addClassSchedule(classScheduleData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_SCHEDULE_URL, classScheduleData);
  }

   //---- Update  Class Schedule ----//

  updateClassSchedule(ID:number, updatedClassSchedule: any):  Observable<any> {
    const url = `${this.UPD_SCHEDULE_URL}/${ID}`;
    return this.httpClient.put(url, updatedClassSchedule);
  }

  deleteClassSchedule(class_ID:number): Observable<any> {
    const url = `${this.DEL_SCHEDULE_URL}/${class_ID}`;
    return this.httpClient.delete(url);
    
  }
}
