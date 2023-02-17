import {
  AfterContentInit,
  AfterViewInit, ChangeDetectorRef,
  Component, ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DumbComponent } from './dumb-component';


@Component({
  selector: 'dynamic-comp',
  template: `
    <div>
      <div #dynamicContainer>

      </div>
      <button (click)='destroyDynamicComp()'>Destroy dynamic comp #1</button>
      <button (click)='moveDynamicComp()'>Move the first comp</button>
    </div>
  `
})
export class DynamicComp implements AfterViewInit, AfterContentInit {

  private dumbComp1: ComponentRef<DumbComponent>;
  private dumbComp2: ComponentRef<DumbComponent>;

  @ViewChild('dynamicContainer', { read: ViewContainerRef }) dynamicContainer: ViewContainerRef;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
    this.dumbComp1 = this.dynamicContainer.createComponent(DumbComponent, { index: 0 });
    this.dumbComp1.instance.message = 'dynamic msg: #1';

    this.dumbComp2 = this.dynamicContainer.createComponent(DumbComponent);
    this.dumbComp2.instance.message = 'dynamic msg: #2';

    this.cd.detectChanges()
  }

  destroyDynamicComp() {
    this.dumbComp1.destroy();
  }

  moveDynamicComp() {
    this.dynamicContainer.move(this.dumbComp1.hostView, 1);
  }

}
