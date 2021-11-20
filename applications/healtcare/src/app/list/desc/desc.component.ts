import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'hc-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss'],
})
export class DescComponent implements OnInit, OnDestroy {
  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.minLength(5),
  ]);
  password = new FormControl('', [Validators.required]);

  destroyed = new Subject<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.email.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe((value) => {
        console.log(this.email.valid);
      });
  }

  ngOnDestroy() {
    this.destroyed.next(true);
  }
}
