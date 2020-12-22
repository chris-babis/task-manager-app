import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.taskId && !changes.taskId.currentValue) return;
    this.taskService.getTask(changes.taskId.currentValue).subscribe((task:Task) => {
      this.task = task;
    });
  }

}
