import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DemoModule } from './demo/demo.module';

const routes: Routes = [
  {
    path: 'demo',
    loadChildren: () =>  import('./demo/demo.module').then(item => item.DemoModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demo'
  },
  {
    path: '**',
    redirectTo: 'demo'
  }

];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes),],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
