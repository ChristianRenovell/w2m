import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from '../../services/spinner.service';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

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
