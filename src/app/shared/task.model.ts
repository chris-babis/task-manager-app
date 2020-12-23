import { User } from '../user/user.model';

export interface Task {
    _id?: string,
    title: string,
    ownerId: User,
    assignee?: User,
    priority: String,
    status: String,
    comments?: [String]
}