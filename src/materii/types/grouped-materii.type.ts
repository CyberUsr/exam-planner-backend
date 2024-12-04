export interface GroupedMateriiType {
  [key: string]: {
    id: string;
    name: string;
    studyYear: string;
    groupName: string;
    professors: string[];
    assistants: string[];
    examsCount: number;
  }[];
}
