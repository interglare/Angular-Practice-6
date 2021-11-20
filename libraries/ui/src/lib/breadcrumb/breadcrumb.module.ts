import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {
  static forRoot(): ModuleWithProviders<BreadcrumbModuleForRoot> {
    return {
      ngModule: BreadcrumbModuleForRoot,
    };
  }
}

@NgModule({
  declarations: [],
  imports: [BreadcrumbModule],
  exports: [BreadcrumbModule],
})
export class BreadcrumbModuleForRoot {
  constructor(service: BreadcrumbService) {}
}
