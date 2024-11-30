import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToValidation() {
    this.router.navigate(['/validation']);
  }
}
