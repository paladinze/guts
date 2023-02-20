// import {
//   AfterContentInit,
//   AfterViewInit,
//   Component,
//   OnInit,
//   TemplateRef,
//   ViewChild,
//   ViewContainerRef
// } from '@angular/core';
//
// @Component({
//   selector: 'tmpl-comp',
//   template: `
//     <div>
//       <div #bindPoint></div>
//       <template #tmpl>
//         some message in template
//       </template>
//     </div>
//   `
// })
// export class TemplateComp implements OnInit, AfterViewInit, AfterContentInit {
//
//   @ViewChild('bindPoint', {read: ViewContainerRef, static: true}) bindPoint: ViewContainerRef;
//   @ViewChild('tmpl', {read: TemplateRef, static: true}) tmpl: TemplateRef<any>;
//
//   ngAfterViewInit(): void {
//     // this.bindPoint.createEmbeddedView(this.tmpl);
//   }
//
//   ngAfterContentInit() {
//     // this.bindPoint.createEmbeddedView(this.tmpl);
//   }
//
//   ngOnInit(): void {
//     this.bindPoint.createEmbeddedView(this.tmpl);
//   }
//
//
// }

import { Component, ViewChild, OnInit, ViewContainerRef, TemplateRef, EmbeddedViewRef } from "@angular/core";

@Component({
  selector: 'tmpl-comp',
  template: `
    <ng-template #tmpl let-name let-index='index'>
      <li>name: {{name}} | index: {{index}}</li>
    </ng-template>

    <h4>imperative: viewContainerRef + ngTemplate</h4>
    <ul #bindPoint>
    </ul>

    <h4>declarative: ngTemplateOutlet + ngTemplate</h4>
    <ng-container
      [ngTemplateOutlet]='tmpl'
      [ngTemplateOutletContext]='ctx'
    ></ng-container>
  `
})
export class TemplateComp implements OnInit {
  ctx = {
    $implicit: 'item 1',
    index: 0
  }

  @ViewChild('bindPoint', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;
  @ViewChild('tmpl', {read: TemplateRef, static: true}) tmpl: TemplateRef<any>;

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.tmpl, {
      $implicit: 'item1',
      index: 0,
    });
  }
}
