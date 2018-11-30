import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ErrorsHandler } from './errors-handler';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatInputModule, 
  MatCardModule, 
  MatButtonModule, 
  MatToolbarModule, 
  MatExpansionModule, 
  MatProgressSpinnerModule,
  MatDialogModule,
  MatPaginatorModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from 'src/app/post/post-list/post-list.component';
import { AppRoutingModule } from './app-routing.model';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
  
})
export class AppModule { }
