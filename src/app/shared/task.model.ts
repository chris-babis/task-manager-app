import { User } from '../user/user.model';

export interface Task {
    _id?: string,
    title: string,
    ownerId: User,
    assignee?: String,
    priority: String,
    status: String
}