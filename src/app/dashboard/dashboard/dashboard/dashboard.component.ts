import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { SuperheroService } from 'src/app/core/api/superhero.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  providers: [SuperheroService],
  template: `<p>dashboard works!</p>`,
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private spinnerService = inject(SpinnerService);
  private toastService = inject(ToastService);
  private dialogService = inject(DialogService);
  private SuperheroService = inject(SuperheroService);

  ngOnInit(): void {
    this.SuperheroService.getAllSuperHeroes().subscribe((res) =>
      console.log(res)
    );

    this.SuperheroService.getAllSuperHeroeById(1).subscribe((res) =>
      console.log(res)
    );
  }
}
