import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerService } from '../../services/spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ProgressSpinnerModule, CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnInit {
  public showSpinner: boolean = false;
  private spinnerService = inject(SpinnerService);
  private ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.spinnerService.spinnerObservable().subscribe((res) => {
      this.showSpinner = res;
      this.ChangeDetectorRef.detectChanges();
    });
  }
}
