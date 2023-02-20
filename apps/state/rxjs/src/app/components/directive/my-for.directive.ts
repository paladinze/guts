import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[myFor][myForOf]'
})
export class MyForDirective {
  private collection: any[];

  @Input()
  set myForOf(collection: any[]) {
    this.collection = collection;
    this.view.clear();
    collection.forEach((item, index) => {
      this.view.createEmbeddedView(this.template, {
        $implicit: item,
        index
      });
    });
  }


  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
  }
}
