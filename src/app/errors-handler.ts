import { ErrorHandler, Injectable} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

  constructor(private dialog: MatDialog) {}

  handleError(error: Error | HttpErrorResponse) {
   
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        console.log('Offline error');
        
      } else {
        // Handle Http Error (error.status === 403, 404...)
        const errorMessage = 'Http error response!!';
        this.dialog.open(ErrorComponent, {data: { message: errorMessage}});
      }
      return throwError(error);
     } else {
      // Handle Client Error (Angular Error, ReferenceError...)    
      console.error('It happens: dm loi ', error);
     }
    
    console.log('Message error ne:' + error);
    
  }
}
