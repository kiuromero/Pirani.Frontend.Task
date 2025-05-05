import { Task } from "zone.js/lib/zone-impl";
import { RoleModel } from "../../../domain/api/models/roles.model";
import { UsersModel, User } from "../../../domain/api/models/users.model";
import { TasksResponseType } from "../../../shared/core/interfaces/tasks-response.interface";

export interface IApiAdapter {
    getAll(): Promise<UsersModel>;  
    getAllRoles(): Promise<RoleModel>; 
    createUser(payload : User): Promise<any>;
    updateUser(payload : User, id : number): Promise<any>;
    deleteUser(id : number): Promise<any>;

    //tasks
    createTask(payload : Task): Promise<any>
    getAllTasks(): Promise<TasksResponseType>;
    updateTasks(payload : any, id : number): Promise<any>;
    deleteTask(id : number): Promise<any>
}
