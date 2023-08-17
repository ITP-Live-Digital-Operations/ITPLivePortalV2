export interface TaskModel {
    id: number;
    assigned_by: number;
    assigned_to: number;
    brief_id: number;
    deadline: Date;
    created_at: Date;
    status: string;
    weight: number;
    progress: number;
    priority: number;
  }