import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { ModeloTab } from '../../../core/models/TabsModel';

@Component({
  selector: 'app-tab-view',
  standalone: true,
  imports: [TabViewModule, CommonModule],
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabViewComponent {
  @Input() modeloTab!: ModeloTab[];

  private router = inject(Router);

  public onTabChange(event: any) {
    this.router.navigate([this.modeloTab[event.index].redirect]);
  }
}
