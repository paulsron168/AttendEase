import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Today } from './today.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodayService extends UnsubscribeOnDestroyAdapter {
 
  
  addstudent(today: Today): void {
    this.dialogData = today;
  }
  
  private readonly API_URL = 'assets/data/today.json';
  private readonly TEACHER_CLASS_URL =  environment.apiUrl + '/teacher_class';
  private readonly STUDENTS_SECTION_URL =  environment.apiUrl + '/students_per_section';
  private readonly STUDENTS_TEACHER_URL =  environment.apiUrl + '/students_per_teacher';
  private readonly UPD_ATTENDANCE_URL =  environment.apiUrl + '/update_roster_pin_alerts_attendance';
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Today[]> = new BehaviorSubject<Today[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Today;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Today[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllTodays(): void {
    this.subs.sink = this.httpClient.get<Today[]>(this.API_URL).subscribe({
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

  getTeacherClass(id: number,data:any): Observable<any> {
    const url = `${this.TEACHER_CLASS_URL}/${id}`;
    return this.httpClient.post(url,data);
  }

  getStudentsPerSection(id: number,data:any): Observable<any> {
    const url = `${this.STUDENTS_SECTION_URL}/${id}`;
    return this.httpClient.post(url,data);
  }

  getStudentsPerTeacher(id: number,data:any): Observable<any> {
    const url = `${this.STUDENTS_TEACHER_URL}/${id}`;
    return this.httpClient.post(url,data);
  }

  updateAttendance(id: number,data:any): Observable<any> {
    const url = `${this.UPD_ATTENDANCE_URL}/${id}`;
    return this.httpClient.post(url,data);
  }

}
