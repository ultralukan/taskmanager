import { setError, setInfo } from "../slices/errorInfoSlice";

export const errorMiddleware = (store: any) => (next: any) => (action: any) => {
  const { dispatch } = store;

  //проверяем есть ли данные и записываем ошибку или информационное сообщение
  if(action.payload) {
    if(action.error) {
      dispatch(setError(action.payload.data.message));
    }
    else if(action.payload.message) {
      dispatch(setInfo(action.payload.message));
    }
  }

  return next(action);
};