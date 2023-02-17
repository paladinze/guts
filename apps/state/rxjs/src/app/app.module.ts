import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DemoModule } from './demo/demo.module';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './ngrx-store/counter.reducer';
import { MyCounterComponent } from './ngrx-store/my-counter.component';
import { AuthFormComponent } from './demo/content-projection/auth-form.component';
import { AuthFormModule } from './demo/content-projection/auth-form.module';

const routes: Routes = [
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then(item => item.DemoModule)
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
    MyCounterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ count: counterReducer }),
    AuthFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
