import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { UppercasePipe } from '../../pipes/uppercase.pipe';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  providers: [UppercasePipe],
  template: ` <span class="p-float-label">
    <input
      type="{{ type }}"
      [formControl]="control"
      [value]="upperCase ? (value | uppercase) : value"
      pInputText
    />
    <label for="float-label">{{ label }}</label>
  </span>`,
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() type?: string = 'text';
  @Input() control!: any;
  @Input() value!: any;
  @Input() label!: string;
  @Input() upperCase: boolean = false;
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();

  //INFO:
  //Case in which, in addition to displaying the property in uppercase letters, that value is also retrieved in uppercase letters for processing.

  // Add (input)="onInputChange($event)" to <input />

  // Uncomment the following function.
  // onInputChange(event: Event) {
  //   if (this.upperCase) {
  //     const inputElement = event.target as HTMLInputElement;
  //     const value = inputElement.value.toUpperCase();
  //     this.control.setValue(value, { emitEvent: false });
  //     this.inputChange.emit(event);
  //   }
  // }
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
