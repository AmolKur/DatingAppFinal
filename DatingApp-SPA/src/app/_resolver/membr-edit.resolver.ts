import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/User";
import { UserService } from "src/_services/user.service";
import { NotifyService } from "src/_services/notify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/_services/auth.service";


@Injectable()
export class MembrEditResolver implements Resolve<User> {
    resolve(route: ActivatedRouteSnapshot):Observable<User>{
        return this.userService.getUser(this.authService.decodedToken.nameid[0]).pipe(
            catchError(error => {
                this.notify.error(error);
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }

    constructor(private userService:UserService,private router:Router,
        private notify:NotifyService,private authService : AuthService) {}
}
