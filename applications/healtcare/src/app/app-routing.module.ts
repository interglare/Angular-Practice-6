import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then((mod) => mod.ListModule),
    data: {
        title: 'Лист',
        hasBreadcrumbs: true,
        breadCrumbTitle: 'Лист',
        id: 0,
        url: '/list',
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
