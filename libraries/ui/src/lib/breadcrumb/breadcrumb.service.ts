import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  RoutesRecognized,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreadcrumbItem } from './breadcrumb/breadcrumb.component';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private _items = new BehaviorSubject<BreadcrumbItem[]>([]);
  private _title = new BehaviorSubject<string>('');

  private _sourceArr: BreadcrumbItem[] = [];
  private _clearData = false;

  constructor(private _router: Router) {
    let title: string;

    this._router.events
      .pipe(filter((event) => event instanceof RoutesRecognized))
      .subscribe((e) => {
        console.log(e);
        if (e instanceof RoutesRecognized) {
          let route = e.state.root;

          while (route.data !== null) {
            if (
              route.data.id !== null &&
              !this._sourceArr.find(
                (a) => a.Name === route.data.breadCrumbTitle
              )
            ) {
              this._sourceArr.push(
                new BreadcrumbItem({
                  Id: route.data.url,
                  Name: route.data.breadCrumbTitle,
                })
              );
              console.log(route, route.data);
              title = route.data.title;
            }
            if (route.firstChild) {
              route = route.firstChild;
            } else {
              break;
            }
            if (route && route.data && route.data.clearBreadCrumbs) {
              this.clearData();
            }
          }
        }
      });

    this._router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        )
      )
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          if (!this._clearData) {
            this._items.next(this._sourceArr);
            this.setTitle(title);
          }
        }
        this._sourceArr = [];
        this._clearData = false;
        title = '';
      });
  }

  getItems() {
    return this._items.asObservable();
  }

  getTitle() {
    return this._title.asObservable();
  }

  setItem(item: BreadcrumbItem) {
    const currentItems = this._items.value;
    currentItems.push(item);
    this._items.next(currentItems);
  }

  setItems(items: BreadcrumbItem[]) {
    const currentItems = [...this._items.value, ...items];
    this._items.next(currentItems);
  }

  setTitle(title: string) {
    this._title.next(title);
  }

  clearItems() {
    this._items.next([]);
  }

  clearData() {
    // this._clearData = true;
    this._items.next([]);
    this._title.next('');
  }
}
