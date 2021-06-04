import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../entities/repository';
import { RepositoryService } from '../repository.service';
import { RepositoryDTO } from '../../app/entities/repositoriesDTO';
import { Observable, of } from 'rxjs';
import { AuthorInfo } from '../../app/entities/author-info';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit() {  }

  @Input() query: string = "";

  repositories: Repository[] = [];
  selectedRepository?: Repository;
 

  getRepositories(): void {
    if (this.query.trim().length == 0) {
      alert("Please enter search query!");
      return;
    }
    this.repositoryService
      .getRepositories(this.query)
      .subscribe((reposDTO: RepositoryDTO) => {
        this.repositories = reposDTO.items;
        console.log("repo :: " + JSON.stringify(this.repositories[0]));
      },
        err => console.error('Observer got an error: ' + err),
        () => console.log('Observer got a complete notification'));
  }

  onSelect(repository: Repository): void {
    this.selectedRepository = repository;
  }

}
