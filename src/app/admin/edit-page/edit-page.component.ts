import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs";
import {Post} from "../../shared/interfaces";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit{
  form: FormGroup
  post: Post
  submitted = false
constructor(
  private route: ActivatedRoute,
  private postsService: PostsService
) {
}

ngOnInit(){
    this.route.params.pipe(
      switchMap((params:Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe((post:Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
      // id: this.post.id,
      // text: this.form.value.text,
      // title: this.form.value.text,
      // author: this.post.author,
      // date: new Date()
    }).subscribe( () => {
      this.submitted = false
    })
  }
}
