import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PostComponent } from './post/post.component';
import { DescComponent } from './desc/desc.component';
import { ListRoutingModule } from './list-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { CardModule } from 'libraries/ui/src/lib/card';
import { TextInputModule } from 'libraries/ui/src/lib/text-input';
import { ButtonModule } from 'libraries/ui/src/lib/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ListComponent, PostComponent, DescComponent, LayoutComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    CardModule,
    TextInputModule,
    ButtonModule,
    MatIconModule
  ],
})
export class ListModule {}
