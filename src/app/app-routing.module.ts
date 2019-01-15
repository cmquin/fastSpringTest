import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFormComponent } from './components/user-form/user-form.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "user-form"},
  {path: "user-form", component: UserFormComponent},
  {path: "user-list", component: AdminListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
