import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  template: `<input type="{{ type }}" [formControl]="control" pInputText />`,
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() type?: string = 'text';
  @Input() control!: any;
}

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  template: `<p-inputNumber
    inputId="{{ inputId }}"
    [useGrouping]="useGrouping"
    [formControl]="control"
  >
  </p-inputNumber>`,
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent {
  @Input() inputId?: string = 'withoutgrouping';
  @Input() control!: any;
  @Input() useGrouping: any = false;
}
