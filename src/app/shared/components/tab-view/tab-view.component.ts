import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { ModeloTab } from '../../../core/models/TabsModel';
import { NavigationTabViewService } from './tab-view.services';

@Component({
  selector: 'app-tab-view',
  standalone: true,
  imports: [TabViewModule, CommonModule],
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabViewComponent implements OnInit {
  @Input() modeloTab!: ModeloTab[];
  private ChangeDetectorRef = inject(ChangeDetectorRef);
  activeIndex: number = 0;

  private router = inject(Router);
  private navigationTabViewService = inject(NavigationTabViewService);

  ngOnInit(): void {
    this.navigationTabViewService
      .navigationTabViewObservable()
      .subscribe((activeIndex: number) => {
        this.ChangeDetectorRef.markForCheck();
        this.activeIndex = activeIndex;
      });
  }

  public onTabChange(event: any) {
    this.ChangeDetectorRef.markForCheck();
    this.activeIndex = event.index;
    this.router.navigate([this.modeloTab[event.index].redirect]);
  }
}
