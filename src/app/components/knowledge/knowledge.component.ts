import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action, Knowledge } from 'src/app/interfaces';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
})
export class KnowledgeComponent implements OnInit {
  @Input() knowledge!: Knowledge;
  @Input() viewEdit!: boolean;

  @Output() updateKnowledge: EventEmitter<Knowledge> = new EventEmitter();
  @Output() action: EventEmitter<Action<Knowledge>> = new EventEmitter();

  msg: string = '';
  src = '';
  alt = '';

  ngOnInit(): void {
    this.src = this.knowledge.url_img;
    this.alt = this.knowledge.name_knowledge;
  }

  delete(event: Event) {
    let container = (event.target as HTMLElement)?.closest('.tech');
    let tech = container?.querySelector('figcaption')?.textContent;

    const MSG_CHECK = `¿Estás seguro que quieres eliminar ${tech} de tu lista de conocimientos?`;

    let checkDelete = window.confirm(MSG_CHECK);

    if (checkDelete)
      this.action.emit({ action: 'delete', element: this.knowledge });
  }

  update() {
    this.updateKnowledge.emit(this.knowledge);
  }
}
