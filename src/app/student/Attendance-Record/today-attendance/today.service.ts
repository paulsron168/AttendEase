import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Today } from './today.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class TodayService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/today.json';
  private readonly STUDENTS_STUDENT_URL =  environment.apiUrl + '/students_per_student';
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
    this.subs.sink = this.httpClient.get<Today[]>(this.STUDENTS_STUDENT_URL).subscribe({
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
}
