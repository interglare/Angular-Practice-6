import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescComponent } from './desc/desc.component';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'page',
        pathMatch: 'full',
      },
      {
        path: 'page',
        component: ListComponent,
        data: {
          title: 'Страница',
          breadCrumbTitle: 'Страница',
          id: 1,
          url: '/list/page',
        },
      },
      {
        path: 'post',
        component: PostComponent,
        data: {
          title: 'Пост',
          breadCrumbTitle: 'Пост',
          id: 1,
          url: '/list/post',
        },
        children: [
          {
            path: 'desc',
            component: DescComponent,
            data: {
              title: 'Описание',
              breadCrumbTitle: 'Описание',
              id: 1,
              url: '/list/post/desc',
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
