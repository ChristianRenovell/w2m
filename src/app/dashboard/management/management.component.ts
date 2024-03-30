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
import {
  InputComponent,
  InputNumberComponent,
} from 'src/app/shared/components/input/imput.component';
import { MODE_MANAGEMENT_TYPES } from 'src/app/shared/constants/modeManagmentTypes';
import { NavigationTabViewService } from 'src/app/shared/services/navigationTabView.services';

const PARAM_NAME = 'mode';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, InputNumberComponent],
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

  constructor() {
    this.navigationTabViewService.activeIndex(1);
    this.getModeManagment();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      fullName: ['', [Validators.required]],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      power: [null, Validators.required],
      strength: [null, Validators.required],
      speed: [null, Validators.required],
      images: ['', Validators.required],
    });
  }

  submit() {
    console.log(this.form.value);
  }

  private getModeManagment() {
    this.mode = this.activatedRoute.snapshot.paramMap.get(PARAM_NAME);
    if (!this.mode || !(this.mode in MODE_MANAGEMENT_TYPES)) {
      this.mode = MODE_MANAGEMENT_TYPES.new;
    }
    this.modeFlags[this.mode] = true;
  }
}
