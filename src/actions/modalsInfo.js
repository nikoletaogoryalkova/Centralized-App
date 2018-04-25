import { modalsInfo } from './actionTypes';

export function setShowLogin(showLogin) {
  return {
    type: modalsInfo.SET_SHOW_LOGIN,
    showLogin
  };
}

export function openModal(modal) {
  return {
    type: modalsInfo.OPEN_MODAL,
    modal
  };
}

export function closeModal(modal) {
  return {
    type: modalsInfo.CLOSE_MODAL,
    modal
  };
}