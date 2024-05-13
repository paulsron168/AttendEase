import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { Role } from '@core/models/role';
import { environment } from 'environments/environment.development';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private readonly LOGIN_URL = environment.apiUrl + '/login';

  private users = [
    {
      id: 1,
      img: 'assets/images/user/admin.jpg',
      username: 'admin@software.com',
      password: 'admin@123',
      firstName: 'Ellah',
      lastName: 'Jones',
      role: Role.Admin,
      token: 'admin-token',
    },
    {
      id: 2,
      img: 'assets/images/user/employee.jpg',
      username: 'teacher@software.com',
      password: 'teacher@123',
      firstName: 'Ashton',
      lastName: 'Cox',
      role: Role.Teacher,
      token: 'employee-token',
    },
    {
      id: 3,
      img: 'assets/images/user/client.jpg',
      username: 'client@software.com',
      password: 'client@123',
      firstName: 'Cara',
      lastName: 'Stevens',
      role: Role.Student,
      token: 'client-token',
    },
  ];

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  capitalizeFirstLetter(string:any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  login(username: string, password: string) {

    let q_data = {
      "username":username,
      "password":password
    }
    // return this.http.post<any>(this.LOGIN_URL, q_data);
  
    // return this.http.post<any>(this.LOGIN_URL, q_data);
    this.http.post<any>(this.LOGIN_URL,q_data).subscribe({
        next: (data) => {
          if(data.length > 0){
            let user = data[0];
            let userstate = {
              id: user.id,
              img: user.profile_picture,
              username: user.username,
              password: user.password,
              firstName: user.firstname,
              lastName: user.lastname,
              role: this.capitalizeFirstLetter(user.user_type),
              token: 'admin-token',
            };
            
            this.currentUserSubject.next(userstate);
            localStorage.setItem('currentUser', JSON.stringify(userstate));
          }
        },
        error: (error: any) => {
          console.log(error.name + ' ' + error.message);
          return this.error('Username or password is correct');
      },
    });

      return this.http.post<any>(this.LOGIN_URL, q_data);
  }

  ok(body?: {
    id: number;
    img: string;
    username: string;
    firstName: string;
    lastName: string;
    token: string;
  }) {
    return of(new HttpResponse({ status: 200, body }));
  }

  error(message: string) {
    return throwError(message);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }
}
