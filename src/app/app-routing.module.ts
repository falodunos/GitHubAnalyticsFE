import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepositoryDetailComponent } from './repository-detail/repository-detail.component';
const routes: Routes = [
  { path: '', component: RepositoriesComponent },
  { path: 'detail', component: RepositoryDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
