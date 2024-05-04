import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Allsubjects } from './allsubjects.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root', 
})
export class SubjectsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = environment.apiUrl + '/subject';
  private readonly ADD_SUBJECT_URL = environment.apiUrl + '/addsubjects';
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Allsubjects[]> = new BehaviorSubject<Allsubjects[]>(
    []

    
  );
  // Temporarily stores data from dialogs
  dialogData!: Allsubjects;
  confirmAdd: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Allsubjects[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  //---- Display Subject ----//

  getAllAllsubjects(): void {
    this.subs.sink = this.httpClient.get<Allsubjects[]>(this.API_URL).subscribe({
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


  //---- Add Subject ----//
  addSubject(subjectData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_SUBJECT_URL, subjectData);
  }

  //---- Delete Subject ----//
  deleteSubject(subjectCode: string): Observable<any> {
    const url = `${this.API_URL}/${subjectCode}`;
    return this.httpClient.delete(url);
  }


  //---- Update ubject ----//

  updateSubject(subjectID: number, updatedSubject: any): Observable<any> {
    const url = `${this.API_URL}/${subjectID}`;
    return this.httpClient.put(url, updatedSubject);


  }
  }
   