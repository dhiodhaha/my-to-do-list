export type Task = {
  id: string;
  title: string;
  completed: boolean;
  // daily: boolean;
  subtask: Subtask[];
};

export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};
