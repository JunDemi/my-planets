interface CommonResponse<T> {
  status: string;
  result: T;
}

export interface Memo {
  id: string;
  date: number;
  message: string;
}

export namespace NSMemo {
  export interface Response extends CommonResponse<Memo[]> {}
}
