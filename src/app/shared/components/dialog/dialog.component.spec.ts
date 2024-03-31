import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { DialogService } from '../../services/dialog.service';
import { ConfirmationService } from 'primeng/api';
import { DialogModel } from 'src/app/core/models/dialogModel';

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
