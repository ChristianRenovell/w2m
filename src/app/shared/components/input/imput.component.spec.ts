import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { UppercasePipe } from '../../pipes/uppercase.pipe';
import { InputComponent, InputNumberComponent } from './imput.component';
import { InputNumberModule } from 'primeng/inputnumber';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [UppercasePipe],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default type to text', () => {
    expect(component.type).toBe('text');
  });

  it('should display label', () => {
    const labelElement: HTMLElement =
      fixture.nativeElement.querySelector('label');
    expect(labelElement.textContent).toContain('Test Label');
  });
});

describe('InputNumberComponent', () => {
  let component: InputNumberComponent;
  let fixture: ComponentFixture<InputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputNumberModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumberComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default inputId to "withoutgrouping"', () => {
    expect(component.inputId).toBe('withoutgrouping');
  });

  it('should use grouping by default', () => {
    expect(component.useGrouping).toBe(false);
  });

  it('should display label', () => {
    const labelElement: HTMLElement =
      fixture.nativeElement.querySelector('label');
    expect(labelElement.textContent).toContain('Test Label');
  });
});
