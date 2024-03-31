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
import { CapitalizeFirstLetterPipe } from 'src/app/shared/pipes/capitalizeFirstLetter.pipe';

import { Router } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { SEARCHE_ERROR } from 'src/app/shared/constants/toastMessages';
import { ToastService } from 'src/app/shared/services/toast.service';
import { NavigationTabViewService } from 'src/app/shared/services/navigationTabView.services';

const DEBOUNCE_TIMER = 1000;

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardHeroComponent,
    AutoCompleteModule,
    FormsModule,
    CardModule,
    ButtonComponent,
  ],
  providers: [SuperheroService, CapitalizeFirstLetterPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  public superHeroes!: SuperHeroModel[];
  public seachHero!: string;
  public suggestions?: any;
  private debounceTimer?: any = undefined;
  //This variable is used to fake the predictive search because we are not working with a real api with this functionality.
  public superHeroesMockToSearch!: SuperHeroModel[];

  //Services
  private spinnerService = inject(SpinnerService);
  private SuperheroService = inject(SuperheroService);
  private ChangeDetectorRef = inject(ChangeDetectorRef);
  private capitalizeFirstLetterPipe = inject(CapitalizeFirstLetterPipe);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private navigationTabViewService = inject(NavigationTabViewService);

  constructor() {
    this.navigationTabViewService.activeIndex(0);
  }

  ngOnInit(): void {
    this.spinnerService.showSpinner(true);
    this.SuperheroService.getAllSuperHeroes().subscribe({
      next: (res) => {
        if (res) {
          this.ChangeDetectorRef.markForCheck();
          this.superHeroes = res;
          this.superHeroesMockToSearch = res;
          this.spinnerService.showSpinner(false);
        } else {
          this.toastService.showToast(SEARCHE_ERROR);
        }
        this.spinnerService.showSpinner(false);
      },
      error: () => {
        this.toastService.showToast(SEARCHE_ERROR);
        this.spinnerService.showSpinner(false);
      },
    });
  }

  predictiveSearch(event: AutoCompleteCompleteEvent) {
    this.suggestions = this.superHeroesMockToSearch
      .filter((hero) =>
        hero.name.toLowerCase().includes(event.query.toLowerCase())
      )
      .map((hero) => ({
        ...hero,
        name: this.capitalizeFirstLetterPipe.transform(hero.name),
      }));
  }

  onPredictionSelect(selectedHero: any) {
    this.seachHero = selectedHero.value.name;
    this.searchHero();
  }

  searchHero() {
    if (this.seachHero.length >= 3) {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      // eslint-disable-next-line angular/timeout-service
      this.debounceTimer = setTimeout(() => {
        this.spinnerService.showSpinner(true);
        this.SuperheroService.getSuperHeroeBySeach(this.seachHero).subscribe({
          next: (res) => {
            if (res) {
              this.ChangeDetectorRef.markForCheck();
              this.superHeroes = res;
            } else {
              this.toastService.showToast(SEARCHE_ERROR);
            }
            this.spinnerService.showSpinner(false);
          },
          error: () => {
            this.toastService.showToast(SEARCHE_ERROR);
            this.spinnerService.showSpinner(false);
          },
        });
      }, DEBOUNCE_TIMER);
    }
  }

  redirectToNew() {
    this.router.navigate(['/dashboard/management/new']);
  }
}
