import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../breadcrumb.service';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

export class BreadCrumbsConfig {
  withMargin!: boolean;
  withTitle!: boolean;
  navigateOnClick!: boolean;

  constructor(config: BreadCrumbsConfig) {
    Object.assign(this, config);
  }
}

export class BreadcrumbItem {
  Id?: string;
  Name?: string;
  Uniq?: number;
  activeId?: string;
  constructor(breadcrumb: BreadcrumbItem) {
    Object.assign(this, breadcrumb);
  }
}

@Component({
  selector: 'ui-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: BreadcrumbItem[] = [];
  @Input() config: BreadCrumbsConfig = new BreadCrumbsConfig({
    withMargin: true,
    navigateOnClick: true,
    withTitle: false,
  });

  srcItems: BreadcrumbItem[] = [];

  title = '';

  destroyed = new Subject<boolean>();

  constructor(
    private breadCrumbService: BreadcrumbService,
    private router: Router
  ) {}

  ngOnInit() {
    const original = [...this.items];
    this.breadCrumbService
      .getItems()
      .pipe(takeUntil(this.destroyed))
      .subscribe((data) => {
        console.log(data);
        data = data ? data : [];
        this.items = [...data, ...original];
      });

    this.breadCrumbService
      .getTitle()
      .pipe(takeUntil(this.destroyed), distinctUntilChanged())
      .subscribe((title) => {
        this.title = title;
      });
  }

  ngOnDestroy() {
    this.destroyed.next(true);
  }

  itemClick(index: number) {
    if (index !== this.items.length - 1) {
      console.log('here');
      const activeIndex = this.items[index].activeId;
      if (activeIndex) {
        this.items = this.items.slice(0, index + 1);
        this.srcItems = [...this.items];
        this.breadCrumbService.clearItems();
        this.breadCrumbService.setItems(this.srcItems);
        return;
      }
      console.log(index);
      if (this.config.navigateOnClick) {
        this.router.navigate([this.items[index].Id]);
      }
    }
  }
}
