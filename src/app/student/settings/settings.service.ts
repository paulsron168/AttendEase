import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { Settings } from './settings.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends UnsubscribeOnDestroyAdapter {

  Settings(value: any) {
    throw new Error('Method not implemented.');
  }

  private readonly GET_MYACCOUNT_DATA_URL = environment.apiUrl + '/my_account';
  private readonly CHECK_PASSWORD_URL = environment.apiUrl + '/check_password';
  private readonly CHECK_EMAIL_URL = environment.apiUrl + '/check_email';
  private readonly UPDATE_PASSWORD_URL = environment.apiUrl + '/update_password';
  private readonly UPDATE_MYACCOUNT_URL = environment.apiUrl + '/update_myaccount';

  isTblLoading = true;
  dataChange: BehaviorSubject<Settings[]> = new BehaviorSubject<Settings[]>([]);

  // Temporarily stores data from dialogs
  dialogData!: Settings;
  constructor(private httpClient: HttpClient) {
    super();
  }

  getMyAccountData(id: number,data:any): Observable<any> {
    const url = `${this.GET_MYACCOUNT_DATA_URL}/${id}`;
    return this.httpClient.post(url,data);
  }

  checkPassword(id: number,data:any): Observable<any> {
    const url = `${this.CHECK_PASSWORD_URL}/${id}`;
    return this.httpClient.post(url,data);
  }

  checkEmail(id: number,data:any): Observable<any> {
    const url = `${this.CHECK_EMAIL_URL}/${id}`;
    return this.httpClient.post(url,data);
  }
  
  updatePassword(id: number,data:any): Observable<any> {
    const url = `${this.UPDATE_PASSWORD_URL}/${id}`;
    return this.httpClient.post(url,data);
  }

  updateAccount(id: number,data:any): Observable<any> {
    const url = `${this.UPDATE_MYACCOUNT_URL}/${id}`;
    return this.httpClient.post(url,data);
  }
  

  get data(): Settings[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  // getAllSettings(): void {
  //   this.subs.sink = this.httpClient.get<Settings[]>(this.API_URL).subscribe({
  //     next: (data) => {
  //       this.isTblLoading = false;
  //       this.dataChange.next(data);
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.isTblLoading = false;
  //       console.log(error.name + ' ' + error.message);
  //     },
  //   });
  // }
  addSettings(settings: Settings): void {
    this.dialogData = settings;

    // this.httpClient.post(this.API_URL, settings)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = settings;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateSettings(settings: Settings): void {
    this.dialogData = settings;
    // this.httpClient.put(this.API_URL + settings.id,settings)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = settings;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteSettings(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
