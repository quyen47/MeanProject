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

  totalPosts = 0;
  pageSize = 8;
  pageSizeOptions = [2, 4, 6, 8];
  currentPage = 1;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts(this.pageSize, this.currentPage);
    this.postSubcri = this.postsService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[], count: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.count;
        this.posts = postData.posts;
      });
  }

  onPageEvent(pageEvent: PageEvent) {
    console.log(pageEvent);
    // this.isLoading = true;
    this.pageSize = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex + 1;
    this.postsService.getPosts(this.pageSize, this.currentPage); // +1 because pageIndex start = 0
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.pageSize, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postSubcri.unsubscribe();
  }
}
