import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { Contacts } from './contacts-model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl: string = 'http://3.82.108.20/api/Contact'

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient, private storageService: StorageService) { }

  showMessage(msg: string, action: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: action
    })
  }

  create(Contact: Contacts): Observable<Contacts> {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    return this.httpClient.post<Contacts>(`${this.baseUrl}/AddContact`, Contact, { headers: headers }).pipe(
      map((obj) => obj),
      catchError((e) => this.errorhandler(e))
    );
  }

  errorhandler(c: any): Observable<any> {
    this.showMessage('Unexpected error occured!', 'error')
    return EMPTY;
  }

  read() {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    return this.httpClient.get<any>(`${this.baseUrl}/GetContacts`, {headers: headers}).pipe(map((res: any) => {
      return res;
    }))
  }

  readById(id: string): Observable<Contacts> {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    const url = `${this.baseUrl}/GetContact/${id}`
    return this.httpClient.get<Contacts>(url, {headers: headers})
  }

  update(Contact: Contacts): Observable<Contacts> {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    const url = `${this.baseUrl}/UpdateContact`
    return this.httpClient.put<Contacts>(url, Contact, {headers: headers})
  }

  delete(id: string): Observable<Contacts> {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    const url = `${this.baseUrl}/DeleteContact?id=${id}`
    return this.httpClient.delete<Contacts>(url, {headers: headers})
  }
}
