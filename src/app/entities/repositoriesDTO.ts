import { Repository } from "./repository";

export interface RepositoryDTO {

    totalCount: number;
    incompleteResults: Boolean;
    items: Repository[];
    
}