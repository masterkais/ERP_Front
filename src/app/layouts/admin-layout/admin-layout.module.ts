import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { BrowserModule } from '@angular/platform-browser';
Ng2GoogleChartsModule
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    MatTooltipModule,
    NgChartsModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
  ],
  declarations: [
    DashboardComponent,
  ]
})
export class AdminLayoutModule {}