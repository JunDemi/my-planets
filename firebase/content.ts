import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './connection';
import { Memo } from '@/types/memo';

const memoRef = collection(db, 'memos');

export const readMemo = async () => {
  const memoQuery = query(memoRef, orderBy('date', 'desc'));
  const result = await getDocs(memoQuery);

  const resultArray: Memo[] = result.docs.map((data) => {
    return { id: data.id, date: data.data().date, message: data.data().message };
  });

  return resultArray;
};

export const createMemo = async (message: string) => {
  //DB추가
  await addDoc(collection(db, 'memos'), {
    message,
    date: Date.now(),
  });
};
