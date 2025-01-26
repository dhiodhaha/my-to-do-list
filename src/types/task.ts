export interface Task {
  id: string;
  title: string;
  completed: boolean;
  // daily: boolean;
  subtask: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}
