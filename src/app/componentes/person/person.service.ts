import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './person-model';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  baseUrl: string = 'http://3.82.108.20/api/Person'
  baseContactUrl: string = 'http://3.82.108.20/api/Contact'

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient, private storageService: StorageService) {}

  showMessage(msg: string, action: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: action
    })
  }

  create(person: Person): Observable<Person> {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    return this.httpClient.post<Person>(`${this.baseUrl}/AddPerson`, person, { headers: headers }).pipe(
      map((obj) => obj),
      catchError((e) => this.errorhandler(e))
    );
  }

  errorhandler(p: any): Observable<any> {
    this.showMessage('Unexpected error occurs.', 'error')
    return EMPTY;
  }

  read() {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    return this.httpClient.get<any>(`${this.baseUrl}/GetPersons`, {headers: headers}).pipe(map((res: any) => {
      return res;
    }))
  }

  readByPerson(id: string) {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    return this.httpClient.get<any>(`${this.baseContactUrl}/GetContactsByPerson/${id}`, {headers: headers}).pipe(map((res: any) => {
      return res;
    }))
  }

  readById(id: string): Observable<Person> {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    const url = `${this.baseUrl}/GetPerson/${id}`
    return this.httpClient.get<Person>(url, {headers: headers})
  }

  update(person: Person): Observable<Person> {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    const url = `${this.baseUrl}/UpdatePerson`
    return this.httpClient.put<Person>(url, person, {headers: headers})
  }

  delete(id: string): Observable<Person> {
    let headers = new HttpHeaders()
    const token = this.storageService.getData('token')

    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Authorization', 'Bearer ' + token)

    const url = `${this.baseUrl}/DeletePerson/${id}`
    return this.httpClient.delete<Person>(url, {headers: headers})
  }

}
