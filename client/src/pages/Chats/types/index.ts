export interface Message {
  userId: number;
  text: string;
  createdAt: string;
  createdBy: string;
}

export interface ResponseMessage extends Message {
  id: number;
}
