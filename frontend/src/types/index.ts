// User
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  emergencyContact: {
    firstname: string;
    lastname: string;
    phone: string;
    email?: string | null;
  }[];
  reminder?: {
    method?: 'sms' | 'email' | null;
    timeOfDay?: 'morning' | 'afternoon' | 'evening';
  };
  lastCheckedIn: string;
  checkIns: CheckIn[];
}

// Health Status
export enum HealthStatus {
  GOOD = 'good',
  PHYSICAL = 'physical',
  MENTAL = 'mental',
}

export interface MoodInput {
  status: HealthStatus;
}

// Check-in
export interface CheckIn {
  _id: string;
  userId: string;
  healthStatus: HealthStatus;
  createdAt: Date;
  updatedAt: Date;
}
