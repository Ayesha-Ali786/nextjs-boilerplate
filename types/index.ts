export interface Room {
  id: string;
  roomNo: string;
  capacity: number;
  hasAC: boolean;
  hasWashroom: boolean;
  isAllocated: boolean;
  allocatedTo?: string;
  allocatedStudents?: number;
}

export interface AllocationRequest {
  students: number;
  needAC: boolean;
  needWashroom: boolean;
}

export interface AllocationResult {
  success: boolean;
  room?: Room;
  message: string;
}
