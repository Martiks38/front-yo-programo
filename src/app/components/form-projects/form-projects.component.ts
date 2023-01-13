import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Action, Project } from 'src/app/interfaces';
import { DataProjectService } from 'src/app/service/project/data-project.service';

@Component({
  selector: 'app-form-projects',
  templateUrl: './form-projects.component.html',
  styleUrls: ['./form-projects.component.scss'],
})
export class FormProjectsComponent {
  @Input() viewEdit!: boolean;
  @Input() projects!: Project[];
  @Output() updatePage: EventEmitter<Action<Project>> = new EventEmitter();
  @ViewChild('input') input!: ElementRef;

  titleProject!: string;
  description!: string;
  made!: string | undefined;
  urlPage!: string;
  urlCode!: string;
  urlImg!: string;

  formProject!: FormGroup;
  title: string = this.titleProject
    ? `Actualizar datos de "${this.titleProject}"`
    : 'Nuevo proyecto';
  msg!: string;

  hidden: boolean = true;
  viewForm: boolean = false;

  constructor(
    private dataProject: DataProjectService,
    private formBuilder: FormBuilder
  ) {}

  get Title() {
    return this.formProject.get('titleProject');
  }

  get Techs() {
    return this.formProject.get('techs');
  }

  get Description() {
    return this.formProject.get('description');
  }

  get UrlCode() {
    return this.formProject.get('urlCode');
  }

  get UrlImage() {
    return this.formProject.get('urlImage');
  }

  addProject() {
    this.viewForm = true;

    setTimeout(() => this.input.nativeElement?.focus(), 300);

    this.formProject = this.formBuilder.group({
      projectId: [undefined, []],
      titleProject: ['', [Validators.maxLength(30), Validators.required]],
      description: ['', [Validators.required]],
      techs: ['', [Validators.required]],
      urlPage: ['', Validators.maxLength(255)],
      urlCode: ['', [Validators.maxLength(255), Validators.required]],
      urlImage: ['', [Validators.maxLength(255), Validators.required]],
    });
  }

  hideForm() {
    this.viewForm = false;
  }

  showForm(project: Project) {
    this.viewForm = true;

    this.titleProject = project.title;
    this.description = project.description;
    this.made = project.made;
    this.urlPage = project.url_page;
    this.urlCode = project.url_code;
    this.urlImg = project.url_img;

    setTimeout(() => this.input.nativeElement?.focus(), 300);

    let desc = project.description.split('\\n').slice(0, -1);
    let made = project.description
      .split('\\n')
      ?.at(-1)
      ?.split(/Hecho con |, | y /)
      .filter((words) => words !== '')
      .join('\n');

    console.log(project);
    this.formProject = this.formBuilder.group({
      projectId: [project.project_id],
      titleProject: [
        project.title,
        [Validators.maxLength(30), Validators.required],
      ],
      description: [desc, [Validators.required]],
      techs: [made, [Validators.required]],
      urlPage: [project.url_page, Validators.maxLength(255)],
      urlCode: [
        project.url_code,
        [Validators.maxLength(255), Validators.required],
      ],
      urlImage: [
        project.url_img,
        [Validators.maxLength(1500), Validators.required],
      ],
    });
  }

  checkEqualValues(dataProject: Project) {
    let equalsValues =
      dataProject.title === this.titleProject &&
      dataProject.description === this.description &&
      dataProject.made === this.made;

    let equalsUrls =
      dataProject.url_page === this.urlPage &&
      dataProject.url_code === this.urlCode &&
      dataProject.url_img === this.urlImg;

    if (equalsValues && equalsUrls) {
      this.msg = `Se ha actualizado correctamente ${this.titleProject}`;

      setTimeout(() => (this.msg = ''), 3500);

      return;
    }
  }

  update(event: Event) {
    event.preventDefault();

    this.viewForm = false;

    let description =
      this.formProject.get('description')?.value +
      '\nHecho con ' +
      new Intl.ListFormat('es', {
        style: 'long',
        type: 'conjunction',
      }).format(this.formProject.get('techs')?.value.split('\n'));

    let project: Project = {
      title: this.formProject.get('titleProject')?.value,
      description,
      url_page: this.formProject.get('urlPage')?.value,
      url_code: this.formProject.get('urlCode')?.value,
      url_img: this.formProject.get('urlImage')?.value,
    };

    this.checkEqualValues(project);

    let project_id: number = this.formProject.get('projectId')?.value;

    if (project_id) project = { ...project, project_id };

    this.actionListener({ action: 'save', element: project });
  }

  actionListener(changes: Action<Project>) {
    const { action, element } = changes;

    let { project_id, title } = element;

    this.hidden = true;

    if (action === 'delete' && project_id) {
      this.dataProject.deleteProject(project_id).subscribe((data) => {
        this.msg = data
          ? `Se ha eliminado correctamente ${title}`
          : `No se pudo eliminar ${title}`;

        this.hidden = false;

        setTimeout(() => (this.msg = ''), 3500);
      });
    }

    if (action === 'save') {
      this.dataProject.saveProject(element).subscribe((data) => {
        this.msg =
          data && project_id
            ? `Se ha actualizado correctamente ${title}`
            : data
            ? `Se ha añadido correctamente ${title}`
            : `Ha ocurrido un error durante el proceso`;

        this.hidden = false;

        setTimeout(() => (this.msg = ''), 35000);
      });
    }

    this.updatePage.emit(changes);
  }
}
