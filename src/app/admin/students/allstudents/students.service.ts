import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class StudentsService extends UnsubscribeOnDestroyAdapter {
  
  private readonly SUBJECT_URL = environment.apiUrl + '/get_subject';
  private readonly STUDENT_URL = environment.apiUrl + '/student';
  private readonly SECTION_URL = environment.apiUrl + '/section';
  private readonly ADD_STUDENT_URL = environment.apiUrl + '/add_student';
  private readonly DEL_STUDENT_URL = environment.apiUrl + '/delete_student';
  private readonly UPD_STUDENT_URL = environment.apiUrl + '/update_student';
  private readonly UPLOAD_URL = environment.apiUrl + '/uploadProfilePicture';
  
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

  uploadImage(image: any): Observable<any> {
    return this.httpClient.post<any>(this.UPLOAD_URL, image);
  }

  getSection(): Observable<any> {
    return this.httpClient.get<any>(this.SECTION_URL);
  }

  getSubject(): Observable<any> {
    return this.httpClient.get<any>(this.SUBJECT_URL);
  }
}
