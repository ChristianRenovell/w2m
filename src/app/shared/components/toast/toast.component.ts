import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from './toast.service';
import { ToastModel } from 'src/app/core/models/toastModel';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ToastModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {
  private messageService = inject(MessageService);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.toastService.toastObservable().subscribe((res: ToastModel) => {
      this.messageService.clear();
      this.messageService.add(res);
    });
  }
}
