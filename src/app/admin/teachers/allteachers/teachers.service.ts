import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Teachers } from './teachers.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class TeachersService extends UnsubscribeOnDestroyAdapter {
  
  private readonly CNT_TEACHER_URL = 'http://localhost:5005/count_teacher';
  private readonly CNT_STUDENT_URL = 'http://localhost:5005/count_student';

  private readonly TEACHER_URL = 'http://localhost:5005/teacher';
  private readonly ADD_TEACHER_URL = 'http://localhost:5005/add_teacher';
  private readonly UPD_TEACHER_URL = 'http://localhost:5005/update_teacher';
  private readonly DEL_TEACHER_URL = 'http://localhost:5005/delete_teacher';
  private readonly UPLOAD_URL = 'http://localhost:5005/uploadProfilePicture';

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
    this.subs.sink = this.httpClient.get<Teachers[]>(this.TEACHER_URL).subscribe({
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

  updateTeacher(id: number, updatedTeacher: any): Observable<any> {
    const url = `${this.UPD_TEACHER_URL}/${id}`;
    return this.httpClient.put(url, updatedTeacher);
  }

  deleteTeacher(id: number): Observable<any> {
    const url = `${this.DEL_TEACHER_URL}/${id}`;
    return this.httpClient.delete(url);
  }

  addTeacher(teacherData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_TEACHER_URL, teacherData);
  }

  uploadImage(image: any): Observable<any> {
    return this.httpClient.post<any>(this.UPLOAD_URL, image);
  }

  countTeacher(): Observable<any> {
    return this.httpClient.get<any>(this.CNT_TEACHER_URL);
  }

  countStudent(): Observable<any> {
    return this.httpClient.get<any>(this.CNT_STUDENT_URL);
  }
}
