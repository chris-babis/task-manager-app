import { Component, Input, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() taskId;
  task:Task;
  taskSub:Subscription;

  commentInput:string = '';

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.taskId && !changes.taskId.currentValue) return;
    this.taskSub = this.taskService.getTask(changes.taskId.currentValue).subscribe((task:Task) => {
      this.task = task;      
    });
  }

  saveComment() {    
    this.taskService.saveComment(this.commentInput, this.taskId).subscribe((newComment:any) => {      
      this.task.comments.push(newComment.comment);
    })
  }


}
