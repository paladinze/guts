import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[tooltip]',
  exportAs: 'tooltip'
})
export class TooltipDirective implements OnInit {

  visible = false;
  tooltipEl = document.createElement('div');

  @Input()
  set tooltip(value: string) {
    this.tooltipEl.textContent = value;
  }

  constructor(
    private host: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.tooltipEl.classList.add('tooltip');

    this.host.nativeElement.classList.add('tooltip-container');
    this.host.nativeElement.appendChild(this.tooltipEl);

  }

  show() {
    this.tooltipEl.classList.add('tooltip--active');
  }

  hide() {
    this.tooltipEl.classList.remove('tooltip--active')

  }

}
