import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from '../../services/toast.service';
import { MessageService } from 'primeng/api';

import { ToastModule } from 'primeng/toast';
import { ToastModel } from 'src/app/core/models/toastModel';
import { of } from 'rxjs/internal/observable/of';

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
