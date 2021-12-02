import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

import { ToastrModule } from 'ngx-toastr';

import { StyleClassModule } from 'primeng/styleclass';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule, InputMask } from 'primeng/inputmask';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TimeagoModule } from 'ngx-timeago';

// import { StyleClassModule } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AvatarModule,
    BadgeModule,
    CardModule,
    // StyleClassModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    StyleClassModule,
    TagModule,
    TabViewModule,
    DividerModule,
    GalleriaModule,
    NgxSpinnerModule,
    MessageModule,
    RadioButtonModule,
    InputMaskModule,
    SelectButtonModule,
    TableModule,
    TimeagoModule.forRoot(),
  ],
  exports: [
    CommonModule,
    AvatarModule,
    BadgeModule,
    CardModule,
    ButtonModule,
    DialogModule,
    // StyleClassModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ToastrModule,
    StyleClassModule,
    TagModule,
    TabViewModule,
    DividerModule,
    GalleriaModule,
    NgxSpinnerModule,
    MessageModule,
    RadioButtonModule,
    InputMaskModule,
    SelectButtonModule,
    TableModule,
    TimeagoModule,
  ],
})
export class MaterialModule {}
