import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from '../shared/interfaces/interface';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';

  constructor(private postsService: PostsService, private alert: AlertService) { }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.warning('Пост был удалён');
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      console.log(this.pSub);
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      console.log(this.dSub);
      this.dSub.unsubscribe();
    }
  }
}
