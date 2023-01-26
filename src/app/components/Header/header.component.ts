import { Component, Input } from '@angular/core';
import { ModeEditService } from 'src/app/service/modeEdit/mode-edit.service';
import { $, $$ } from '../../utils/selectors';

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

  header: Element | null = null;
  menu: Element | null = null;
  itemsMenu: NodeListOf<Element> | null = null;
  viewFormLogin = false;

  connectionText: string;

  constructor(private modeEditService: ModeEditService) {
    this.connectionText = 'Iniciar Sesión';
  }

  ngOnInit() {
    this.modeEditService.dispatchEdit.subscribe(
      (mode) =>
        (this.connectionText = mode ? 'Cerrar Sesión' : 'Iniciar Sesión')
    );
  }

  connect() {
    if (this.viewEdit) {
      this.modeEditService.dispatchEdit.emit(false);
    } else {
      this.viewFormLogin = true;
    }
  }

  closeForm() {
    this.viewFormLogin = false;
  }

  outEdit() {
    if (!this.viewEdit) return;

    this.modeEditService.dispatchEdit.emit(false);
  }
}
