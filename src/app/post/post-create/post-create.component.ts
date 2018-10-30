import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  private postId: string;
  post: Post;
  mode = 'create';
  private isLoading = false;

  constructor(public postsService: PostsService, public router: ActivatedRoute) {}

  public ngOnInit() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        // this.post = this.postsService.getPost(this.postId); //for get post from fe
        this.postsService.getPost(this.postId)
          .subscribe(postData => {
            this.isLoading = false;
            this.post = {id: postData._id, title: postData.title, content: postData.content};
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onAddPost(param: NgForm) {
    if (param.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(param.value.title, param.value.content);
    } else {
      this.postsService.updatePost(this.postId, param.value.title, param.value.content);
    }
    param.resetForm();
  }

}
