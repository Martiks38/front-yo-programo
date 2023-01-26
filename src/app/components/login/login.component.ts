import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ModeEditService } from 'src/app/service/modeEdit/mode-edit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() viewForm!: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('login')
  login!: ElementRef;

  error: string = '';

  data: boolean = true;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private modeEditService: ModeEditService
  ) {
    this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
        ],
      ],
    });

    setTimeout(() => {
      if (this.login?.nativeElement) this.login?.nativeElement.focus();
    }, 300);
  }

  get Username() {
    return this.form.get('username');
  }

  get Password() {
    return this.form.get('password');
  }

  closeModal() {
    this.close.emit(false);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.authentication.login(this.form.value).subscribe((data) => {
      if (data) {
        this.modeEditService.dispatchEdit.emit(true);
        window.sessionStorage.setItem('isLogin', 'true');

        this.error = '';
        this.close.emit(false);
      } else {
        this.error = 'Las credenciales que estás usando no son válidas.';
      }
    });
  }
}
