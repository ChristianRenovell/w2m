import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './DashboardLayout.component.html',
  styleUrls: ['./DashboardLayout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {}
