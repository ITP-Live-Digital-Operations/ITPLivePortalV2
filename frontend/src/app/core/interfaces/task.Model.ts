export interface TaskModel {
    id: number;
    assigned_by: number;
    assignedUsers : any;
    brief_id: number;
    deadline: Date;
    created_at: Date;
    status: string;
    weight: number;
    progress: number;
    priority: number;
    round : number;
    History : TaskHistory[];
  }


  export interface TaskHistory{
    id : number;
    task_id : number;
    round : number;
    feedback : string;
    notes : string;
    createdAt : Date;
    updatedAt : Date;
  }
