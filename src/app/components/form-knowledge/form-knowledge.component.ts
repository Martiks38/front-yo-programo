import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Action, Knowledge } from 'src/app/interfaces';
import { DataKnowledgeService } from 'src/app/service/knowledge/data-knowledge.service';

@Component({
  selector: 'app-form-knowledge',
  templateUrl: './form-knowledge.component.html',
  styleUrls: ['./form-knowledge.component.scss'],
})
export class FormKnowledgeComponent {
  @Input() knowledges!: Knowledge[];
  @Input() viewEdit!: boolean;
  @Output() updatePage: EventEmitter<Action<Knowledge>> = new EventEmitter();
  @ViewChild('input') input!: ElementRef;

  nameKnowledge!: string;
  title: string = this.nameKnowledge
    ? `Actualizar datos de "${this.nameKnowledge}"`
    : 'Nueva tecnología/conocimiento';
  urlImg!: string;
  viewForm: boolean = false;
  hidden: boolean = true;
  msg: string = '';
  formKnowledge!: FormGroup;

  constructor(
    private dataKnowledge: DataKnowledgeService,
    private formBuilder: FormBuilder
  ) {}

  get NameKnowledge() {
    return this.formKnowledge.get('nameKnowledge');
  }

  get UrlImage() {
    return this.formKnowledge.get('urlImage');
  }

  addKnowledge() {
    this.viewForm = true;

    setTimeout(() => this.input.nativeElement?.focus(), 300);

    this.formKnowledge = this.formBuilder.group({
      knowledgeId: [undefined, []],
      nameKnowledge: ['', [Validators.maxLength(30), Validators.required]],
      urlImage: ['', [Validators.maxLength(255), Validators.required]],
    });
  }

  showForm(knowledge: Knowledge) {
    this.viewForm = true;

    this.nameKnowledge = knowledge.name_knowledge;
    this.urlImg = knowledge.url_img;

    setTimeout(() => this.input.nativeElement.focus(), 300);

    this.formKnowledge = this.formBuilder.group({
      knowledgeId: [knowledge.knowledge_id],
      nameKnowledge: [
        knowledge.name_knowledge,
        [Validators.maxLength(30), Validators.required],
      ],
      urlImage: [
        knowledge.url_img,
        [Validators.maxLength(255), Validators.required],
      ],
    });
  }

  hideForm() {
    this.viewForm = false;
  }

  update(event: Event) {
    event.preventDefault();

    let name_knowledge: string = this.formKnowledge.get('nameKnowledge')?.value;
    let url_img: string = this.formKnowledge.get('urlImage')?.value;
    let knowledge_id: number = this.formKnowledge.get('knowledgeId')?.value;

    this.viewForm = false;

    if (name_knowledge === this.nameKnowledge && url_img === this.urlImg) {
      this.msg = `Se ha actualizado correctamente ${this.nameKnowledge}`;

      setTimeout(() => (this.msg = ''), 3500);

      return;
    }

    let knowledge: Knowledge = {
      name_knowledge,
      url_img,
    };

    if (knowledge_id) knowledge = { ...knowledge, knowledge_id };

    this.actionListener({ action: 'save', element: knowledge });
  }

  actionListener(changes: Action<Knowledge>) {
    const { action, element } = changes;

    let id = element.knowledge_id;
    let tech = element.name_knowledge;

    this.hidden = !this.hidden;

    if (action === 'delete' && id) {
      this.dataKnowledge.deleteKnowledge(id).subscribe((data) => {
        this.msg = data
          ? `Se ha eliminado correctamente ${tech}`
          : `No se pudo eliminar ${tech}`;

        this.hidden = !this.hidden;

        setTimeout(() => (this.msg = ''), 3500);
      });
    }

    if (action === 'save') {
      this.dataKnowledge.saveKnowledge(element).subscribe((data) => {
        this.msg = data
          ? `Se ha actualizado correctamente ${tech}`
          : `No se pudo actualizar ${tech}`;

        this.hidden = !this.hidden;

        setTimeout(() => (this.msg = ''), 3500);
      });
    }

    this.updatePage.emit(changes);
  }
}
