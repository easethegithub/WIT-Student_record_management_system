import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone:false,
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }

  login() {
    this.auth.login({ email: this.email, password: this.password }).subscribe(
      (res: any) => {
        this.auth.saveToken(res.token);

        const decoded = this.auth.decodeToken(res.token);
        const role = decoded?.role;

        if (role === 'admin') {
          this.router.navigate(['/students/student-list']);
        } else if (role === 'faculty') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      err => this.showToast('Invalid credentials')
    );
  }
}
