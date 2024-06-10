import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SpecialistsRoutingModule } from './specialists-routing.module';
import { SpecialistsComponent } from './specialists.component';
import { SpecialistDetailComponent } from './specialist-detail/specialist-detail.component';
import { SpecialistListComponent } from './specialist-list/specialist-list.component';
import { RouterModule } from '@angular/router';
import { SpecialistInfoComponent } from './components/specialist-info/specialist-info.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@NgModule({
  declarations: [
    SpecialistsComponent,
    SpecialistListComponent,
    SpecialistDetailComponent,
    SpecialistInfoComponent,
  ],
  imports: [
    CommonModule,
    SpecialistsRoutingModule,
    MatIconModule,
    RouterModule,
    HeaderComponent,
    CalendarComponent,
    ButtonComponent
  ],
})
export class SpecialistsModule {}
