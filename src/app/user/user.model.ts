import { Project } from '../shared/project.model';

export class User  {

    _id: string;
    token: string;
    username: string;
    projects?: Project[];

    constructor(_id: string, token: string, username: string) {
        this._id = _id;
        this.token = token; 
        this.username = username;
        this.projects = [];
    }


}

