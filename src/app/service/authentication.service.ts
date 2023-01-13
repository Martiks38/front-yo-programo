import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url = 'https://back-yo-programo-production.up.railway.app/api/v1/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    let res = this.http.post(this.url, credentials);

    return res;
  }
}
