import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from '../../contact/contacts-model';
import { ContactService } from '../../contact/contact.service';
import { Person } from '../person-model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {

  person: Person = {
    name: '',
    birthDate: new Date
  }

  contacts: Contacts[] = [];

  constructor(private personService: PersonService, private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.personService.read().subscribe(contact => {
    this.contacts = contact;
    })
  }

  createPerson(): void {
    if (this.person.name !== "") {
      this.personService.create(this.person).subscribe(() => {
        this.personService.showMessage('Operation successful!', 'success')

        this.router.navigate(['/persons']);
      })
  }
  else {
    this.personService.showMessage('Person name needs to be filled. Verify', 'error')
    this.router.navigate(['/persons/create'])
    }
  }

  updateBirthDate(value: string){
    const regexBirthDate = /^\d{2}\/\d{2}\/\d{4}$/;
    if (regexBirthDate.test(value)) {
      const [yearBirth, monthBirth, dayBirth] = value.split('-');
      this.person.birthDate = new Date(Number(dayBirth), Number(monthBirth) - 1, Number(yearBirth))
    }
  }

  cancel(): void {
    this.router.navigate(['/persons'])
    this.personService.showMessage('Canceled contact registration', 'atention')
  }
}
