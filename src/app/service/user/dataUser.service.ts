import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class DataUserService {
  private apiUrl = 'https://back-yo-programo-production.up.railway.app/';

  http = inject(HttpClient);

  getDescription(): Observable<string> {
    return this.http.get(this.apiUrl + 'about-me', {
      responseType: 'text',
    });
  }

  getContact(): Observable<string> {
    return this.http.get(this.apiUrl + 'contact', {
      responseType: 'text',
    });
  }

  saveAboutMe(description: string) {
    return this.http.post(this.apiUrl + 'update/about-me', description, {
      headers,
    });
  }

  saveContact(contact: string) {
    return this.http.post(this.apiUrl + 'update/contact', contact, {
      headers,
    });
  }
}
