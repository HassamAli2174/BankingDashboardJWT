import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth'; // adjust path if needed
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

interface Account {
  name: string;
  balance: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule
],
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  accounts: Account[] = [];

  ngOnInit(): void {
    this.accounts = [
      { name: 'Savings Account', balance: 15200.75, icon: 'savings', color: '#4CAF50' },
      { name: 'Checking Account', balance: 3210.5, icon: 'account_balance', color: '#2196F3' },
      { name: 'Credit Card', balance: -850.25, icon: 'credit_card', color: '#F44336' },
    ];
  }

  formatBalance(balance: number): string {
    const formatted = balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return balance < 0 ? `(${formatted})` : formatted;
  }

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

  onLogout() {
    console.log('🔴 Logout clicked');
    this.authService.logout(true); // true => redirect after logout
  }
}
