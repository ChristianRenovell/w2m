import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';

import { SuperheroService } from 'src/app/core/api/superhero.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { NavigationTabViewService } from 'src/app/shared/components/tab-view/tab-view.services';
import { of } from 'rxjs/internal/observable/of';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let superheroServiceSpy: jasmine.SpyObj<SuperheroService>;
  let spinnerServiceSpy: jasmine.SpyObj<SpinnerService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  let navigationTabViewServiceSpy: jasmine.SpyObj<NavigationTabViewService>;

  beforeEach(async () => {
    superheroServiceSpy = jasmine.createSpyObj('SuperheroService', [
      'getAllSuperHeroes',
      'getSuperHeroeBySeach',
    ]);
    spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', ['showSpinner']);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToast']);
    navigationTabViewServiceSpy = jasmine.createSpyObj(
      'NavigationTabViewService',
      ['activeIndex']
    );

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        AutoCompleteModule,
        CardModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        { provide: SuperheroService, useValue: superheroServiceSpy },
        { provide: SpinnerService, useValue: spinnerServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        {
          provide: NavigationTabViewService,
          useValue: navigationTabViewServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with spinner', () => {
    superheroServiceSpy.getAllSuperHeroes.and.returnValue(of([]));
    fixture.detectChanges();
    expect(spinnerServiceSpy.showSpinner).toHaveBeenCalledWith(true);
  });

  it('should fetch superheroes on init', waitForAsync(async () => {
    superheroServiceSpy.getAllSuperHeroes.and.returnValue(of());
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.superHeroes?.length).toBeGreaterThan(0);
    expect(component.superHeroesMockToSearch?.length).toBeGreaterThan(0);

    expect(spinnerServiceSpy.showSpinner).toHaveBeenCalledWith(true);
    fixture.detectChanges();
  }));

  it('should update suggestions after debounce timer', () => {
    const autoCompleteEvent: any = {
      originalEvent: null,
      query: 'iron',
    };
    const debounceTimerDuration = 1000;
    spyOn(window, 'setTimeout');
    component.predictiveSearch(autoCompleteEvent);
    // eslint-disable-next-line angular/timeout-service
    expect(window.setTimeout).toHaveBeenCalledWith(
      jasmine.any(Function),
      debounceTimerDuration
    );
  });
});
