import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from './settings.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends UnsubscribeOnDestroyAdapter {
  //         console.log(id);
  //       },
  //       error: (error: HttpErrorResponse) => {
  //          // error code here
  //       },
  //     });
  Settings(value: any) {
    throw new Error('Method not implemented.');
  }
  private readonly API_URL = 'assets/data/settings.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Settings[]> = new BehaviorSubject<Settings[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Settings;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Settings[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllSettings(): void {
    this.subs.sink = this.httpClient.get<Settings[]>(this.API_URL).subscribe({
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
