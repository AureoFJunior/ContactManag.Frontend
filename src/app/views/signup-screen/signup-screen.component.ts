import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/componentes/user/user.model';
import { UserService } from 'src/app/componentes/user/user.service';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: ['./signup-screen.component.css']
})
export class SignupScreenComponent implements OnInit {
  hide = true;

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    email: '',
    isLogged: 0,
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['/'])
  }

  signup(): void {
    if (this.user.userName !== "") {
      this.userService.create(this.user).subscribe(() => {
        this.userService.showMessage('Register successfull!', 'success')

        this.router.navigate(['/']);
      })
  } else {
      this.userService.showMessage('Username needs to be filled. Verify', 'error')
      this.router.navigate(['/signup'])
    }
  }
}
