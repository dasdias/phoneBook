'use strict';

const {
  renderContacts,
} = require('./render');

const {
  getStorage,
  setStorage,
  removeStorage,
} = require('./serviceStorage');

const {
  createRow,
} = require('./createElements');

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };
  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === formOverlay || target.closest('.close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', (e) => {
    const elemStorage = getStorage('userData');
    const target = e.target;
    if (target.closest('.del-icon')) {
      if (elemStorage.length === 1) {
        document.querySelectorAll('.delete').forEach(del => {
          del.classList.remove('is-visible');
        });
      }
      const parent = target.closest('.contact');
      const phoneNum = parent?.querySelector('a[href^="tel:"]');
      removeStorage(phoneNum.textContent);
      parent.remove();
    }
  });
};

const filterControl = (list) => {
  list.addEventListener('click', (e) => {
    const data = getStorage('userData');
    const isVisible = [...document.querySelectorAll('.is-visible')];
    if (isVisible.length !== 0) {
      return;
    }
    const target = e.target;
    const sortName = (x, y) => {
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    };

    if (target.closest('.table_name')) {
      const sotrElem = data.sort((x, y) => sortName(x.name, y.name));
      list.textContent = '';
      renderContacts(list, sotrElem);
    }
    if (target.closest('.table_surname')) {
      const sotrElem = data.sort((x, y) => sortName(x.surname, y.surname));
      list.textContent = '';
      renderContacts(list, sotrElem);
    }
  });
};

const addContactPage = (сontact, list) => {
  list.append(createRow(сontact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list);
    setStorage('userData', newContact);
    form.reset();
    closeModal();
  });
};

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};


module.exports = {
  modalControl,
  deleteControl,
  filterControl,
  addContactPage,
  formControl,
  hoverRow,
};
