import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacts } from '../../contact/contacts-model';
import { ContactService } from '../../contact/contact.service';
import { Person } from '../person-model';
import { PersonService } from '../person-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css']
})
export class PersonUpdateComponent implements OnInit {

  constructor(private personService: PersonService, private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  person: Person = {
    name: '',
    birthDate: new Date
  }

  contacts: Contacts[] = [];
  displayedColumns: String[] = ['id', 'value', 'type','action']
  dataSource = new MatTableDataSource<Contacts>()
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    this.personService.readById(id!).subscribe(person => {
      this.person = person
      console.log(this.person)
    });

    this.personService.readByPerson(id!).subscribe(contact => {
      this.contacts = contact;
      this.dataSource = contact
      this.dataSource.paginator = this.paginator;
      })
  }

  navigate(): void {
    this.router.navigate(['/persons']);
  }

  updatePerson(): void {
    this.personService.update(this.person).subscribe(() => {
      this.personService.showMessage(`Person [${this.person.name}] uptaded succesfull! :)`, 'success');
      this.navigate();
    });
  }

  updateBirthDate(value: string){
    const regexBirthDate = /^\d{2}\/\d{2}\/\d{4}$/;
    if (regexBirthDate.test(value)) {
      const [yearBirth, monthBirth, dayBirth] = value.split('-');
      this.person.birthDate = new Date(Number(dayBirth), Number(monthBirth) - 1, Number(yearBirth))
    }
  }

  cancel(): void {
    this.navigate();
    this.personService.showMessage('Edit operation canceled :( ', 'error');
  }

}
