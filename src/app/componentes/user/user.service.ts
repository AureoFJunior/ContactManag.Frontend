import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserDTO } from './user.model';
import { EMPTY, Observable } from 'rxjs';
import { catchError, defaultIfEmpty, filter, first, isEmpty, map } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://3.82.108.20/api/User';
  authUser: boolean = false;
  userObv: Observable<User> = new Observable<User>()

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient, private storageService: StorageService) { }

  showMessage(msg: string, action: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: action
    })
  }

  create(user: User): Observable<User> {
    let headers = new HttpHeaders()

    console.log(user);
    console.log(`${this.baseUrl}/AddUser`);

    return this.httpClient.post<User>(`${this.baseUrl}/AddUser`, user, { headers: headers }).pipe(
      map((obj) => obj),
      catchError((e) => this.errorhandler(e))
          );
  }

  errorhandler(e: any): Observable<any> {
    this.showMessage('Unexpected error occured!', 'error')
    return EMPTY;
  }

  read() {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    return this.httpClient.get<any>(`${this.baseUrl}/GetUsers`, {headers: headers}).pipe(map((res: any) => {
      return res;
    }))
  }

  changeStatus(user: User) {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    this.httpClient.post<User>(`${this.baseUrl}/UpdateUser`, user, { headers: headers }).pipe(
      map((obj) => obj),
      catchError((e) => this.errorhandler(e))
    );
  }

  hasValue(value: any) {
    return value !== null && value !== undefined;
  }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders()

    console.log(this.baseUrl)
    let login = this.httpClient.get<UserDTO>(`${this.baseUrl}/LogInto/${user.userName}/${user.password}`, { headers: headers }).pipe(
      map((obj) => obj),
      catchError((e) => this.errorhandler(e))
    );

    if (login === this.userObv) {
      this.authUser = false
    }
    else {
      this.authUser = true
    }
    return login
  }

  isLogged(): Observable<User> {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    return this.httpClient.get<any>(`${this.baseUrl}/isLogged`, {headers: headers}).pipe(map((res: any) => {
      return res;
    }))
  }

  userAuthenticator() {
    return this.authUser
  }

  readById(id: string): Observable<User> {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    const url = `${this.baseUrl}/GetUser/${id}`
    return this.httpClient.get<User>(url, {headers: headers})
  }

  update(user: User): Observable<User> {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    const url = `${this.baseUrl}/UpdateUser`
    return this.httpClient.put<User>(url, user, {headers: headers})
  }
}
