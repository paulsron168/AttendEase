import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends UnsubscribeOnDestroyAdapter {
  
  private readonly API_URL = 'http://localhost:5005/student';
  private readonly ADD_STUDENT_URL = 'http://localhost:5005/addstudent';

  isTblLoading = true;
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  dialogData!: Students;
  http: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Students[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllStudents(): void {
    this.subs.sink = this.httpClient.get<Students[]>(this.API_URL).subscribe({
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

  //getAllStudents(): Observable<Students[]> {
   // return this.httpClient.get<Students[]>(this.API_URL);
  //}

  //addStudents(students: Students): void {
   // this.httpClient.post<Students>(this.API_URL, students).subscribe({
    //  next: (data) => {
    //    this.dialogData = data;
     //   // Assuming dialogData should be updated with the response
      //},
      //error: (error: HttpErrorResponse) => {
        // Handle error
     // },
   // });
 // }

  updateStudent(StudentID_Number: number, updatedStudent: any): Observable<any> {
    const url = `${this.API_URL}/${StudentID_Number}`;
    return this.httpClient.put(url, updatedStudent);
  }

  deleteStudent(StudentID_Number: number): Observable<any> {
    const url = `${this.API_URL}/${StudentID_Number}`;
    return this.httpClient.delete(url);
  }

  addStudent(studentData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_STUDENT_URL, studentData);
  }
}
