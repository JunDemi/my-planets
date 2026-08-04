export interface CommonResponse<T> {
  status: string;
  result: T;
}

export interface Memo {
  id: string;
  date: number;
  message: string;
}

export interface MemoResponse extends CommonResponse<Memo[]> {}