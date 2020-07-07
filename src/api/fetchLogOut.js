import { auth } from "./firebase";

export const fetchLogOut = () => auth.signOut();
