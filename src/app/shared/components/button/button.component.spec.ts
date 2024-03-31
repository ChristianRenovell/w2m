import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for label, severity, and type', () => {
    expect(component.label).toBe('Label');
    expect(component.severity).toBe('primary');
    expect(component.type).toBe('button');
  });
});
