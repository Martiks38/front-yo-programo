import { Component, OnInit } from '@angular/core';
import { $, $$ } from '../../utils/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  styles = 'menu';
  values = {
    label: 'Menú de navegación',
    hidden: 'true',
    expanded: 'false',
  };

  header: Element | null = null;
  menu: Element | null = null;
  itemsMenu: NodeListOf<Element> | null = null;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    // this.header = $('.header');
    // this.menu = $('.menu');
    // this.itemsMenu = $$('.navMenu__item');
    // this.bindEvents();
  }

  /** Change the aria attributes and modify the menu button and show or hide the menu list */
  changeMenuView() {
    if (!this.menu || !this.header) return;

    let visibleMenu = this.menu.classList.contains('collapse');

    if (visibleMenu) {
      this.menu.setAttribute('aria-expanded', 'false');
      this.header.setAttribute('aria-hidden', 'true');
    } else {
      this.menu.setAttribute('aria-expanded', 'true');
      this.header.setAttribute('aria-hidden', 'false');
    }

    this.header.classList.toggle('menu-view');
    this.menu.classList.toggle('collapse');
  }

  bindEvents() {
    if (!this.menu || !this.itemsMenu) return;

    this.itemsMenu.forEach((itemMenu) =>
      itemMenu.addEventListener('click', this.changeMenuView)
    );

    this.menu.addEventListener('click', this.changeMenuView);

    /** Calls the changeMenuView() function on click outside of the navigation menu or menu button */
    document.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;

      if (!target || !this.menu) return;

      const isHeaderOrMenu =
        target.closest('.header') || target.closest('.menu');
      const isCollapse = this.menu.classList.contains('collapse');

      if (!isHeaderOrMenu && isCollapse) this.changeMenuView();
    });

    /** Sets the aria attributes according to the initial dimensions */
    document.addEventListener('DOMContentLoaded', () => {
      if (!this.menu || !this.header) return;

      const width = window.innerWidth;

      if (width < 776) {
        this.menu.setAttribute('aria-hidden', 'false');
        this.header.setAttribute('aria-hidden', 'true');
      }
    });

    /** Modifies the aria attributes according to the new dimensions */
    window.addEventListener('resize', () => {
      if (!this.menu || !this.header) return;

      const width = window.innerWidth;

      if (width < 776) {
        this.menu.setAttribute('aria-hidden', 'false');
        this.header.setAttribute('aria-hidden', 'true');
        return;
      }

      this.header.removeAttribute('aria-hidden');
      this.header.classList.remove('menu-view');
      this.menu.classList.remove('collapse');
    });
  }
}
