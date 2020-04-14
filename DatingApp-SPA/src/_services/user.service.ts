import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/User';
import { PaginationResult } from 'src/app/_models/Pagination';
import { map } from 'rxjs/operators';

/*const httpOptions ={
  headers : new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};*/

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl =  environment.baseUrl;


constructor(private http: HttpClient) { }

getUsers(pageNumber?, pageSize?,userParams?): Observable<PaginationResult<User[]>> {
  const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();
    let params = new HttpParams();
    if (pageNumber != null && pageSize != null ) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    if (userParams!= null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }
  return this.http.get<User[]>(this.baseUrl + 'users',{observe: 'response', params})
    .pipe(
      map(response=> {
        paginationResult.result = response.body;
        if (response.headers.get('PaginationHeader') != null) {
          paginationResult.pagination = JSON.parse(response.headers.get('PaginationHeader'));
        }
        return paginationResult;
      })
    );
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id); //, httpOptions);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id, user);

}
setMainPhoto(userId: number, photoId: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + photoId + '/setMain', {} );

}

deletePhoto(userId: number, photoId: number) {
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + photoId );

}

}
