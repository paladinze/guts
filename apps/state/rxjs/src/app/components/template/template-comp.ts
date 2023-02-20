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
    <h4>viewContainerRef + ngTemplate</h4>
    <div #bindPoint>
    <ng-template #tmpl>
      <ul>
        <li>List Item 1</li>
        <li>List Item 2</li>
      </ul>
    </ng-template>
    </div>

    <h4>ngTemplateOutlet + ngTemplate</h4>
    <ng-container [ngTemplateOutlet]='tmpl'></ng-container>
  `
})
export class TemplateComp implements OnInit {
  @ViewChild('bindPoint', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;
  @ViewChild('tmpl', {read: TemplateRef, static: true}) tmpl: TemplateRef<any>;

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.tmpl);
  }
}
