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
    ClientCalls : TaskClientCalls;
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

  export interface TaskClientCalls{
    id: number;
    introStatus: boolean;
    introDate: Date;
    introNotes: string;

    briefStatus: boolean;
    briefDate: Date;
    briefNotes: string;

    presentationStatus: boolean;
    presentationDate: Date;
    presentationNotes: string;
  }
