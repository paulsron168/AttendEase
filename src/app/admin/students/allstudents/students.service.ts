import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends UnsubscribeOnDestroyAdapter {
  
  private readonly SUBJECT_URL = 'http://localhost:5005/get_subject';
  private readonly STUDENT_URL = 'http://localhost:5005/student';
  private readonly SECTION_URL = 'http://localhost:5005/section';
  private readonly ADD_STUDENT_URL = 'http://localhost:5005/add_student';
  private readonly DEL_STUDENT_URL = 'http://localhost:5005/delete_student';
  private readonly UPD_STUDENT_URL = 'http://localhost:5005/update_student';

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
    this.subs.sink = this.httpClient.get<Students[]>(this.STUDENT_URL).subscribe({
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

  updateStudent(id: number, updatedStudent: any): Observable<any> {
    const url = `${this.UPD_STUDENT_URL}/${id}`;
    return this.httpClient.put(url, updatedStudent);
  }

  deleteStudent(id: number): Observable<any> {
    const url = `${this.DEL_STUDENT_URL}/${id}`;
    return this.httpClient.delete(url);
  }

  addStudent(studentData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_STUDENT_URL, studentData);
  }

  getSection(): Observable<any> {
    return this.httpClient.get<any>(this.SECTION_URL);
  }

  getSubject(): Observable<any> {
    return this.httpClient.get<any>(this.SUBJECT_URL);
  }
}
