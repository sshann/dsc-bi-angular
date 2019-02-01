import {Component, OnInit} from '@angular/core';
import {Company} from '../../shared/Company';
import {CompanyOutput} from '../../shared/CompanyOutput';
import {CompanyService} from '../company.service';

// @khalil, going to mark this as deprecated and created another company class to extend the design of the rest of the app
// But as I am sure that you had a lot of work to do this, I gonna keep it intact. The only change I made ws indentation
/**
 * @deprecated Use CompanyComponent instead
 */
@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css']

})
export class CompanylistComponent implements OnInit {
  company: Company[] = [];
  temp: CompanyOutput;
  tempAdd: Company;
  addComponent: boolean = false; //variable to make add form visible on click
  updateComponent: boolean = false; //variable to make the update form visible on click
  index: number = 0;

  constructor(private companyService: CompanyService) {
    this.company = [];
    this.temp = {
      name: ' ',
      responsibleName: ' ',
      responsibleEmail: ' ',
      responsiblePhone: ' ',
      id: ' ',
      _rev: ' '
    };
    this.tempAdd = {
      name: ' ',
      responsibleName: ' ',
      responsibleEmail: ' ',
      responsiblePhone: ' ',
      id: ''
    };
  }


//Retrieve list of companies on the component initialization
  ngOnInit() {
    this.getCompanyList();
    console.log(this.company);
  }

//Display the form to add a company to the list
  displayAddCompoenent(): void {
    this.addComponent = !(this.addComponent);
  }

// Display the form to update a selected company
  displayUpdate(comp: CompanyOutput, index: number): void {
    this.updateComponent = !(this.updateComponent);
    this.temp.id = comp.id;
    this.temp.name = comp.name;
    this.temp.responsibleName = comp.responsibleName;
    this.temp.responsibleEmail = comp.responsibleEmail;
    this.temp.responsiblePhone = comp.responsiblePhone;
    this.temp._rev = comp._rev;
    this.index = index;
    console.log(this.temp);
  }

// Call the service that retrieves the list of company from the database
  getCompanyList(): void {
    setTimeout(() => {
      this.companyService.getCompanyList()
        .subscribe(company => this.company = company);
    }, 500);
  }

//Delete the selected company by calling a service that deletes it from the database
  delete(comp: Company): void {
    this.companyService.deleteCompany(comp).subscribe();
    this.company = this.company.filter(c => c !== comp);
    this.addComponent = false;
    this.updateComponent = false;
  }

// Calls a service and pass the company that will be added to the database
  addCompany(name: string, resName: string, resEmail: string, resPhone: string): void {
    if ((name || resName || resEmail || resPhone) == '') {
      console.log('All fields must be filled');
    } else {
      this.tempAdd.name = name;
      this.tempAdd.responsibleName = resName;
      this.tempAdd.responsibleEmail = resEmail;
      this.tempAdd.responsiblePhone = resPhone;
      this.companyService.addCompany(this.tempAdd).subscribe(comp => {
        this.company.push(comp);
      });
    }
  }

//Calls a service a pass the company to update the details in the database
  updateCompany(name: string, user: string, email: string, phone: string): void {
    if ((name || user || email || phone) == ' ') {
      console.log('All fields must be filled');
    } else {
      this.temp.name = name;
      this.temp.responsibleName = user;
      this.temp.responsibleEmail = email;
      this.temp.responsiblePhone = phone;
      this.companyService.updateCompany(this.temp).subscribe(comp => {
        this.temp._rev = comp._rev;
        this.company[this.index] = comp;

      });
    }
  }


}

