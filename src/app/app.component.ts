import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Action, Knowledge, Project } from './interfaces';
import { DataKnowledgeService } from './service/knowledge/data-knowledge.service';
import { DataProjectService } from './service/project/data-project.service';
import { DataUserService } from './service/user/dataUser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('aboutMe') aboutMe!: ElementRef;

  description: string[] = [];
  knowledges: Knowledge[] = [];
  projects: Project[] = [];
  contact: string[] = [];
  email: string = '';

  viewEdit: boolean;

  dataUser = inject(DataUserService);
  dataProject = inject(DataProjectService);
  dataKnowledge = inject(DataKnowledgeService);

  constructor() {
    this.viewEdit = Boolean(window.sessionStorage.getItem('isLogin'));
  }

  ngOnInit() {
    this.dataUser
      .getDescription()
      .subscribe((descript) => (this.description = descript.split('\\n')));

    this.dataUser.getContact().subscribe((contact) => {
      let message = contact.split('\\n');
      this.contact = message.slice(0, -1);
      this.email = message.at(-1) as string;
    });

    this.dataKnowledge
      .getKnowledges()
      .subscribe((knowledges) => (this.knowledges = knowledges));

    this.dataProject
      .getProjects()
      .subscribe((projects) => (this.projects = projects));
  }

  toggleEdit() {
    this.viewEdit = !this.viewEdit;
  }

  changeDescription(description: string) {
    this.description = description.split('\\n');
  }

  changeContact(changes: { contact: string; email: string }) {
    this.contact = changes.contact.split('\\n');
    this.email = changes.email;
  }

  deleteKnowledge(id: number) {
    this.knowledges = this.knowledges.filter(
      (knowledge) => knowledge.knowledge_id !== id
    );
  }

  saveKnowledges(knowledge: Knowledge) {
    if (!knowledge.knowledge_id) {
      this.knowledges.push(knowledge);
      return;
    }

    let indexKnowledge = this.knowledges.findIndex(
      (k) => knowledge.knowledge_id === k.knowledge_id
    );

    this.knowledges[indexKnowledge] = knowledge;
  }

  deleteProject(id: number) {
    this.projects = this.projects.filter(
      (project) => project.project_id !== id
    );
  }

  saveProject(project: Project) {
    if (!project.project_id) {
      this.projects.push(project);
      return;
    }

    let indexProject = this.projects.findIndex(
      (p) => project.project_id === p.project_id
    );

    this.projects[indexProject] = project;
  }

  handlerProject(changes: Action<Project>) {
    const { action, element } = changes;

    console.log(element);

    let id = element.project_id;

    if (action === 'delete' && id) this.deleteProject(id);

    if (action === 'save') this.saveProject(element);
  }

  handlerKnowledge(changes: Action<Knowledge>) {
    const { action, element } = changes;

    let id = element.knowledge_id;

    if (action === 'delete' && id) this.deleteKnowledge(id);

    if (action === 'save') this.saveKnowledges(element);
  }
}
