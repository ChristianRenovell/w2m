import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from './dialog.service';
import { DialogModel } from 'src/app/core/models/dialogModel';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  private confirmationService = inject(ConfirmationService);
  private dialogService = inject(DialogService);

  ngOnInit(): void {
    this.dialogService.dialogObservable().subscribe((res: DialogModel) => {
      this.confirmationService.confirm({
        message: res.message,
        header: res.header,
        accept: () => {
          this.dialogService.confirmDialog(true);
        },
        reject: () => {
          this.dialogService.confirmDialog(false);
        },
      });
    });
  }
}
