import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabViewComponent } from '../shared/components/tab-view/tab-view.component';
import { MAIN_TABS } from '../shared/constants/modelTabs';
import { ModeloTab } from '../core/models/modelTab';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, TabViewComponent, SpinnerComponent],
  templateUrl: './DashboardLayout.component.html',
  styleUrls: ['./DashboardLayout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  modelTab: ModeloTab[] = MAIN_TABS;
}
