import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {ManageRoster } from './manageRoster.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ManageRosterService extends UnsubscribeOnDestroyAdapter {
  
  private readonly ROSTERED_URL = environment.apiUrl + '/rostered';
  private readonly ADD_ROSTER_URL = environment.apiUrl + '/add_roster';
  private readonly UPD_ROSTER_URL = environment.apiUrl + '/update_roster';
  private readonly DEL_ROSTER_URL = environment.apiUrl + '/delete_roster';
  private readonly ADD_ROSTER_PIN_URL = environment.apiUrl + '/add_roster_pin';
  private readonly ADD_ROSTER_PIN_ALERTS_URL = environment.apiUrl + '/add_roster_pin_alerts';
  private readonly GET_ROSTER_PIN_ALERTS_PERSECTION_URL = environment.apiUrl + '/roster_pin_alerts_per_section';

  

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
    this.subs.sink = this.httpClient.get<ManageRoster[]>(this.ROSTERED_URL).subscribe({
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

  addRoster(rosterData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_ROSTER_URL, rosterData);
  }

  updateManageRoster(roster_id: number, updatedManageRoster: any): Observable<any> {
    const url = `${this.UPD_ROSTER_URL}/${roster_id}`;
    return this.httpClient.put(url, updatedManageRoster);
  }
  
  deleteManageRoster(roster_id: number): Observable<any> {
    const url = `${this.DEL_ROSTER_URL}/${roster_id}`;
    return this.httpClient.delete(url);
  }

  addManageRoster(manageRosterData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_ROSTER_URL, manageRosterData);
  }

  addRosterPin(manageRosterData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_ROSTER_PIN_URL, manageRosterData);
  }

  addRosterPinAlerts(manageRosterData: any): Observable<any> {
    return this.httpClient.post<any>(this.ADD_ROSTER_PIN_ALERTS_URL, manageRosterData);
  }

  getRosterPinAlertsPerSection(roster_pin_id: any,manageRosterData:any): Observable<any> {
    const url = `${this.GET_ROSTER_PIN_ALERTS_PERSECTION_URL}/${roster_pin_id}`;
    return this.httpClient.post<any>(url, manageRosterData);
  }
}
