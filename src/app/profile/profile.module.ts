import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import {ProfileRoutingModule} from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	ProfileRoutingModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
