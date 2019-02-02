# BI-Angular Application


This project was developed for the course assignment of the 2018-2019 edition of the Vrije Universiteit Amsterdam, Computer Science Master Degree, Developing Services to the Cloud course.

This application is intended to be used as a complement of companies internal applications, providing insights into the company business. In this first version, we provide an analysis regarding the transactions, products and employees.

## Features

- See a visual report of the current situation of your company.
- Register new users from your company to manage the data and analyse the reports.
- Simple data management and integration through importing batches of data or a panel that is easy to use to create, update, list and delete your data.
- Export your data to integrate with other tools or as a secure backup. 
- Download a complete report of the current situation of your company.

## Technologies

The main requirements are Node version 6.16.0 and NPM version 3.10.10. We recommend the use of the [Node Version Manager](https://github.com/creationix/nvm).

This project uses [Angular Material](https://material.angular.io/) and [Angular Flex Layout](https://github.com/angular/flex-layout) packages to implement a neat and clean user interface and [Ngx Charts](https://github.com/swimlane/ngx-charts) to create beautiful charts.

The export, import and report features, are achieved with the use of the packages [jsPDF](https://github.com/MrRio/jsPDF), [htmlToCanvas](https://github.com/niklasvh/html2canvas) and [CSV to Json](https://github.com/Keyang/node-csvtojson)

The last main library used is the [RxJS](https://rxjs-dev.firebaseapp.com/), to handle promises and some component communication.

## API

The details fo the consumed REST API of this project can be found in our [BI API Loopback repository](https://git.eu-gb.bluemix.net/w.genizshann/toolchain-dsc-bi).

## Architecture

This Angular application was designed splitting the functionalities in different modules:

- **App Module**: Applies the core components and includes the core module.
- **Core Module**: Defines the application skeleton (header, body, etc) components and includes all other modules. The heart of the application is here.
- **Company Module**: Provides 2 levels of management. One general for Admin users check all the existent companies and create new companies. it is also possible to add new users to any of the companies.  The second level of management is single company management, intend to be used for the Bussiness Owners (BOs). They can perform a check and update the company, as well as add new users to the company (BOs and Business Managers (BMs) users only).
- **Auth Module**: Everything related to authentication is defined in this module. It contains the basic login, logout and user creation components, as well as the route guards. In this app is define 4 guards, One for authenticated users and one for each user role.
- **Dashboard Module**: Contains a single dashboard component that displays all pieces of information of the current user company.
- **DataPanel Module**: All data related management is defined in this module. Currently, it has 3 categories, Employees, Products and Transactions, each with the basic functionalities plus a few graphs components. Data importing and Exporting is also defined here.
- **Profile Module**:  Contains the user profile page.
- **Shared Module**: Contains common classes and components. Overall, all models and interceptors are declared in the Shared Module.

## Misc

- In the root directory, under ``testFiles`` is specified the format and structure of the imported files.

## Possible Improvements:

- Split the DataPanel Module data, one module for each data category (Product, Employee and Transaction).
- Add more data categories types.
- Display the application details and support contact in the welcome page.
- Improve the error detection and handling.
- Add more export options.
- Add data and export filtering.
- Allow deleting data in batches.
- Add user confirmation by email.
- Allow updating an existent user role.
- Specify the import file format and structure or provide a template for the users.