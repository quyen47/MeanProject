import { Post } from './post.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];     // array, obj and funtion are reference type (just copy address, not true value)
    private postsUpdated = new Subject<Post[]>(); // array to contain the post that is updated when click the save button.

    getPost() {
        return [...this.posts];     // true copy of the posts, use typescript and javascript feature called the spread operator
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = {title: title, content: content};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);    // put new value and then copy 
    }
}
