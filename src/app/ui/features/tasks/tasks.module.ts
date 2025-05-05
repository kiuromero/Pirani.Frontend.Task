import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TasksListComponent } from './list/tasks-list.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { TasksCreateComponent } from './create/tasks-create.component';
import { ApiUseCases } from '../../../application/api/api.usecases';
import { ApiRepository } from '../../../domain/api/resporitory/api.repository';
import { ApiAdapter } from '../../../infraestructure/api/adapters/api.adapter';
import { ApiService } from '../../../infraestructure/api/services/api.service';
import { AssignUserComponent } from './assign-user/assign-user.component';

@NgModule({
  declarations: [
    TasksCreateComponent,
    AssignUserComponent
  ],
  imports: [
    TasksRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    DragDropModule,
    TasksListComponent
  ],

  providers: [
    { provide: ApiRepository, useClass: ApiService },
     ApiUseCases, ApiAdapter
  ],
})
export class TasksModule {}
