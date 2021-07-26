import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent implements OnInit {

  @Input() showConetnt = false;
  @Input() title = '';
  @Input() withEdit = false;
  @Input() withView = false;
  @Output() collapsed: EventEmitter<boolean> = new EventEmitter(); // if you want to do an event after collapsed
  @Output() edit: EventEmitter<any> = new EventEmitter(); // if you want to do an event after collapsed
  @Output() view: EventEmitter<any> = new EventEmitter(); // if you want to do an event after collapsed

  constructor() { }

  ngOnInit(): void {
    if (this.showConetnt) {
      this.showCollapsed();
    }
  }

  collapse() {
    this.showConetnt = !this.showConetnt;
    this.showCollapsed();
    this.collapsed.emit(this.showConetnt);
  }

  showCollapsed() {
    setTimeout(() => {
      const accordions = document.querySelectorAll(".collapse-wrapper");

      const openAccordion = (accordion: HTMLElement) => {
        accordion.style.height = accordion.scrollHeight + "px";

        setTimeout(() => {
          accordion.style.opacity = '1';
        }, 250);
      };

      const closeAccordion = (accordion: HTMLElement) => {
        accordion.style.transition = 'all 0.5s ease';
        accordion.style.opacity = '0';

        setTimeout(() => {
          accordion.style.height = '0';
        }, 125);
      };

      accordions.forEach((accordion) => {
        const showContent = accordion.querySelector(".showContent") as HTMLElement;
        const content = accordion.querySelector(".contentCollapsed") as HTMLElement;

        if (showContent) {
          openAccordion(showContent);
        } else {
          closeAccordion(content);
        }
      });
    });

  }
}
