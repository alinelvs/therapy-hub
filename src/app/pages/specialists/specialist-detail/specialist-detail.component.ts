import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecialistsService } from '../../../core/services/specialists/specialists.service';
import { Specialist } from '../../../shared/models/specialist';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-specialist-detail',
  templateUrl: './specialist-detail.component.html'
})
export class SpecialistDetailComponent implements OnInit {
  public specialist: Specialist | null = null;

  private readonly destroy: DestroyRef = inject(DestroyRef);

  constructor(
    private specialistsService: SpecialistsService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.getSpecialistDetail();
  }

  private getSpecialistDetail(): void {
    const { id } = this.route.snapshot.params;

    this.specialistsService.getSpecialistDetails(id)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (specialist) => {
          this.specialist = specialist;
        },
        error: (err) => {
          console.error('Failed to load specialist details', err);
          this.specialist = null;
        },
        complete: () => {
          console.info('Specialist details loading complete');
        }
      });
  }
}
