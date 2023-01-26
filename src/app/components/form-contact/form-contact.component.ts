import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataUserService } from 'src/app/service/user/dataUser.service';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
})
export class FormContactComponent {
  @Input() viewEdit!: boolean;
  @Input() email!: string;
  @Input() contact!: string[];
  @Output() updateContact: EventEmitter<{ contact: string; email: string }> =
    new EventEmitter();
  @ViewChild('textarea') textarea!: ElementRef;

  msg: string = '';
  isEdit: boolean = false;
  viewForm: boolean = false;
  hidden: boolean = true;
  formContact!: FormGroup;

  constructor(
    private dataUser: DataUserService,
    private formBuilder: FormBuilder
  ) {}

  get Email() {
    return this.formContact.get('email');
  }

  get FinalMsg() {
    return this.formContact.get('finalMsg');
  }

  toggleEdit() {
    if (!this.isEdit) {
      setTimeout(() => {
        if (this.textarea?.nativeElement) this.textarea.nativeElement.focus();
      }, 300);
    }

    this.isEdit = !this.isEdit;
  }

  showForm() {
    this.viewForm = true;

    this.toggleEdit();

    let finalMsg = this.contact.join('\\n');

    setTimeout(() => this.textarea.nativeElement?.focus(), 300);

    this.formContact = this.formBuilder.group({
      finalMsg: [finalMsg, [Validators.maxLength(255), Validators.required]],
      email: [this.email, [Validators.email, Validators.required]],
    });
  }

  update(event: Event) {
    event.preventDefault();

    let finalMsg = this.formContact.get('finalMsg')?.value;
    let email = this.formContact.get('email')?.value;
    let contact = [finalMsg, email].join('\\n');

    this.hidden = !this.hidden;

    this.dataUser.saveContact(contact).subscribe((data) => {
      if (data) {
        this.msg = 'Actualización con éxito.';
        this.updateContact.emit({ contact: finalMsg, email });

        setTimeout(() => {
          this.msg = '';
          this.isEdit = !this.isEdit;
          this.hidden = !this.hidden;
        }, 3500);
      } else {
        this.msg = 'Error al actualizar';
      }
    });
  }
}
