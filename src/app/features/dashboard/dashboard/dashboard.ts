import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth'; // adjust path if needed
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule
],
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {

  totalBalance = 4500;
  recentTransactions = [
    { date: new Date(), description: 'Payment to Vendor A', amount: -200 },
    { date: new Date(), description: 'Salary Credit', amount: 3000 },
    { date: new Date(), description: 'Utility Bill', amount: -150 }
  ];

  displayedColumns: string[] = ['date', 'description', 'amount'];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  onLogout() {
    console.log('🔴 Logout clicked');
    this.authService.logout(true); // true => redirect after logout
  }
}
