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
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

const DEBOUNCE_TIMER = 1000;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardHeroComponent,
    AutoCompleteModule,
    FormsModule,
    CardModule,
  ],
  providers: [SuperheroService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private spinnerService = inject(SpinnerService);
  private SuperheroService = inject(SuperheroService);
  private ChangeDetectorRef = inject(ChangeDetectorRef);
  superHeroes!: SuperHeroModel[];
  seachHero!: string;
  private debounceTimer?: any = undefined;

  ngOnInit(): void {
    this.spinnerService.showSpinner(true);
    this.SuperheroService.getAllSuperHeroes().subscribe((res) => {
      this.ChangeDetectorRef.markForCheck();
      this.superHeroes = res;
      this.spinnerService.showSpinner(false);
    });
  }

  searchHero() {
    if (this.seachHero.length >= 3) {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      // eslint-disable-next-line angular/timeout-service
      this.debounceTimer = setTimeout(() => {
        this.SuperheroService.getSuperHeroeBySeach(this.seachHero).subscribe(
          (res) => {
            this.ChangeDetectorRef.markForCheck();
            this.superHeroes = res;
          }
        );
      }, DEBOUNCE_TIMER);
    }
  }
}
