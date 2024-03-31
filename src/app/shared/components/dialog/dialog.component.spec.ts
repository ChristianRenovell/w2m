import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
import { ConfirmationService } from 'primeng/api';
import { DialogModel } from 'src/app/core/models/dialogModel';

import { take } from 'rxjs/operators';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogService: DialogService;
  let confirmationService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [DialogService, ConfirmationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(DialogService);
    confirmationService = TestBed.inject(ConfirmationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit dialog model on showDialog and return observable from dialogConfirmationSubject', () => {
    const dialogModel: DialogModel = {
      message: 'Test message',
      header: 'Test header',
    };
    const result = true;

    const obs = dialogService.showDialog(dialogModel);
    obs.subscribe((res) => {
      expect(res).toBe(result);
    });

    dialogService.confirmDialog(result);
    expect(dialogService.dialogObservable()).toBeTruthy();
  });

  it('should emit dialog model on dialogObservable', () => {
    const dialogModel: DialogModel = {
      message: 'Test message',
      header: 'Test header',
    };

    dialogService.dialogObservable().subscribe((res) => {
      expect(res).toEqual(dialogModel);
    });

    dialogService.showDialog(dialogModel);
  });
});

//Service
describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService],
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit dialog and return confirmation', () => {
    const dialogModel: DialogModel = {
      header: 'Test Title',
      message: 'Test Message',
    };
    const expectedResult = true;

    // Subscribe to dialogObservable to capture emitted dialog
    service
      .dialogObservable()
      .pipe(take(1))
      .subscribe((dialog: DialogModel) => {
        expect(dialog).toEqual(dialogModel);
      });

    // Call showDialog and capture the observable
    const confirmationObservable = service.showDialog(dialogModel);

    // Subscribe to the confirmation observable and check the emitted value
    confirmationObservable.pipe(take(1)).subscribe((confirmation: boolean) => {
      expect(confirmation).toEqual(expectedResult);
    });

    // Call confirmDialog to emit confirmation
    service.confirmDialog(expectedResult);
  });
});
