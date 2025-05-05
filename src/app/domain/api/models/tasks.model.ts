export interface Task {
    name: string;
    description: string;
    status: string;
    assignedId?: number;
    assignedUserName?: string; // Agregar esta propiedad
}