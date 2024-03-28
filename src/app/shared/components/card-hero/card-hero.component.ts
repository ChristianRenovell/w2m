import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SuperHeroModel } from 'src/app/core/api/superhero.model';
import { Router } from '@angular/router';
import { FullNamePipe } from '../../pipes/fullName.pipe';

@Component({
  selector: 'app-card-hero',
  standalone: true,
  imports: [CardModule, ButtonModule, FullNamePipe],
  templateUrl: './card-hero.component.html',
  styleUrls: ['./card-hero.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeroComponent {
  @Input() hero!: SuperHeroModel;

  private router = inject(Router);

  goTuHeroManagement(id: number) {
    debugger;
    this.router.navigate(['dashboard/management/view/' + id]);
  }
}
