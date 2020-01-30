import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `http://localhost:3000/users`;

  constructor(
    private http: HttpClient,
  ) { }

  get(id?: string | number): Observable<User | User[]> {
    return this.http.get<User | User[]>(`${this.apiUrl}/${id || ``}`);
  }
}
