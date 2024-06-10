import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-specialist-info',
  templateUrl: './specialist-info.component.html',
  styleUrls: ['./specialist-info.component.scss']
})
export class SpecialistInfoComponent {
  @Input() specialist: any = [];
}
