import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorInfo } from '../entities/author-info';
import { RepositoryService } from '../repository.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-repository-detail',
  templateUrl: './repository-detail.component.html',
  styleUrls: ['./repository-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryDetailComponent implements OnInit {

  authorList$: Observable<AuthorInfo[]> = new Observable();
  authors: AuthorInfo[];
  subscription: Subscription;

  constructor(private cd: ChangeDetectorRef, private repositoryService: RepositoryService) { }

  ngOnInit() {
    this.repositoryService
      .getRepositoryDetails(history.state["commitsUrl"], history.state["contributorsUrl"])
      .then(data => {
        this.authors = data["authorInfoList"];
        console.log(JSON.stringify(this.authors));
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
