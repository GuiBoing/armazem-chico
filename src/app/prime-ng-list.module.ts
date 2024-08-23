import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    BreadcrumbModule,
    SidebarModule
  ],
  exports: [
    ButtonModule,
    MenubarModule,
    MenuModule,
    BreadcrumbModule,
    SidebarModule
  ]
})
export class PrimeNgListModule { }
