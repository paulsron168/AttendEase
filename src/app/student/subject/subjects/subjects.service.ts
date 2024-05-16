import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Allsubjects } from './subjects.model';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MyProjectsService {

  private readonly API_SUBJECT_URL = environment.apiUrl + '/subject';
  private readonly API_ATTENDANCE_URL = environment.apiUrl + '/recordAttendance'; 
  private readonly ROSTER_SCHED_PER_STUDENT_URL = environment.apiUrl + '/roster_schedule_per_student'; 
  private readonly ROSTER_SCHED_PER_ROSTER_STUDENT_URL = environment.apiUrl + '/roster_pin_alerts_per_roster_student'; 
  private readonly NOTIFICATION_STUDENT_URL = environment.apiUrl + '/notification_alerts_for_students'; 
  private readonly UPD_NOTIFICATION_READ_URL = environment.apiUrl + '/update_read_notification_alerts'; 
  private readonly ADD_RESPONSE_URL = environment.apiUrl + '/add_response_students_alerts'; 
  
  constructor(private httpClient: HttpClient) { }

  // Existing method to fetch subjects
  getAllSubjects(): Observable<Allsubjects[]> {
    return this.httpClient.get<Allsubjects[]>(this.API_SUBJECT_URL);
  }

  getStudentClass(id: number,data:any): Observable<any> {
    const url = `${this.ROSTER_SCHED_PER_STUDENT_URL}/${id}`;
    return this.httpClient.post(url,data);
  }

  getRosterStudentClassAlerts(id: number,data:any): Observable<any> {
    const url = `${this.ROSTER_SCHED_PER_ROSTER_STUDENT_URL}/${id}`;
    return this.httpClient.post(url,data);
  }

  getNotificationAlertsStudent(id: number,data:any): Observable<any> {
    const url = `${this.NOTIFICATION_STUDENT_URL}/${id}`;
    return this.httpClient.post(url,data);
  }
  
  updateReadStatusNotifAlert(id: number,data:any): Observable<any> {
    const url = `${this.UPD_NOTIFICATION_READ_URL}/${id}`;
    return this.httpClient.post(url,data);
  }

  addResponseFromStudent(manageRosterData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_RESPONSE_URL, manageRosterData);
  }

  // // New method to send attendance data to backend
  // recordAttendance(subjectId: string, attendanceData: any): Observable<any> {
  //   return this.httpClient.post<any>(`${this.API_ATTENDANCE_URL}/${subjectId}`, attendanceData);
  // }
}
