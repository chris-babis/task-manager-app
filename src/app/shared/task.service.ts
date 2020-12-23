import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];
  tasksSub = new BehaviorSubject<Task[]>([]);

  constructor(private http:HttpClient, private projectService:ProjectService, private router:Router) { }

  addTask(projectId:string,newTask:Task) {
    this.http.post(`http://localhost:3000/project/${projectId}`, newTask).subscribe((updatedProject:Project) => {
      this.projectService.getProjects().subscribe((projects:Project[]) => {        
        const foundIndex = projects.findIndex((project:Project) => project._id === projectId);
        projects[foundIndex] = updatedProject;
        this.getAllTasks(updatedProject._id);
      });
    })
  }

  getAllTasks(projectId:string) {
    return this.http.get(`http://localhost:3000/project/${projectId}/tasks`).subscribe((tasks:Task[]) => {
      this.tasks = tasks;
      this.tasksSub.next([...this.tasks]);
    })
  }

  getAllTasksObs(){
    return this.tasksSub.asObservable();
  }

  getTask(taskId:string) {
    return this.http.get(`http://localhost:3000/task/${taskId}`);
  }
  
  saveComment(commentInput:string, taskId: string) {
    let comment = commentInput;
    return this.http.post(`http://localhost:3000/task/${taskId}/comment`, {comment});
  }
}
