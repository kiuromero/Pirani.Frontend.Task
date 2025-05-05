import { Injectable } from "@angular/core";
import { RoleModel } from "../../domain/api/models/roles.model";
import { User } from "../../domain/api/models/users.model";
import { ApiRepository } from "../../domain/api/resporitory/api.repository";
import { TasksResponseType } from "../../shared/core/interfaces/tasks-response.interface";
import { Task } from "../../domain/api/models/tasks.model";

@Injectable({
    providedIn: 'root'
})

export class ApiUseCases {

    constructor(private _apiRepository: ApiRepository) { }

    getAll(): Promise<any> {
        return this._apiRepository.getAll();
    }

    getAllRoles(): Promise<RoleModel> {
        return this._apiRepository.getAllRole();
    }

    createUser(payload : User): Promise<any> {
        return this._apiRepository.createUser(payload);
    }

    updateUser(payload : User, id : number): Promise<any> {
        return this._apiRepository.updateUser(payload, id);
    }

    deleteUser(id : number): Promise<any> {
        return this._apiRepository.deleteUser(id);
    }

    createTask(payload : Task): Promise<any> {
        return this._apiRepository.createTask(payload);
    }

    getAllTasks(): Promise<TasksResponseType> {
        return this._apiRepository.getAllTasks();
    }

    updateTasks(payload : any, id : number): Promise<any> {
        return this._apiRepository.updateTasks(payload, id);
    }

    deleteTask(id : number): Promise<any> {
        return this._apiRepository.deleteTask(id);
    }
   
}