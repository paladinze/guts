import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Demo1Component } from './demo1/demo1.component';
import { Demo2Component } from './demo2/demo2.component';
import { DemoListComponent } from './demo-list/demo-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'demos',
    component: DemoListComponent
  },
  {
    path: 'demos/1',
    component: Demo1Component
  },
  {
    path: 'demos/2',
    component: Demo2Component
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demos'
  },
  {
    path: '**',
    redirectTo: 'demos'
  }
];

@NgModule({
  declarations: [
    Demo1Component,
    Demo2Component,
    DemoListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DemoModule { }
