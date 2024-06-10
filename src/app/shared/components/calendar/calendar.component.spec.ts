import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.displayIndex).toBe(0);
    expect(component.displayCount).toBe(4);
  });

  it('should slice the schedule correctly for display', () => {
    component.schedule = [
      { week: 'dom', month: 'JUN 19', hours: ['14:30'] },
      { week: 'seg', month: 'JUN 20', hours: ['14:00'] },
      { week: 'ter', month: 'JUN 21', hours: ['14:00'] },
      { week: 'qua', month: 'JUN 22', hours: ['14:00'] },
      { week: 'qui', month: 'JUN 23', hours: ['14:00'] },
      { week: 'sex', month: 'JUN 24', hours: ['14:00'] }
    ];
    fixture.detectChanges();
    
    expect(component.displaySchedule.length).toBe(4);
    expect(component.displaySchedule[0].week).toBe('dom');
  });

  it('should move left and right correctly', () => {
    component.schedule = [
      { week: 'dom', month: 'JUN 19', hours: ['14:30'] },
      { week: 'seg', month: 'JUN 20', hours: ['14:00'] },
      { week: 'ter', month: 'JUN 21', hours: ['14:00'] },
      { week: 'qua', month: 'JUN 22', hours: ['14:00'] },
      { week: 'qui', month: 'JUN 23', hours: ['14:00'] },
      { week: 'sex', month: 'JUN 24', hours: ['14:00'] }
    ];
    fixture.detectChanges();

    expect(component.canMoveLeft).toBeFalsy();
    expect(component.canMoveRight).toBeTruthy();

    component.moveRight();
    fixture.detectChanges();
    expect(component.displayIndex).toBe(1);

    component.moveRight();
    fixture.detectChanges();
    expect(component.displayIndex).toBe(2);

    expect(component.canMoveRight).toBeFalsy();
    expect(component.canMoveLeft).toBeTruthy();

    component.moveLeft();
    fixture.detectChanges();
    expect(component.displayIndex).toBe(1);
  });

  it('should disable hours correctly when hour is "-"', () => {
    component.schedule = [
      { week: 'dom', month: 'JUN 19', hours: ['-', '14:30'] },
      { week: 'seg', month: 'JUN 20', hours: ['14:00'] },
      { week: 'ter', month: 'JUN 21', hours: ['14:00'] },
      { week: 'qua', month: 'JUN 22', hours: ['14:00'] }
    ];
    fixture.detectChanges();

    const hourElements = fixture.debugElement.queryAll(By.css('.calendar-container__hours'));

    expect(hourElements.length).toBeGreaterThan(0);
    expect(hourElements[0].nativeElement.classList).toContain('disabled-hour');
    expect(hourElements[1].nativeElement.classList).not.toContain('disabled-hour');
  });

  it('should have the correct initial state for navigation buttons', () => {
    component.schedule = [
      { week: 'dom', month: 'JUN 19', hours: ['14:30'] },
      { week: 'seg', month: 'JUN 20', hours: ['14:00'] },
      { week: 'ter', month: 'JUN 21', hours: ['14:00'] },
      { week: 'qua', month: 'JUN 22', hours: ['14:00'] },
      { week: 'qui', month: 'JUN 23', hours: ['14:00'] },
      { week: 'sex', month: 'JUN 24', hours: ['14:00'] }
    ];
    fixture.detectChanges();

    const leftArrow = fixture.debugElement.query(By.css('.fa-arrow-left')).nativeElement;
    const rightArrow = fixture.debugElement.query(By.css('.fa-arrow-right')).nativeElement;

    expect(leftArrow.parentElement.classList).toContain('disabled');
    expect(rightArrow.parentElement.classList).not.toContain('disabled');
  });

  it('should disable right navigation button at the end of the schedule', () => {
    component.schedule = [
      { week: 'dom', month: 'JUN 19', hours: ['14:30'] },
      { week: 'seg', month: 'JUN 20', hours: ['14:00'] },
      { week: 'ter', month: 'JUN 21', hours: ['14:00'] },
      { week: 'qua', month: 'JUN 22', hours: ['14:00'] },
      { week: 'qui', month: 'JUN 23', hours: ['14:00'] },
      { week: 'sex', month: 'JUN 24', hours: ['14:00'] }
    ];
    component.displayIndex = 2;
    fixture.detectChanges();

    const rightArrow = fixture.debugElement.query(By.css('.fa-arrow-right')).nativeElement;

    expect(rightArrow.parentElement.classList).toContain('disabled');
  });

  it('should show "Agenda" text in mobile view', () => {
    const agendaText = fixture.debugElement.query(By.css('.md\\:hidden .text-center')).nativeElement;
    expect(agendaText.textContent.trim()).toBe('Agenda');
  });
});
