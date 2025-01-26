export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  // daily: boolean;
  subtask: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  isCompleted: boolean;
}
