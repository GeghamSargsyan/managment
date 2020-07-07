import { firestore } from "./firebase";

export const fetchDriversInfo = async (adminId, callback) => {
  return await firestore
    .collection("driverInfo")
    .where("admin_id", "==", adminId)
    .onSnapshot(doc => {
      const driversResponse = doc.docs.map(item => {
        return item.data();
      });
      Array.isArray(driversResponse) && callback(driversResponse);
    });
};
