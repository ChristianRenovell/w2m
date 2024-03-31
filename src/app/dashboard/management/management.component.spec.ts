import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ManagementComponent } from './management.component';
import { SuperheroService } from 'src/app/core/api/superhero.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;

  beforeEach(async () => {
    const superheroService = jasmine.createSpyObj('SuperheroService', [
      'createSuperHeroe',
      'editSeperHero',
      'deleteSuperHero',
      'getSuperHeroeById',
    ]);
    const toastService = jasmine.createSpyObj('ToastService', ['showToast']);
    const spinnerService = jasmine.createSpyObj('SpinnerService', [
      'showSpinner',
    ]);
    const dialogService = jasmine.createSpyObj('DialogService', ['showDialog']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: SuperheroService, useValue: superheroService },
        { provide: ToastService, useValue: toastService },
        { provide: SpinnerService, useValue: spinnerService },
        { provide: DialogService, useValue: dialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with required fields', () => {
    component.createForm();
    const form: FormGroup = component.form;
    expect(form).toBeDefined();
    expect(form.controls['name'].errors?.['required']).toBeTruthy();
    expect(form.controls['fullName'].errors?.['required']).toBeTruthy();
    expect(form.controls['height'].errors?.['required']).toBeTruthy();
    expect(form.controls['weight'].errors?.['required']).toBeTruthy();
    expect(form.controls['power'].errors?.['required']).toBeTruthy();
    expect(form.controls['strength'].errors?.['required']).toBeTruthy();
    expect(form.controls['speed'].errors?.['required']).toBeTruthy();
    expect(form.controls['images'].errors?.['required']).toBeTruthy();
  });

  it('should call openModalDialog when openModalDialog is called', () => {
    spyOn(component, 'openModalDialog');
    component.openModalDialog();
    expect(component.openModalDialog).toHaveBeenCalled();
  });
});
