import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  template: ` <span class="p-float-label">
    <input type="{{ type }}" [formControl]="control" pInputText />
    <label for="float-label">{{ label }}</label>
  </span>`,
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() type?: string = 'text';
  @Input() control!: any;
  @Input() label!: string;
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
  template: ` <span class="p-float-label">
    <p-inputNumber
      inputId="{{ inputId }}"
      [useGrouping]="useGrouping"
      [formControl]="control"
    >
    </p-inputNumber>
    <label for="float-label">{{ label }}</label>
  </span>`,
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent {
  @Input() inputId?: string = 'withoutgrouping';
  @Input() control!: any;
  @Input() useGrouping: any = false;
  @Input() label!: string;
}
