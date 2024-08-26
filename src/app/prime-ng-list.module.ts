import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    BreadcrumbModule,
    SidebarModule,
    InputTextModule,
    SharedModule,
    InputNumberModule,
    SelectButtonModule,
    KeyFilterModule,
    CalendarModule,
    CardModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    TooltipModule,
    TableModule,
    ToggleButtonModule,
    ConfirmDialogModule,
    ToastModule
  ],
  exports: [
    ButtonModule,
    MenubarModule,
    MenuModule,
    BreadcrumbModule,
    SidebarModule,
    InputTextModule,
    SharedModule,
    InputNumberModule,
    SelectButtonModule,
    KeyFilterModule,
    CalendarModule,
    CardModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    TooltipModule,
    TableModule,
    ToggleButtonModule,
    ConfirmDialogModule,
    ToastModule

  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class PrimeNgListModule { }
