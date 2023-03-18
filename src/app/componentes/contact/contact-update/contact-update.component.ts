import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacts } from '../contacts-model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  contacts: Contacts = {
    personId: 0,
    type: '',
    value: ''
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.contactService.readById(id!).subscribe(contacts => {
      this.contacts = contacts
    });
  }

  navigate(): void {
    this.router.navigate(['/contacts']);
  }

  updateContact(): void {
    this.contactService.update(this.contacts).subscribe(() => {
      this.contactService.showMessage(`Contact [${this.contacts.personId}] uptaded succesfull! :)`, 'success');
      this.navigate();
    });
  }

  cancel(): void {
    this.navigate();
    this.contactService.showMessage('Edit operation canceled :( ', 'error');
  }
}
