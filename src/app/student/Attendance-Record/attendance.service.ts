import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject} from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AllAttendance} from './attendance.model';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends UnsubscribeOnDestroyAdapter {
  private readonly API_ATTENDANCE_URL = environment.apiUrl + '/attendance';
  
  
  isTblLoading = true;
  dataAttendanceChange: BehaviorSubject<AllAttendance[]> = new BehaviorSubject<AllAttendance[]>(
    []);
    
   
  // Temporarily stores data from dialogs
  dialogData!: AllAttendance ;


  constructor(private http: HttpClient) { 
    super()
  }

  getAttendanceRecords(): Observable<any[]> {
    return this.http.get<any[]>('/api/attendance');
  }

  exportToExcel(): Observable<Blob> {
    return this.http.get('/api/attendance/export', { responseType: 'blob' });
  }
}
