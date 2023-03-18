import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { HomeComponent } from './views/home/home.component';
import { FooterComponent } from './componentes/templates/footer/footer.component';
import { NavComponent } from './componentes/templates/nav/nav.component';

import { LoginScreenComponent } from './views/login-screen/login-screen.component';
import { SignupScreenComponent } from './views/signup-screen/signup-screen.component';

import { UserService } from './componentes/user/user.service';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { MatSelectModule } from '@angular/material/select';

import { MatSlideToggleModule } from '@angular/material/slide-toggle'

import { PersonReadComponent } from './componentes/person/person-read/person-read.component';
import { PersonCreateComponent } from './componentes/person/person-create/person-create.component';
import { PersonCrudComponent } from './views/person-crud/person-crud.component';
import { PersonUpdateComponent } from './componentes/person/person-update/person-update.component';

import { ContactUpdateComponent } from './componentes/contact/contact-update/contact-update.component';
import { ContactReadComponent } from './componentes/contact/contact-read/contact-read.component';
import { ContactCreateComponent } from './componentes/contact/contact-create/contact-create.component';
import { ContactCrudComponent } from './views/contact-crud/contact-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LoginScreenComponent,
    SignupScreenComponent,
    PersonUpdateComponent,
    PersonCrudComponent,
    PersonCreateComponent,
    PersonReadComponent,
    ContactUpdateComponent,
    ContactReadComponent,
    ContactCreateComponent,
    ContactCrudComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    NgImageSliderModule,
    MatSelectModule,
    MatDatepickerModule,
    NativeDateModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    NgxMaskModule.forRoot()
  ],
  providers: [UserService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
