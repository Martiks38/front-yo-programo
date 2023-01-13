import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Knowledge } from '../../interfaces';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class DataKnowledgeService {
  private apiUrl = 'https://back-yo-programo-production.up.railway.app/api/v1/';

  http = inject(HttpClient);

  getKnowledges(): Observable<Knowledge[]> {
    return this.http.get<Knowledge[]>(this.apiUrl + 'knowledges');
  }

  saveKnowledge(knowledge: Knowledge) {
    return this.http.post(this.apiUrl + 'save/knowledge', knowledge, {
      headers,
    });
  }

  deleteKnowledge(id: number) {
    return this.http.post(this.apiUrl + 'delete/knowledge', id, {
      headers,
    });
  }
}
