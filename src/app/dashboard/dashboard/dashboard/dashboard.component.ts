import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { SuperHeroModel } from 'src/app/core/api/superhero.model';
import { SuperheroService } from 'src/app/core/api/superhero.service';
import { CardHeroComponent } from 'src/app/shared/components/card-hero/card-hero.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardHeroComponent],
  providers: [SuperheroService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private spinnerService = inject(SpinnerService);
  private toastService = inject(ToastService);
  private dialogService = inject(DialogService);
  private SuperheroService = inject(SuperheroService);
  private ChangeDetectorRef = inject(ChangeDetectorRef);
  superHeroes!: SuperHeroModel[];

  ngOnInit(): void {
    this.spinnerService.showSpinner(true);
    this.SuperheroService.getAllSuperHeroes().subscribe((res) => {
      this.ChangeDetectorRef.markForCheck();
      console.log(res);
      this.superHeroes = res;
      this.spinnerService.showSpinner(false);
    });

    this.SuperheroService.getAllSuperHeroeById(1).subscribe((res) => {
      this.ChangeDetectorRef.markForCheck();
      console.log(res);
      this.spinnerService.showSpinner(false);
    });
  }
}
