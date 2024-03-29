import getStorage from '../modules/serviceStorage.js';
import {renderPhoneBook, renderContacts} from '../modules/render.js';
import * as controlData from '../modules/control.js';

const {
  modalControl,
  deleteControl,
  filterControl,
  formControl,
  hoverRow,
} = controlData;


{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title); // в list содержится tbody
    const allRow = renderContacts(list, getStorage('userData'));
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    filterControl(list);
    formControl(form, list, closeModal);
  };
  window.phoneBookInit = init;
}
