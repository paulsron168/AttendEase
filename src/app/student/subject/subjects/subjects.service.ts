import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Allsubjects } from './subjects.model';

@Injectable({
  providedIn: 'root'
})
export class MyProjectsService {

  private readonly API_SUBJECT_URL = 'http://localhost:5005/subject';
  private readonly API_ATTENDANCE_URL = 'http://localhost:5005/recordAttendance'; // Add your attendance API endpoint here

  constructor(private httpClient: HttpClient) { }

  // Existing method to fetch subjects
  getAllSubjects(): Observable<Allsubjects[]> {
    return this.httpClient.get<Allsubjects[]>(this.API_SUBJECT_URL);
  }

  // New method to send attendance data to backend
  recordAttendance(subjectId: string, attendanceData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.API_ATTENDANCE_URL}/${subjectId}`, attendanceData);
  }
}
