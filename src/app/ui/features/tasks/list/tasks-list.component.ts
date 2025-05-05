import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  CdkDrag,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../../../domain/api/models/tasks.model';
import { ApiUseCases } from '../../../../application/api/api.usecases';
import { UsersModel } from '../../../../domain/api/models/users.model';
import { TaskStatus } from '../../../../shared/core/enums/tasks.enum';
import { TasksResponseType } from '../../../../shared/core/interfaces/tasks-response.interface';
import { AccessControlService } from '../../../../shared/core/services/acces-control.service';
import { AssignUserComponent } from '../assign-user/assign-user.component';
import { TasksCreateComponent } from '../create/tasks-create.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DragDropComponent } from '../drag-drop/drag-drop.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  imports: [
    CdkDropList,
    NgFor,
    CdkDrag,
    MatCardModule,
    MatIconModule,
    DragDropModule,
    DragDropComponent, // Importar el componente DragDropComponent
  ],
})
export class TasksListComponent {
  toAssign: Task[] = [];
  pending: Task[] = [];
  inProcess: Task[] = [];
  completed: Task[] = [];
  users: any[] = [];

  tasks: any[] = [];
  constructor(private readonly _apiUseCases: ApiUseCases, private dialog: MatDialog, private _accessControlService: AccessControlService) {
    this.getUsers();
    this.getTasks();
  }


  OnUpdateStatus($event: any) {
    const id = $event.event.previousContainer.data[$event.event.previousIndex].id;
    const status = $event.state;

    this.updateStatusTasks(id, status)
  }

  getUsers(): void {
    this._apiUseCases.getAll().then((response: UsersModel) => {
      this.users = response;
    }).catch(() => {

    });
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(TasksCreateComponent, {
      width: 'auto',
      maxHeight: '95vh',
      data: {
        isEditMode: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._apiUseCases.createTask(result.data).then((response: any) => {
          this.getTasks();
        }).catch((error) => {
        });
      }
    });
  }


  getTasks(): void {
    this._apiUseCases.getAllTasks().then((response: TasksResponseType) => {
      this.toAssign = [];
      this.pending = [];
      this.inProcess = [];
      this.completed = [];
      response.forEach(group => {
        switch (group.status.toLowerCase()) {
          case 'pending':
            this.pending = group.tasks;
            break;
          case 'inprocess':
            this.inProcess = group.tasks;
            break;
          case 'completed':
            this.completed = group.tasks;
            break;
          case 'toassign':
            this.toAssign = group.tasks;
            break;
          default:
        }
      });

    });
  }

  updateStatusTasks(id: number, status: string): void {
    let payload = {
      status: status
    }
    this._apiUseCases.updateTasks(payload, id).then((response: any) => {
      this.getTasks()
    }).catch(() => {

    });
  }

  openModalAssign($event: any) {
    const id = $event.id;

    const dialogRef = this.dialog.open(AssignUserComponent, {
      width: 'auto',
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let payload = {
          assignedId: result.data.userId,
          status: TaskStatus.Pending
        }
        this._apiUseCases.updateTasks(payload, id).then((response: any) => {
          this.getTasks();
        }).catch((error) => {
        });
      }
    });
  }

  validatedPermissions(moduleName: string): boolean {
    const rol = localStorage.getItem('rol')
    return this._accessControlService.hasAccess(rol, moduleName);
  }

  delete($event : any): void {
    const id = $event.id;

    this._apiUseCases.deleteTask( id).then((response: any) => {
      this.getTasks()
    }).catch(() => {

    });
  }
}
