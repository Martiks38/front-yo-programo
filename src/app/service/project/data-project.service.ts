import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Project } from '../../interfaces';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class DataProjectService {
  private apiUrl = 'https://back-yo-programo-production.up.railway.app/api/v1/';

  http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl + 'projects');
  }

  saveProject(project: Project) {
    return this.http.post(this.apiUrl + 'save/project', project, {
      headers,
    });
  }

  deleteProject(id: number) {
    return this.http.post(this.apiUrl + 'delete/project', id, { headers });
  }
}
