export enum HealthStatus {
  GOOD = 'good',
  PHYSICAL = 'physical',
  MENTAL = 'mental',
}

export interface MoodInput {
  status: HealthStatus;
}
