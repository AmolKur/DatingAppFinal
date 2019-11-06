import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import {FileUploader} from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  uploadedPhoto: Photo;
  baseUrl =  environment.baseUrl;

  constructor (private authservice: AuthService){}

  ngOnInit() {
    this.initializeUploader();
  }

  initializeUploader(){

    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authservice.decodedToken.nameid[0] + '/photos',
      authToken : 'Bearer '+ localStorage.getItem('token'),
      isHTML5 : true,
      allowedFileType:['image'],
      removeAfterUpload: true,
      autoUpload : true,
      maxFileSize : 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;}

    this.uploader.onSuccessItem = (item,response,status,headers) => {
      if (response) {
        const res : Photo = JSON.parse(response);
        const photo ={
          id :res.id,
          url:res.url,
          dateadded : res.dateadded,
          description : res.description,
          isMain : res.isMain
        };
        this.photos.push(photo);
      }
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
