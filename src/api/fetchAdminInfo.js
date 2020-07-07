import { firestore } from "./firebase";

export const fetchAdminInfo = async adminId =>
  await firestore
    .collection("userinfo")
    .where("admin_id", "==", adminId)
    .get()
    .then(({ docs }) => docs.map(i => i.data())[0]);
