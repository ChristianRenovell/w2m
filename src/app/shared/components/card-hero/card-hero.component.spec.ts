import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardHeroComponent } from './card-hero.component';
import { SuperHeroModel } from 'src/app/core/api/superhero.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FullNamePipe } from '../../pipes/fullName.pipe';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

describe('CardHeroComponent', () => {
  let component: CardHeroComponent;
  let fixture: ComponentFixture<CardHeroComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CardModule, ButtonModule],
      providers: [FullNamePipe],
    }).compileComponents();
  });

  it('should create the component', () => {
    fixture = TestBed.createComponent(CardHeroComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render hero details correctly', () => {
    const mockHero: SuperHeroModel = {
      id: 1,
      name: 'A-Bomb',
      fullName: 'Richard Milhouse Jones',
      height: '203 cm',
      weight: '441 kg',
      power: 24,
      strength: 100,
      speed: 17,
      images:
        'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg',
    };
    fixture = TestBed.createComponent(CardHeroComponent);
    component = fixture.componentInstance;
    component.hero = mockHero;
    fixture.detectChanges();

    const cardElement: HTMLElement = fixture.nativeElement;
    expect(cardElement.textContent).toContain('A-Bomb');
  });

  it('should navigate to hero management on button click', () => {
    const mockHero: SuperHeroModel = {
      id: 1,
      name: 'A-Bomb',
      fullName: 'Richard Milhouse Jones',
      height: '203 cm',
      weight: '441 kg',
      power: 24,
      strength: 100,
      speed: 17,
      images:
        'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg',
    };
    fixture = TestBed.createComponent(CardHeroComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.hero = mockHero;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('p-card');
    button.click();

    expect(router.navigate).toHaveBeenCalledWith([
      'dashboard/management/edit/' + mockHero.id,
    ]);
  });
});
