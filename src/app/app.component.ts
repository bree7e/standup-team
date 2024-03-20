import { Component } from '@angular/core';

import { StandupComponent } from './standup.component';

@Component({
  standalone: true,
  imports: [StandupComponent],
  selector: 'standup-team-root',
  templateUrl: './app.component.html',
  styles: `
  :host {
    display: block;
    margin: 16px;
  } 
  `,
})
export class AppComponent {
  title = 'Daily Standup';
}
