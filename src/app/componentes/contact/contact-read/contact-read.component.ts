import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacts } from '../contacts-model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-read',
  templateUrl: './contact-read.component.html',
  styleUrls: ['./contact-read.component.css']
})
export class ContactReadComponent implements OnInit {

  contacts: Contacts[] = [];
  displayedColumns: String[] = ['id', 'personId', 'value', 'type', 'action']
  dataSource = new MatTableDataSource<Contacts>()
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id !== null) {
      if (id !== "")
      this.deleteContact(id!)
    }

    this.contactService.read().subscribe(contacts => {
    this.dataSource = contacts
    this.dataSource.paginator = this.paginator;
    })
  }

  deleteContact(id: string): void {
    this.contactService.delete(id).subscribe(contacts => {
      this.contactService.showMessage(`Contact [${id}] deleted succesfull.`, 'success')
    });
    this.router.navigate(['/contacts'])
  }
}
