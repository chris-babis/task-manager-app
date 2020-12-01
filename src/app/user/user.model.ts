export class User  {

    _id: string;
    token: string;
    username: string;

    constructor(_id: string, token: string, username: string) {
        this._id = _id;
        this.token = token; 
        this.username = username;
    }
}

