import { Component, Input } from '@angular/core';
import { ModeEditService } from 'src/app/service/modeEdit/mode-edit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() viewEdit!: boolean;

  styles = 'menu';
  values = {
    label: 'Menú de navegación',
    hidden: 'true',
    expanded: 'false',
  };

  links = [
    ['INICIO', '#home'],
    ['SOBRE MÍ', '#about-me'],
    ['PROYECTOS', '#projects'],
    ['CONOCIMIENTOS', '#knowledge'],
    ['CONTACTO', '#contact'],
  ];

  header: Element | null = null;
  menu: Element | null = null;
  itemsMenu: NodeListOf<Element> | null = null;
  viewFormLogin = false;

  connectionText: string;

  constructor(private modeEditService: ModeEditService) {
    let isLogin = window.sessionStorage.getItem('isLogin') === 'true';

    this.connectionText = isLogin ? 'CERRAR SESIÓN' : 'INICIAR SESIÓN';
  }

  ngOnInit() {
    let isLogin = window.sessionStorage.getItem('isLogin') === 'true';

    if (isLogin) this.modeEditService.dispatchEdit.emit(true);

    this.modeEditService.dispatchEdit.subscribe(
      (mode) =>
        (this.connectionText = mode ? 'CERRAR SESIÓN' : 'INICIAR SESIÓN')
    );
  }

  connect() {
    this.toggleViewNav();

    if (this.viewEdit) {
      this.modeEditService.dispatchEdit.emit(false);
      window.sessionStorage.setItem('isLogin', 'false');
    } else {
      this.viewFormLogin = true;
    }
  }

  closeForm() {
    this.viewFormLogin = false;
  }

  toggleViewNav() {
    if (window.innerWidth > 1041) return;

    document.querySelector('.header')?.classList.toggle('menu-view');
    document.querySelector('.menu')?.classList.toggle('collapse');
  }
}
