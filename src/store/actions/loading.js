import { loadingType, loadingFinishType } from "../types";

export const loading = () => ({
  type: loadingType
});

export const finishLoading = payload => ({
  type: loadingFinishType,
  payload
});
