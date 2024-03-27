import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabViewComponent } from '../shared/components/tab-view/tab-view.component';
import { MAIN_TABS } from '../shared/constants/modelTabs';
import { ModeloTab } from '../core/models/modelTab';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, TabViewComponent],
  templateUrl: './DashboardLayout.component.html',
  styleUrls: ['./DashboardLayout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  modelTab: ModeloTab[] = MAIN_TABS;
}
