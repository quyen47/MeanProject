import { Post } from './post.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, subscribeOn } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];     // array, obj and funtion are reference type (just copy address, not true value)
    private postsUpdated = new Subject<Post[]>(); // array to contain the post that is updated when click the save button.

    constructor(private http: HttpClient) {}

    getPosts() {
        // return [...this.posts];     // true copy of the posts, use typescript and javascript feature called the spread operator
        this.http
            .get<{message: string, posts: any}>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    };
                });
            }))
            .subscribe(tranformedPost => {
                this.posts = tranformedPost;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string) {
        // return post from array posts in fe, this is not a query from db.
        // return {...this.posts.find(p => p.id === id)};

        // return post from db to fix a error F5 in edit page.
        return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
    }

    addPost(title: string, content: string) {
        const post: Post = {id: null, title: title, content: content};
        this.http
            .post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) => {
                console.log(responseData.message);
                post.id = responseData.postId;
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);    // put new value and then copy 
        });
    }

    deletePost(postId: string) {
        this.http
            .delete('http://localhost:3000/api/posts/' + postId)
            .subscribe(() => {
                console.log('Deleted in service!');
                const updatePosts = this.posts.filter(post => post.id !== postId);
                this.posts = updatePosts;
                this.postsUpdated.next([...this.posts]);
            });
    }

    updatePost(id: string, title: string, content: string) {
        const post: Post = {id: id, title: title, content: content};
        this.http
            .put('http://localhost:3000/api/posts/' + id, post)
            .subscribe((responseData) => {
                console.log(responseData);
            });
    }
}
