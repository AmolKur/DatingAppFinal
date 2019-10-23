import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/User";
import { UserService } from "src/_services/user.service";
import { NotifyService } from "src/_services/notify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable()
export class MembrDetailResolver implements Resolve<User> {
    resolve(route: ActivatedRouteSnapshot):Observable<User>{
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.notify.error(error);
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }

    constructor(private userService:UserService,private router:Router,
        private notify:NotifyService) {}
}
