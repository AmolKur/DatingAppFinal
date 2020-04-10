import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import {FileUploader} from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/_services/auth.service';
import { UserService } from 'src/_services/user.service';
import { NotifyService } from 'src/_services/notify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  uploadedPhoto: Photo;
  baseUrl =  environment.baseUrl;
  currentMainPhoto: Photo;

  constructor (private authservice: AuthService, private userService: UserService, private notify: NotifyService) {}

  ngOnInit() {
    this.initializeUploader();
  }

  initializeUploader() {

    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authservice.decodedToken.nameid[0] + '/photos',
      authToken : 'Bearer ' + localStorage.getItem('token'),
      isHTML5 : true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload : true,
      maxFileSize : 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id : res.id,
          url: res.url,
          dateadded : res.dateadded,
          description : res.description,
          isMain : res.isMain
        };
        this.photos.push(photo);
        if(photo.isMain)
        {
          this.authservice.changeMemberPhoto(photo.url);
          this.authservice.userOnLogin.mainPhotoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authservice.userOnLogin));
        }
      }
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public setMainPhoto( photo: Photo ){
    this.userService.setMainPhoto(this.authservice.decodedToken.nameid[0], photo.id).subscribe(data => {
      this.notify.success('Photo updated as main.');
      this.currentMainPhoto = this.photos.filter(x => x.isMain === true)[0];
      this.currentMainPhoto.isMain = false;
      photo.isMain = true;
     // tslint:disable-next-line: comment-format
     //this.getMemberPhotoChange.emit(photo.url);
     this.authservice.changeMemberPhoto(photo.url);
     this.authservice.userOnLogin.mainPhotoUrl = photo.url;
     localStorage.setItem('user', JSON.stringify(this.authservice.userOnLogin));
    }, error => {
        this.notify.error(error);
      });
  }

  public deletePhoto(photoId: number){

    this.notify.confirm('Are you sure to delete this photo?', () => {
      this.userService.deletePhoto(this.authservice.decodedToken.nameid[0], photoId).subscribe(data => {
        this.photos.splice(this.photos.findIndex(p => p.id === photoId),1);
        this.notify.success('Photo deleted successfully');
    }, error => {
      this.notify.error(error);
    });
    /*this.userService.deletePhoto(this.authservice.decodedToken.nameid[0], photo.id).subscribe(data => {
      this.notify.success('Photo deleted successfully');
    }, error => {
        this.notify.error(error);
      });*/
  });
  }
}
