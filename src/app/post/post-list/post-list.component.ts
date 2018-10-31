import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';

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
  private isLoading = true;
  posts: Post[] = [];
  
  totalPosts = 100;
  pageSize = 2;
  pageSizeOptions = [2, 4, 6, 8];
  currentPage = 1;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts(this.pageSize, this.currentPage);
    this.postSubcri = this.postsService.getPostUpdateListener().subscribe((postsUpdate: Post[]) => {
      this.isLoading = false;
      this.posts = postsUpdate;
    });
  }

  onPageEvent(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.postsService.getPosts(pageEvent.pageSize, pageEvent.pageIndex + 1); // +1 because pageIndex start = 0
  }
  
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSubcri.unsubscribe();
  }
}
