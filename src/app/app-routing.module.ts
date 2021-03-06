import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';
import { OwnerListComponent } from './owner-list/owner-list.component'

const routes: Routes = [
  { path: '', redirectTo: '/car-list', pathMatch: 'full' },
  {
    path: 'car-add',
    component: CarEditComponent
  },
  {
    path: 'car-list',
    component: CarListComponent
  },
  {
    path: 'car-edit/:id',
    component: CarEditComponent
  },
  {
    path: 'owner-add',
    component: OwnerEditComponent
  },
  {
    path: 'owner-list',
    component: OwnerListComponent
  },
  {
    path: 'owner-edit/:dni',
    component: OwnerEditComponent
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
