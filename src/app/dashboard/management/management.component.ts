import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHeroModel } from 'src/app/core/api/superhero.model';
import { SuperheroService } from 'src/app/core/api/superhero.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FileUploadComponent } from 'src/app/shared/components/fileUpload/fileUpload.component';
import {
  InputComponent,
  InputNumberComponent,
} from 'src/app/shared/components/input/imput.component';
import { DELETE_DIALOG } from 'src/app/shared/constants/dialogMessages';
import { MODE_MANAGEMENT_TYPES } from 'src/app/shared/constants/modeManagmentTypes';
import {
  CREATE_ERROR,
  CREATE_SUCCESS,
  DELETE_ERROR,
  DELETE_SUCCESS,
  EDIT_ERROR,
  EDIT_SUCCESS,
  INVALID_FORM,
  RECOVER_ERROR,
} from 'src/app/shared/constants/toastMessages';
import { UppercasePipe } from 'src/app/shared/pipes/uppercase.pipe';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { NavigationTabViewService } from 'src/app/shared/components/tab-view/tab-view.services';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

const PARAM_MODE = 'mode';
const PARAM_ID = 'id';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    InputNumberComponent,
    ButtonComponent,
    CommonModule,
    FileUploadComponent,
  ],
  providers: [SuperheroService, UppercasePipe],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementComponent implements OnInit {
  public form!: FormGroup;
  public heroId: any;
  public isEditMode: boolean = false;
  public isNewMode: boolean = false;
  public imageView?: string | null;
  private mode: string | null = null;
  private navigationTabViewService = inject(NavigationTabViewService);
  private activatedRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private superheroService = inject(SuperheroService);
  private toastService = inject(ToastService);
  private spinnerService = inject(SpinnerService);
  private dialogService = inject(DialogService);
  private router = inject(Router);
  private resetFileUploaded!: () => void;

  constructor() {
    this.navigationTabViewService.activeIndex(1);
    this.getModeManagment();
  }

  ngOnInit(): void {
    this.createForm();
    this.recoverHero();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      fullName: [null, [Validators.required]],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      power: [null, Validators.required],
      strength: [null, Validators.required],
      speed: [null, Validators.required],
      images: [null, Validators.required],
    });
  }

  submit(): void {
    if (this.form.valid) {
      const heroReq: SuperHeroModel = { ...this.form.value };
      heroReq.images = this.imageView as string;
      if (this.isNewMode) {
        this.createSeperHero(heroReq);
      } else if (this.isEditMode) {
        heroReq.id = parseInt(this.heroId);
        this.editSuperHero(heroReq);
      }
    } else this.toastService.showToast(INVALID_FORM);
  }

  uploadFileEmitter(event: any[]): void {
    if (event.length > 0) {
      this.imageView = event[0].objectURL.changingThisBreaksApplicationSecurity;
      this.form.get('images')?.setValue(event);
    }
  }

  fileUploadSubjectEmitter(event: () => void): void {
    this.resetFileUploaded = event;
  }

  removeFileEmitter(event: boolean): void {
    if (event) {
      this.imageView = null;
      this.form.get('images')?.setValue(null);
      this.form.get('images')?.updateValueAndValidity();
    }
  }

  editSuperHero(heroReq: SuperHeroModel): void {
    this.spinnerService.showSpinner(true);
    this.superheroService.editSeperHero(heroReq).subscribe({
      next: (res) => {
        if (res) {
          if (this) this.toastService.showToast(EDIT_SUCCESS);
          this.router.navigate(['dashboard']);
        } else {
          this.toastService.showToast(EDIT_ERROR);
        }
        this.spinnerService.showSpinner(false);
      },
      error: () => {
        this.toastService.showToast(EDIT_ERROR);
        this.spinnerService.showSpinner(false);
      },
    });
  }

  openModalDialog(): void {
    this.dialogService.showDialog(DELETE_DIALOG).subscribe((res: boolean) => {
      if (res) {
        this.superheroService.deleteSuperHero(this.heroId).subscribe({
          next: (res) => {
            if (res) {
              this.toastService.showToast(DELETE_SUCCESS);
              this.router.navigate(['dashboard']);
            } else {
              this.toastService.showToast(DELETE_ERROR);
            }
            this.spinnerService.showSpinner(false);
          },
          error: () => {
            this.toastService.showToast(DELETE_ERROR);
            this.spinnerService.showSpinner(false);
          },
        });
      }
    });
  }

  private recoverHero(): void {
    if (
      this.isEditMode &&
      this.activatedRoute.snapshot.paramMap.get(PARAM_ID)
    ) {
      this.spinnerService.showSpinner(true);
      this.heroId = this.activatedRoute.snapshot.paramMap.get(PARAM_ID);
      if (this.heroId) {
        this.superheroService
          .getSuperHeroeById(parseFloat(this.heroId))
          .subscribe({
            next: (res) => {
              if (res) {
                this.form.patchValue(res);
                this.imageView = this.form.get('images')?.value;
              } else {
                this.toastService.showToast(RECOVER_ERROR);
              }
              this.spinnerService.showSpinner(false);
            },
            error: () => {
              this.toastService.showToast(RECOVER_ERROR);
              this.spinnerService.showSpinner(false);
            },
          });
      }
    }
  }

  private createSeperHero(heroReq: SuperHeroModel): void {
    this.spinnerService.showSpinner(true);
    this.superheroService.createSuperHeroe(heroReq).subscribe({
      next: (res) => {
        if (res) {
          this.resetFileUploaded();
          this.toastService.showToast(CREATE_SUCCESS);
          this.router.navigate(['dashboard']);
        } else {
          this.toastService.showToast({
            severity: 'error',
            summary: 'Error',
            detail: 'error when creating the seuperhero!',
          });
        }
        this.spinnerService.showSpinner(false);
      },
      error: () => {
        this.toastService.showToast(CREATE_ERROR);
        this.spinnerService.showSpinner(false);
      },
    });
  }

  private getModeManagment(): void {
    this.mode = this.activatedRoute.snapshot.paramMap.get(PARAM_MODE);
    this.isEditMode = this.mode === MODE_MANAGEMENT_TYPES.edit;
    this.isNewMode =
      this.mode === MODE_MANAGEMENT_TYPES.new || !this.isEditMode;
  }
}
