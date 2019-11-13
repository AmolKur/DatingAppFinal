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
      this.getMemberPhotoChange.emit(photo.url);
    }, error => {
        this.notify.error(error);
      });
  }

}
