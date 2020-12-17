import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {

  project: Project;
  projectSub: Subscription;
  tasksSub:Subscription;
  nameInput:string = '';
  selectedAssignee:string = '';
  selectedPriority:string = '';

  isExpanded:boolean = false;
  selectedTaskId:string;
  elem: HTMLElement;

  @ViewChild('expandbtn', {static: false}) expandBtn: ElementRef;



  constructor(private route:ActivatedRoute, private projectService:ProjectService, private taskService:TaskService) { }

  ngOnInit(): void {
    this.projectSub = this.route.data.subscribe((projectData:Data) => {
      this.project = projectData[0];      
      this.taskService.getAllTasks(this.project._id);
      this.tasksSub = this.taskService.getAllTasksObs().subscribe((tasks:Task[]) => {
        this.project.tasks = tasks;    
        console.log(this.project.tasks);
           
      });
    });   
    this.isExpanded = false;
    this.elem = document.getElementById('modal');
  }

  ngOnDestroy(): void {
    this.projectSub.unsubscribe();
    this.tasksSub.unsubscribe();
  }

  addTask() {
    
    let newTask:Task = {
      title: this.nameInput,
      ownerId: this.project.ownerId, 
      priority: this.selectedPriority,
      status: 'Uncompleted'
    }

    if(this.selectedAssignee) newTask.assignee = this.selectedAssignee;
    this.taskService.addTask(this.project._id,newTask);

    this.nameInput = '';
    this.selectedAssignee = '';
    this.selectedPriority = '';
    
  }

  expandTask(taskId) {
    this.isExpanded = !this.isExpanded;
    this.selectedTaskId = taskId;
  }

  deleteProject() {
    
    this.elem.setAttribute("style","display: block;");
  }

  confirmDelete() {
    this.elem.setAttribute("style","display: none;");
    this.projectService.deleteProject(this.project._id);
  }

  cancel() {
    this.elem.setAttribute("style","display: none;")
  }


  // taskTemplateStyle() {
  //   let styles = ;
  //   return styles;
  // }
}
 