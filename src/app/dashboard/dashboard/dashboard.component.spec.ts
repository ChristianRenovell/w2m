import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { SuperHeroModel } from 'src/app/core/api/superhero.model';
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

  it('should filter and map superheroes based on search query', () => {
    const mockSuperheroes: SuperHeroModel[] = [
      {
        id: 1,
        name: 'A-Bomb',
        fullName: 'Richard Milhouse Jones',
        height: '203 cm',
        weight: '441 kg',
        power: 24,
        strength: 100,
        speed: 17,
        images: 'https://example.com/a-bomb.jpg',
      },
      {
        id: 2,
        name: 'Spider-Man',
        fullName: 'Peter Parker',
        height: '178 cm',
        weight: '74 kg',
        power: 90,
        strength: 55,
        speed: 67,
        images: 'https://example.com/spider-man.jpg',
      },
    ];
    component.superHeroesMockToSearch = mockSuperheroes;
    const event: any = {
      query: 'man',
    };
    component.predictiveSearch(event);
    expect(component.suggestions.length).toBeGreaterThan(0);
    expect(
      component.suggestions.every((hero: SuperHeroModel) =>
        hero.name.toLowerCase().includes(event.query.toLowerCase())
      )
    ).toBeTrue();
    expect(
      component.suggestions.every(
        (hero: SuperHeroModel) =>
          hero.name === mockSuperheroes.find((h) => h.name === hero.name)?.name
      )
    ).toBeTrue();
    expect(
      component.suggestions.every(
        (hero: SuperHeroModel) =>
          hero.fullName ===
          mockSuperheroes.find((h) => h.name === hero.name)?.fullName
      )
    ).toBeTrue();
  });

  it('should filter and map superheroes based on search query', () => {
    // Definir un array de superhéroes de ejemplo
    const mockSuperheroes = [
      {
        id: 1,
        name: 'A-Bomb',
        fullName: 'Richard Milhouse Jones',
        height: '203 cm',
        weight: '441 kg',
        power: 24,
        strength: 100,
        speed: 17,
        images: 'https://example.com/a-bomb.jpg',
      },
      {
        id: 2,
        name: 'Spider-Man',
        fullName: 'Peter Parker',
        height: '178 cm',
        weight: '74 kg',
        power: 90,
        strength: 55,
        speed: 67,
        images: 'https://example.com/spider-man.jpg',
      },
    ];

    const event: any = {
      query: 'man', // Consulta de ejemplo
    };

    component.superHeroesMockToSearch = mockSuperheroes;

    component.predictiveSearch(event);

    expect(component.suggestions.length).toBeGreaterThan(0);
    expect(
      component.suggestions.every((hero: { name: string }) =>
        hero.name.toLowerCase().includes(event.query.toLowerCase())
      )
    ).toBeTrue();
    expect(
      component.suggestions.every(
        (hero: { name: string | undefined }) =>
          hero.name === mockSuperheroes.find((h) => h.name === hero.name)?.name
      )
    ).toBeTrue();
  });
});
