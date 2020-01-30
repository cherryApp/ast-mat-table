import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { BasicComponent } from './page/basic/basic.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'basic',
    component: BasicComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
