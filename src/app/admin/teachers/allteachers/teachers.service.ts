import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Teachers } from './teachers.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class TeachersService extends UnsubscribeOnDestroyAdapter {
  
  private readonly API_URL = 'http://localhost:5005/teacher';
  private readonly ADD_TEACHER_URL = 'http://localhost:5005/addteacher';

  isTblLoading = true;
  dataChange: BehaviorSubject<Teachers[]> = new BehaviorSubject<Teachers[]>([]);
  dialogData!: Teachers;
  http: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Teachers[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllTeachers(): void {
    this.subs.sink = this.httpClient.get<Teachers[]>(this.API_URL).subscribe({
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

  //getAllTeachers(): Observable<Teachers[]> {
   // return this.httpClient.get<Teachers[]>(this.API_URL);
  //}

  //addTeachers(teachers: Teachers): void {
   // this.httpClient.post<Teachers>(this.API_URL, teachers).subscribe({
    //  next: (data) => {
    //    this.dialogData = data;
     //   // Assuming dialogData should be updated with the response
      //},
      //error: (error: HttpErrorResponse) => {
        // Handle error
     // },
   // });
 // }

  updateTeacher(TeacherID_Number: number, updatedTeacher: any): Observable<any> {
    const url = `${this.API_URL}/${TeacherID_Number}`;
    return this.httpClient.put(url, updatedTeacher);
  }

  deleteTeacher(TeacherID_Number: number): Observable<any> {
    const url = `${this.API_URL}/${TeacherID_Number}`;
    return this.httpClient.delete(url);
  }

  addTeacher(teacherData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_TEACHER_URL, teacherData);
  }
}
