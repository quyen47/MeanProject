import { Post } from './post.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];     // array, obj and funtion are reference type (just copy address, not true value)

    // array to contain the post that is updated when click the save button.
    private postsUpdated = new Subject<{ posts: Post[], count: number }>();

    constructor(private http: HttpClient, private router: Router) { }

    getPosts(pageSize: number, currentPage: number) {
        const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;

        // return [...this.posts];     // true copy of the posts, use typescript and javascript feature called the spread operator
        this.http
            .get<{ message: string, posts: any, count: number }>('http://localhost:3000/api/posts' + queryParams)
            .pipe(map((postData) => {
                return {
                    posts: postData.posts.map(post => {
                        return {
                            title: post.title,
                            content: post.content,
                            id: post._id
                        };
                    }),
                    count: postData.count
                };
            }))
            .subscribe(tranformedPost => {
                this.posts = tranformedPost.posts;
                this.postsUpdated.next({ posts: [...this.posts], count: tranformedPost.count });
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string) {
        // return post from array posts in fe, this is not a query from db.
        // return {...this.posts.find(p => p.id === id)};

        // return post from db to fix a error F5 in edit page.
        return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + id);
    }

    addPost(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content };
        this.http
            .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) => {
                this.router.navigate(['/']);
            });
    }

    deletePost(postId: string) {
        return this.http
            .delete('http://localhost:3000/api/posts/' + postId);
    }

    updatePost(id: string, title: string, content: string) {
        const post: Post = { id: id, title: title, content: content };
        this.http
            .put('http://localhost:3000/api/posts/' + id, post)
            .subscribe((responseData) => {
                console.log(responseData);
                this.router.navigate(['/']);
            });
    }
}
