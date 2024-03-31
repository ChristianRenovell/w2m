import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { take } from 'rxjs/internal/operators/take';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerServiceSpy: jasmine.SpyObj<SpinnerService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SpinnerService', ['spinnerObservable']);

    TestBed.configureTestingModule({
      providers: [
        { provide: SpinnerService, useValue: spy },
        { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      ],
    });

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    spinnerServiceSpy = TestBed.inject(
      SpinnerService
    ) as jasmine.SpyObj<SpinnerService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should hide spinner initially', () => {
    expect(component.showSpinner).toBeFalse();
  });

  it('should show spinner when service emits true', () => {
    spinnerServiceSpy.spinnerObservable.and.returnValue(of(true));
    fixture.detectChanges();
    expect(component.showSpinner).toBeTrue();
  });

  it('should hide spinner when service emits false', () => {
    spinnerServiceSpy.spinnerObservable.and.returnValue(of(false));
    fixture.detectChanges();
    expect(component.showSpinner).toBeFalse();
  });

  class MockChangeDetectorRef {
    detectChanges() {}
  }
});

//SERVICE
describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService],
    });
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit spinner value', () => {
    const showSpinnerValue = true;

    service
      .spinnerObservable()
      .pipe(take(1))
      .subscribe((value) => {
        expect(value).toEqual(showSpinnerValue);
      });
    // Call showSpinner method to emit spinner value
    service.showSpinner(showSpinnerValue);
  });
});
