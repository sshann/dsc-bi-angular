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
  companyId: string;

  constructor(private userService: UserService,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.setCompanyName(currentUser.company_id);
    }

    this.userService.isUserChanged().subscribe((loggedIn) => {
      if (loggedIn) {
        const company_id = JSON.parse(localStorage.getItem('currentUser')).company_id;
        this.setCompanyName(company_id);
      } else {
        this.companyId = null;
        this.companyName = null;
      }
    });

    this.companyService.haveCompanyChanged().subscribe((company) => {
      if (company.id === this.companyId) {
        this.companyName = company.name;
      }
    });
  }

  private setCompanyName(company_id) {
    setTimeout(() => {
      this.companyService.get(company_id).subscribe((company) => {
        this.companyName = company.name;
        this.companyId = company.id;
      });
    }, 2500);
  }

  isAuthenticated() {
    return this.userService.isAuthenticate();
  }

  isAdmin() {
    return JSON.parse(localStorage.getItem('currentUser')).role === 'admin';
  }
}
