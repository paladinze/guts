import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './ngrx-store/counter.reducer';
import { MyCounterComponent } from './ngrx-store/my-counter.component';
import { CompModule } from './components/comp.module';

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
    RouterModule.forRoot(routes, { enableTracing: false, }),
    // RouterModule.forRoot(routes, { enableTracing: true, }),
    StoreModule.forRoot({ count: counterReducer }),
    CompModule.forRoot({ name: 'forRoot config: demo module'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
