import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from '../contacts-model';
import { ContactService } from '../contact.service';
import { Person } from '../../person/person-model';
import { PersonService } from '../../person/person.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  contacts: Contacts = {
    personId: 0,
    type: '',
    value: ''
  }

  persons: Person[] = [];
  comboPerson = new FormControl();

  constructor(private contactService: ContactService, private personService: PersonService, private router: Router) { }

  ngOnInit(): void {
    this.personService.read().subscribe(person => {
      this.persons = person;
      })
  }

  createContacts(): void {
    if (this.contacts.value !== "") {
      this.contacts.personId = this.comboPerson.value
      this.contactService.create(this.contacts).subscribe(() => {
        this.contactService.showMessage('Operation successful', 'success')

        this.router.navigate(['/contacts']);
    })
  }

  else {
    this.contactService.showMessage('Contact name needs to be filled. Verify', 'error')
    this.router.navigate(['/contacts/create'])
    }
  }

  cancel(): void {
    this.router.navigate(['/contacts'])
    this.contactService.showMessage('Canceled contact registration', 'atention')
  }
}
