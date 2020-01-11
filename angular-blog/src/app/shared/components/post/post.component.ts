import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/admin/shared/interfaces/interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }

  @Input() post: Post;

  ngOnInit() {
  }

}
