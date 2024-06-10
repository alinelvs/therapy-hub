import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { SpecialistsService } from '../../../core/services/specialists/specialists.service';
import { Specialist } from '../../../shared/models/specialist';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html'
})
export class SpecialistListComponent implements OnInit {
  public specialists: Specialist[] = [];
  public allSpecialists: Specialist[] = [];
  public page: number = 0;
  public specialistsPerPage: number = 2;
  public noMorePosts: boolean = false;

  private readonly destroy: DestroyRef = inject(DestroyRef);

  constructor(private specialistsService: SpecialistsService) {}

  public ngOnInit(): void {
    this.getAll();
  }

  public loadMoreSpecialists(): void {
    const nextPage = this.page + this.specialistsPerPage;
    const nextSpecialists = this.allSpecialists.slice(
      nextPage,
      nextPage + this.specialistsPerPage
    );

    this.page = nextPage;
    this.noMorePosts =
      this.page + this.specialistsPerPage >= this.allSpecialists.length;

    this.specialists.push(...nextSpecialists);
  }

  private getAll(): void {
    this.specialistsService.getAllSpecialists()
    .pipe(takeUntilDestroyed(this.destroy))
    .subscribe({
      next: (specialists) => {
        this.allSpecialists = specialists;
        this.specialists = specialists.slice(this.page, this.specialistsPerPage);
      },
      error: (err) => {
        console.error('Failed to load specialists', err);
      },
      complete: () => {
        console.info('Specialists loading complete');
      },
    });
  }
}
