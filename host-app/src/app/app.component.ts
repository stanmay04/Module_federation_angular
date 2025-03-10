import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div style="padding: 1rem;">
      <h1>Host Application</h1>
      <nav>
        <a routerLink="/remote" routerLinkActive="active">Load Remote Module</a>
      </nav>
      <hr />
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    nav a { text-decoration: none; color: #007bff; margin-right: 1rem; }
    nav a.active { font-weight: bold; }
  `]
})
export class AppComponent { }
