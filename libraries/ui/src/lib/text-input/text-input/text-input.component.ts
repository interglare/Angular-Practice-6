import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ui-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() type: 'text' | 'password' | 'email' = 'text';

  @Input() control: FormControl = new FormControl('', [Validators.required]);

  @Input() label: string = '';

  constructor() {}

  ngOnInit(): void {}
}
