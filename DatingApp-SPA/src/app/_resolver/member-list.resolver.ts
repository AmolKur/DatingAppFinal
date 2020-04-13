import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from 'src/_services/user.service';
import { NotifyService } from 'src/_services/notify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginationResult } from '../_models/Pagination';


@Injectable()
export class MembrListResolver implements Resolve<PaginationResult<User[]>> {
    pageNumber = 1;
    pageSize = 5;
    resolve(route: ActivatedRouteSnapshot):Observable<PaginationResult<User[]>> {
        return this.userService.getUsers(this.pageNumber,this.pageSize).pipe(
            catchError(error => {
                this.notify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }

    constructor(private userService:UserService,private router:Router,
        private notify:NotifyService) {}
}
