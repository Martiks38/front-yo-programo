import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() modeEdit: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('login') login!: ElementRef;

  @HostListener('document:keydown', ['$event'])
  handleView($event: KeyboardEvent): void {
    let pressCtrlAndAlt = $event.ctrlKey && $event.altKey;

    if (pressCtrlAndAlt && $event.key === 'e') {
      this.isHiddenLogin = !this.isHiddenLogin;
      setTimeout(() => {
        if (this.login?.nativeElement) this.login?.nativeElement.focus();
      }, 200);
    }
  }

  isHiddenLogin: boolean = true;
  isLogin: boolean = false;

  error: string = '';

  data: boolean = true;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService
  ) {
    this.isLogin = Boolean(window.sessionStorage.getItem('isLogin'));

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
  }

  ngOnInit(): void {
    document.addEventListener('click', this.closeModal);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeModal);
  }

  get Username() {
    return this.form.get('username');
  }

  get Password() {
    return this.form.get('password');
  }

  closeModal() {
    this.isHiddenLogin = !this.isHiddenLogin;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.authentication.login(this.form.value).subscribe((data) => {
      if (data) {
        setTimeout(() => (this.isLogin = true), 1000);
        window.sessionStorage.setItem('isLogin', 'true');
        this.modeEdit.emit(true);
        this.isHiddenLogin = !this.isHiddenLogin;

        this.error = '';
      } else {
        this.error = 'Las credenciales que estás usando no son válidas.';
      }
    });
  }

  outEdit() {
    window.sessionStorage.removeItem('isLogin');

    this.isHiddenLogin = !this.isHiddenLogin;
    this.modeEdit.emit(false);

    setTimeout(() => (this.isLogin = false), 1000);
  }
}
