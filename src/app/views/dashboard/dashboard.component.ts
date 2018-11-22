import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/views/user/user.service';
import { User } from '@app/views/user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.userService.getAll()
      .subscribe((users: User[]) => {
        this.users = this.users = users;
      });
  }
}
