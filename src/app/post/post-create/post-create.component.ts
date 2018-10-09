import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  constructor(public postsService: PostsService) {}
  
  onAddPost(param: NgForm) {
    if (param.invalid) {
      return;
    }
    this.postsService.addPost(param.value.title, param.value.content);
  }

}
