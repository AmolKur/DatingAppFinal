import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/_services/user.service';
import { NotifyService } from 'src/_services/notify.service';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/Pagination';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males' },{value: 'female', display: 'females' }];
  userParams: any = {};
  pagination: Pagination;

  constructor(
    private userService: UserService,
    private notofy: NotifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //this.loadUsers(); added resolver
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 2;
    this.userParams.maxAge = 99;
  }

  resetFilter(){
    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 2;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.pageNumber = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
    .getUsers(this.pagination.pageNumber,this.pagination.pageSize,this.userParams)
    .subscribe( 
      (res : PaginationResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      },
      error => {
        this.notofy.error(error);
      }
    );
  }
}

