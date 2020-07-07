import { auth } from "./firebase";

export const fetchLogin = async (login, passeword) =>
  await auth.signInWithEmailAndPassword(login, passeword);
