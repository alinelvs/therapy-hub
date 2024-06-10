import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input() schedule: any = [];

  public displayCount = 4;
  public displayIndex = 0;
  public selectedDay: any = null;
  public selectedHour: string | null = null;

  constructor() { }

  get canMoveLeft() {
    return this.displayIndex > 0;
  }

  get canMoveRight() {
    return this.displayIndex < this.schedule.length - this.displayCount;
  }

  get displaySchedule() {
    return this.schedule.slice(this.displayIndex, this.displayIndex + this.displayCount);
  }

  public moveLeft() {
    if (this.displayIndex > 0) {
      this.displayIndex -= 1;
    }
  }

  public moveRight() {
    if (this.displayIndex < this.schedule.length - this.displayCount) {
      this.displayIndex += 1;
    }
  }

  public scheduleAppointment() {
    if (this.selectedDay && this.selectedHour) {
      console.log(`Agendado para: ${this.selectedDay.week}, ${this.selectedDay.month} às ${this.selectedHour}`);
    }
  }

  public selectHour(day: any, hour: string) {
    if (hour !== '-') {
      this.selectedDay = day;
      this.selectedHour = hour;
    }
  }
}
