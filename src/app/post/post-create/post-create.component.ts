import { Component, OnInit} from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
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
  postForm: FormGroup;
  imagePreview: string;

  constructor(public postsService: PostsService, public router: ActivatedRoute) {}

  public ngOnInit() {
    this.postForm = new FormGroup ({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });
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
            this.postForm.setValue({'title': this.post.title, 'content': this.post.content, 'image': null});
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  
  onImagePicked(event: Event) {
    const fileImage = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({image: fileImage});
    // this.postForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(fileImage);
  }

  onAddPost() {
    if (this.postForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(this.postForm.value.title, this.postForm.value.content);
    } else {
      this.postsService.updatePost(this.postId, this.postForm.value.title, this.postForm.value.content);
    }
    this.postForm.reset();
  }

}
