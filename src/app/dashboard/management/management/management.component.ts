import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { NavigationTabViewService } from 'src/app/shared/services/navigationTabView.services';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [CommonModule],
  template: `<p>management works!</p>`,
  styleUrls: ['./management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementComponent implements OnInit {
  private navigationTabViewService = inject(NavigationTabViewService);

  ngOnInit(): void {
    this.navigationTabViewService.activeIndex(1);
  }
}
