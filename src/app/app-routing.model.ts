import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostCreateComponent } from './post/post-create/post-create.component';

const routers = [
    { path: '', component: PostListComponent},
    { path: 'create', component: PostCreateComponent},
    { path: 'edit/:postId', component: PostCreateComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routers)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
