import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule],
  template: ` <span class="p-float-label">
    <p-autoComplete
      inputId="float-label"
      [suggestions]="suggestions"
      (completeMethod)="predictiveSearch($event)"
      field="name"
      [(ngModel)]="seachHero"
      (onSelect)="onPredictionSelect($event)"
    ></p-autoComplete>
    <label for="float-label">Search</label>
  </span>`,
  styleUrls: ['./autoComplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteComponent {
  @Input() suggestions?: any;
  @Output() completeMethod = new EventEmitter<any>();
  @Output() onSelect = new EventEmitter<any>();

  seachHero?: string;

  predictiveSearch(event: any) {
    this.completeMethod.emit(event);
  }

  onPredictionSelect(event: any) {
    this.onSelect.emit(event);
  }
}
