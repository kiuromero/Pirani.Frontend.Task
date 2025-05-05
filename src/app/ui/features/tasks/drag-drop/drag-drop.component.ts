import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Task } from '../../../../domain/api/models/tasks.model';
import { TaskStatus } from '../../../../shared/core/enums/tasks.enum';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
  imports: [CdkDropList, NgFor, CdkDrag, MatIconModule],
})
export class DragDropComponent {
  @Input() enabledToassign!: boolean;
  @Input() enabledDelete!: boolean;
  @Input() toAssign!: any[];
  @Input() pending!: any[];
  @Input() inProcess!: any[];
  @Input() completed!: any[];

  @Output() clickEvent = new EventEmitter();

  @Output() clickEventOpenModal = new EventEmitter();

  @Output() clickEventDelete = new EventEmitter();

  stateTasks = TaskStatus;

  drop(event: CdkDragDrop<Task[]>, state: string) {
    if (event.previousContainer === event.container) {
    } else {
      const assignedId = event.previousContainer.data[event.previousIndex].assignedId;
      if (assignedId != null) {
        this.clickEvent.emit({ event, state });
      }
    }
  }

  openModalAssign(task: Task) {
    this.clickEventOpenModal.emit(task);
  }

  delete(task: Task) {
    this.clickEventDelete.emit(task);
  }
}
