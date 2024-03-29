import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/user.service";
import {UserPage} from "../../shared/types";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page: UserPage = {
    content: [],
    page: 0,
    size: 3,
    totalPages: 0
  };

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.loadUsers().subscribe(responseBody => {
      this.page = responseBody as UserPage;
    })
  }
}
