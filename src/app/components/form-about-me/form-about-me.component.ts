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
  selector: 'app-form-about-me',
  templateUrl: './form-about-me.component.html',
  styleUrls: ['./form-about-me.component.scss'],
})
export class FormAboutMeComponent {
  @Input() viewEdit!: boolean;
  @Input() description!: string[];
  @Output() watchAboutMe: EventEmitter<string> = new EventEmitter();
  @ViewChild('textarea') textarea!: ElementRef;

  isEdit: boolean = false;
  formAboutMe!: FormGroup;
  msg: string = '';
  hidden: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private dataUser: DataUserService
  ) {}

  get AboutMe() {
    return this.formAboutMe.get('aboutMe');
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
    this.toggleEdit();

    let aboutMe = this.description.join('\\n');

    this.formAboutMe = this.formBuilder.group({
      aboutMe: [aboutMe, [Validators.maxLength(255), Validators.required]],
    });
  }

  update(event: Event) {
    event.preventDefault();

    let description = this.formAboutMe.get('aboutMe')?.value as string;

    this.hidden = !this.hidden;

    this.dataUser.saveAboutMe(description).subscribe((data) => {
      if (data) {
        this.msg = 'Actualización con éxito.';
        this.watchAboutMe.emit(description);
        this.formAboutMe.setValue({ aboutMe: '' });

        setTimeout(() => {
          this.msg = '';
          this.isEdit = !this.isEdit;
        }, 3500);
      } else {
        this.msg = 'Error al actualizar.';
      }

      this.hidden = !this.hidden;
    });
  }
}
