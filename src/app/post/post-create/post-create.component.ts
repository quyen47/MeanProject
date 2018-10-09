import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(param: NgForm) {
    if (param.invalid) {
      return;
    }
    const post: Post = {
      title: param.value.title,
      content: param.value.content
    };
    this.postCreated.emit(post);
  }

}
