import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  items,
  ListItem,
} from 'applications/healtcare/src/models/list-item.model';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs/operators';

@Component({
  selector: 'hc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {
  listItems = [...items];

  searchFormControl = new FormControl('');

  destroyed = new Subject<boolean>();

  constructor(private _changeRef: ChangeDetectorRef, private _ngZone: NgZone) {}

  ngOnInit(): void {
    this._ngZone.runOutsideAngular(() => {
      setInterval(() => {}, 1);
    });

    this.searchFormControl.valueChanges
      .pipe(
        takeUntil(this.destroyed),
        debounceTime(250),
        distinctUntilChanged(),
        map(this.mapToArr),
        map((val) => this.mapToItems(val))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  getItems(): ListItem[] {
    console.log('here');
    return this.listItems;
  }

  mapToArr(value: string): ListItem[] {
    const arr = items.filter((item) =>
      item.Name.toLowerCase().includes(value.toLowerCase())
    );
    return arr;
  }

  mapToItems(value: ListItem[]): ListItem[] {
    this.listItems = [...value];
    // this._changeRef.markForCheck();
    return this.listItems;
  }
}
