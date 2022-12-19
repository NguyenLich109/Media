import { MODAL_DELETE } from "../Container/ModalContainer";
export const deleteModal = (data) => {
  return {
    type: MODAL_DELETE,
    payload: data,
  };
};
