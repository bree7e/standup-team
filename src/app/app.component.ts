import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StandupComponent } from './standup.component';

@Component({
  standalone: true,
  imports: [StandupComponent, RouterModule],
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
