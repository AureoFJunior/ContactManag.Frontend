import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../person-model';
import { PersonService } from '../person-service';

@Component({
  selector: 'app-person-read',
  templateUrl: './person-read.component.html',
  styleUrls: ['./person-read.component.css']
})
export class PersonReadComponent implements OnInit {

  persons: Person[] = [];
  displayedColumns: String[] = ['id', 'name', 'birthDate','action']
  dataSource = new MatTableDataSource<Person>()
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private personService: PersonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id !== null) {
      if (id !== "")
      this.deletePerson(id!)
    }

    this.personService.read().subscribe(persons => {
    this.dataSource = persons
    console.log(persons)
    this.dataSource.paginator = this.paginator;
    })
  }

  deletePerson(id: string): void {
    this.personService.delete(id).subscribe(person => {
      this.personService.showMessage(`Person [${id}] deleted succesfull.`, 'success')
    });
    this.router.navigate(['/persons'])
  }

  defineContact(contact: number): string {
    return ''
  }
}
