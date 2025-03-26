export interface UserType {
    id: string;
    email: string;
    username: string;
    // is_active: boolean;
    // created_at: Date;
    // updated_at: Date;
  }
  
  export interface AuthType {
    user: UserType | null;
    access: string | null;
    refresh: string | null;
  }