import { Task } from './task.model';

export interface Project {
    _id?: string,
    title: string,
    ownerId: string,
    tasks: [Task],
    collaborators: [string]
}