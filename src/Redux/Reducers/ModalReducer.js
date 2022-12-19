import { MODAL_DELETE, MODAL_RESET } from "../Container/ModalContainer.js";

export const modalDelete = (state = {}, action) => {
  switch (action.type) {
    case MODAL_DELETE:
      return {
        check: action.payload,
        success: true,
      };
    case MODAL_RESET:
      return {};
    default:
      return state;
  }
};
