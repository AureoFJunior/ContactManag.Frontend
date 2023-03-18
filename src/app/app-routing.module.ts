import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginScreenComponent } from './views/login-screen/login-screen.component';
import { SignupScreenComponent } from './views/signup-screen/signup-screen.component';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { HomeComponent } from './views/home/home.component';
import { ContactCreateComponent } from './componentes/contact/contact-create/contact-create.component';
import { ContactUpdateComponent } from './componentes/contact/contact-update/contact-update.component';
import { PersonUpdateComponent } from './componentes/person/person-update/person-update.component';
import { PersonCreateComponent } from './componentes/person/person-create/person-create.component';
import { PersonCrudComponent } from './views/person-crud/person-crud.component';
import { ContactCrudComponent } from './views/contact-crud/contact-crud.component';


const routes: Routes = [
    {
      path: "",
      component: LoginScreenComponent
    },
    {
      path: "signup",
      component: SignupScreenComponent
    },
    {
      path: "home",
      component: HomeComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "persons",
      component: PersonCrudComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "persons/create",
      component: PersonCreateComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "persons/update/:id",
      component: PersonUpdateComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "persons/:id",
      component: PersonCrudComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "contacts",
      component: ContactCrudComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "contacts/create",
      component: ContactCreateComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "contacts/update/:id",
      component: ContactUpdateComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "contacts/:id",
      component: ContactCrudComponent,
      canActivate: [AuthGuardService]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
