import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CelebritiesListComponent } from './celebrities-list/celebrities-list.component';
import { CelebrityIdComponent } from './celebrity-id/celebrity-id.component';
import { NewCelebrityComponent } from '../create/new-celebrity/new-celebrity.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  {
    path: 'celebrities',
    component: CelebritiesListComponent
  },
  {
    path: 'celebrity/:id',
    component: CelebrityIdComponent
  },
  {
    path: 'execTasks',
    component: TaskListComponent
  },
  {
    path: '',
    redirectTo: '/site/notFound',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/site/notFound'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeadOfTalentRoutingModule { }
