import { Post } from './post.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];     // array, obj and funtion are reference type (just copy address, not true value)
    private postsUpdated = new Subject<Post[]>(); // array to contain the post that is updated when click the save button.

    constructor(private http: HttpClient) {}

    getPost() {
        // return [...this.posts];     // true copy of the posts, use typescript and javascript feature called the spread operator
        this.http.get<{message: string, post: Post[]}>('http://localhost:3000/api/posts')
            .subscribe((postData) => {
                this.posts = postData.post;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = {id: null, title: title, content: content};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);    // put new value and then copy 
    }
}
