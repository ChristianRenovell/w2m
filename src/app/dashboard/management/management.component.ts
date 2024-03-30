import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MODE_MANAGEMENT_TYPES } from 'src/app/shared/constants/modeManagmentTypes';
import { NavigationTabViewService } from 'src/app/shared/services/navigationTabView.services';

const PARAM_NAME = 'mode';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementComponent implements OnInit {
  mode: string | null = null;
  modeFlags: { [key: string]: boolean } = {
    [MODE_MANAGEMENT_TYPES.new]: false,
    [MODE_MANAGEMENT_TYPES.edit]: false,
    [MODE_MANAGEMENT_TYPES.view]: false,
  };

  private navigationTabViewService = inject(NavigationTabViewService);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.navigationTabViewService.activeIndex(1);
    this.getModeManagment();
  }

  ngOnInit(): void {}

  getModeManagment() {
    this.mode = this.activatedRoute.snapshot.paramMap.get(PARAM_NAME);
    if (!this.mode || !(this.mode in MODE_MANAGEMENT_TYPES)) {
      this.mode = MODE_MANAGEMENT_TYPES.new;
    }
    this.modeFlags[this.mode] = true;
  }
}
