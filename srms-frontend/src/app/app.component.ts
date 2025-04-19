import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone:false,
})
export class AppComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout(); // ✅ Call logout in AuthService
  }
}
