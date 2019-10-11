import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/User';

const httpOptions ={
  headers : new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl =  environment.baseUrl;


constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users', httpOptions);
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
}

}
