import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { MessageService } from 'primeng/api';

import { ToastModule } from 'primeng/toast';
import { ToastModel } from 'src/app/core/models/toastModel';
import { of } from 'rxjs/internal/observable/of';
import { take } from 'rxjs/internal/operators/take';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastModule],
      providers: [ToastService, MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to toast service and add message to message service on init', () => {
    const toast: ToastModel = {
      severity: 'success',
      summary: 'Test Summary',
      detail: 'Test Detail',
    };
    spyOn(toastService, 'toastObservable').and.returnValue(of(toast));
    component.ngOnInit();
    expect(toastService.toastObservable).toHaveBeenCalled();
  });
});

//SERVICE
describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit toast value', () => {
    const toastValue: ToastModel = {
      severity: 'success',
      summary: 'Test Summary',
      detail: 'Test Detail',
    };

    service
      .toastObservable()
      .pipe(take(1))
      .subscribe((value) => {
        expect(value).toEqual(toastValue);
      });

    service.showToast(toastValue);
  });
});
