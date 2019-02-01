import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {UserService} from '../../auth/user.service';
import {CompanyService} from '../../companies/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = environment.title;
  companyName: string;

  constructor(private userService: UserService,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    this.userService.isUserChanged().subscribe(() => {
      const company_id = JSON.parse(localStorage.getItem('currentUser')).company_id;
      this.companyService.get(company_id).subscribe((company) => {
        this.companyName = company ? company.name : '';
      });
    });
  }

  isAuthenticated() {
    return this.userService.isAuthenticate();
  }

  isAdmin() {
    return JSON.parse(localStorage.getItem('currentUser')).role === 'admin';
  }
}
