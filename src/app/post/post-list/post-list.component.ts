import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  private postSubcri: Subscription;
  posts: Post[] = [];

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPost();
    this.postSubcri = this.postsService.getPostUpdateListener().subscribe((postsUpdate: Post[]) => {
      this.posts = postsUpdate;
    });
  }
  
  ngOnDestroy() {
    this.postSubcri.unsubscribe();
  }
}
