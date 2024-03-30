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
import { ActivatedRoute } from '@angular/router';
import { SuperHeroModel } from 'src/app/core/api/superhero.model';
import { SuperheroService } from 'src/app/core/api/superhero.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import {
  InputComponent,
  InputNumberComponent,
} from 'src/app/shared/components/input/imput.component';
import { MODE_MANAGEMENT_TYPES } from 'src/app/shared/constants/modeManagmentTypes';
import { NavigationTabViewService } from 'src/app/shared/services/navigationTabView.services';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';

const PARAM_NAME = 'mode';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    InputNumberComponent,
    ButtonComponent,
  ],
  providers: [SuperheroService],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementComponent implements OnInit {
  public modeFlags: { [key: string]: boolean } = {
    [MODE_MANAGEMENT_TYPES.new]: false,
    [MODE_MANAGEMENT_TYPES.edit]: false,
    [MODE_MANAGEMENT_TYPES.view]: false,
  };
  public form!: FormGroup;
  private mode: string | null = null;

  private navigationTabViewService = inject(NavigationTabViewService);
  private activatedRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private superheroService = inject(SuperheroService);
  private toastService = inject(ToastService);
  private spinnerService = inject(SpinnerService);

  constructor() {
    this.navigationTabViewService.activeIndex(1);
    this.getModeManagment();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      fullName: [null, [Validators.required]],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      power: [null, Validators.required],
      strength: [null, Validators.required],
      speed: [null, Validators.required],
      images: [null],
    });
  }

  submit() {
    if (this.form.valid) {
      this.spinnerService.showSpinner(true);
      const heroReq: SuperHeroModel = { ...this.form.value };
      this.superheroService.createSuperHeroe(heroReq).subscribe({
        next: (res) => {
          if (res) {
            this.toastService.showToast({
              severity: 'success',
              summary: 'Create',
              detail: 'superhero created with success!',
            });
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
          this.toastService.showToast({
            severity: 'error',
            summary: 'Error',
            detail: 'error when creating the seuperhero!',
          });
          this.spinnerService.showSpinner(false);
        },
      });
    } else {
    }
  }

  private getModeManagment() {
    this.mode = this.activatedRoute.snapshot.paramMap.get(PARAM_NAME);
    if (!this.mode || !(this.mode in MODE_MANAGEMENT_TYPES)) {
      this.mode = MODE_MANAGEMENT_TYPES.new;
    }
    this.modeFlags[this.mode] = true;
  }
}
