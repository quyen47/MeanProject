import { Post } from './post.model';
import { injectAttribute } from '@angular/core/src/render3';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];

    getPost() {
        return this.posts;
    }

    addPost(title: string, content: string) {
        const post: Post = {title: title, content: content};
        this.posts.push(post);
    }
}
