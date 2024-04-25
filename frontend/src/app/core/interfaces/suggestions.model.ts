import { UserIdandName } from "./og.model";

export interface SuggestionModel {
  id: number;
  suggestion: string;
  estimatedTime: number;
  suggestedBy: string;
  priority: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserIdandName;
}

export interface createSuggestionModel {
  suggestion: string;
  suggestedBy: number;
}


export interface statusAndMessage {
  status: string;
  message: string;
}

export interface returnSuggestionModel {
  status: string;
  message: string;
  data: SuggestionModel[];
}
export interface returnSuggestionModelSingle {
  status: string;
  message: string;
  data: SuggestionModel;
}
