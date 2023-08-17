export interface Notification {
    id: number;
    user_id: number;
    read: boolean;
    link: string;
    message: string;
    created_at: Date;
  }
  