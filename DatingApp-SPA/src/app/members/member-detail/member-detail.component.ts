import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/_services/user.service';
import { NotifyService } from 'src/_services/notify.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { User } from 'src/app/_models/User';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private notify: NotifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //TO use of resolver added resolver and commented the loaduser function
    //this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
          width: '500px',
          height: '500px',
          imagePercent:100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
      }];
      this.galleryImages = this.getImages();
    }

      getImages(){
        const imageArrayUrls =[];
       for (const photo of this.user.photos) {
         console.log(photo.url);
         imageArrayUrls.push({
            small: photo.url,
            medium: photo.url,
            big: photo.url,
            description : photo.description,
         });
       }
        return imageArrayUrls;
  }
}
  //}

  /*loadUser() {
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
      (returnedUser: User) => {
        this.user = returnedUser;
      },
      error => {
              this.notify.error(error);
      });
    }*/

