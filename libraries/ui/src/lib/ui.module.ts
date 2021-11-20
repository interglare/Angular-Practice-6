import { NgModule } from '@angular/core';
import { ButtonModule } from './button';
import { CardModule } from './card';

@NgModule({
  declarations: [],
  imports: [ButtonModule, CardModule],
  exports: [ButtonModule, CardModule],
})
export class UiModule {}
