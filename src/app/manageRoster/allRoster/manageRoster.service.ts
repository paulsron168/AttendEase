import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {ManageRoster } from './manageRoster.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class ManageRosterService extends UnsubscribeOnDestroyAdapter {
  
  private readonly API_URL = 'http://localhost:5005/manageRoster';
  private readonly ADD_ROSTER_URL = 'http://localhost:5005/addroster';

  isTblLoading = true;
  dataChange: BehaviorSubject<ManageRoster[]> = new BehaviorSubject<ManageRoster[]>([]);
  dialogData!: ManageRoster;
  http: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data():ManageRoster[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllManageRoster(): void {
    this.subs.sink = this.httpClient.get<ManageRoster[]>(this.API_URL).subscribe({
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

  

  updateManageRoster(classRoster_ID: number, updatedManageRoster: any): Observable<any> {
    const url = `${this.API_URL}/${classRoster_ID}`;
    return this.httpClient.put(url, updatedManageRoster);
  }

  deleteManageRoster(classRoster_ID: number): Observable<any> {
    const url = `${this.API_URL}/${classRoster_ID}`;
    return this.httpClient.delete(url);
  }

  addManageRoster(manageRosterData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_ROSTER_URL, manageRosterData);
  }
}
