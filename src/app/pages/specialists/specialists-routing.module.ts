import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialistDetailComponent } from './specialist-detail/specialist-detail.component';
import { SpecialistListComponent } from './specialist-list/specialist-list.component';
import { SpecialistsComponent } from './specialists.component';

const routes: Routes = [
  {
    path: '',
    component: SpecialistsComponent,
    children: [
      {
        path: '',
        component: SpecialistListComponent,
      },
      {
        path: ':id',
        component: SpecialistDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialistsRoutingModule {}
