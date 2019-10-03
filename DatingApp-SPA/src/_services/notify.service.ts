import { Injectable } from '@angular/core';
import * as alertfy from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertfy.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {
      }
    });
  }

  success(message: string) {
    alertfy.success(message);
  }
  error(message: string) {
    alertfy.error(message);
  }
  warning(message: string) {
    alertfy.warning(message);
  }
  message(message: string) {
    alertfy.message(message);
  }
}
