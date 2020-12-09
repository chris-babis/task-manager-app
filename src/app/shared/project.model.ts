import { User } from '../user/user.model';
import { Task } from './task.model';

export interface Project {
    _id?: string,
    title: string,
    ownerId: User,
    tasks?: [Task],
    collaborators?: [User]
}