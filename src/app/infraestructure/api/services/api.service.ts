import { Injectable } from "@angular/core";
import { Task } from "zone.js/lib/zone-impl";
import { RoleModel } from "../../../domain/api/models/roles.model";
import { UsersModel, User } from "../../../domain/api/models/users.model";
import { ApiRepository } from "../../../domain/api/resporitory/api.repository";
import { TasksResponseType } from "../../../shared/core/interfaces/tasks-response.interface";
import { ApiAdapter } from "../adapters/api.adapter";

@Injectable({
  providedIn: 'root',
})
export class ApiService extends ApiRepository {

  constructor(private readonly _apiAdapter: ApiAdapter,
  ) {
    super();
  }

  async getAll(): Promise<UsersModel> {
    return this._apiAdapter.getAll();
  }

  override getAllRole(): Promise<RoleModel> {
    return this._apiAdapter.getAllRoles();
  }

  override createUser(payload: User): Promise<any> {
    return this._apiAdapter.createUser(payload);
  }

  override updateUser(payload: User, id: number): Promise<any> {
    return this._apiAdapter.updateUser(payload, id);
  }

  override deleteUser(id: number): Promise<any> {
    return this._apiAdapter.deleteUser(id);
  }

  override createTask(payload: any): Promise<any> {
    return this._apiAdapter.createTask(payload);
  }

  override getAllTasks(): Promise<TasksResponseType> {
    return this._apiAdapter.getAllTasks();
  }

  override updateTasks(payload: any, id: number): Promise<any> {
    return this._apiAdapter.updateTasks(payload, id);
  }

  override deleteTask(id: number): Promise<any> {
    return this._apiAdapter.deleteTask(id);
  }

}
