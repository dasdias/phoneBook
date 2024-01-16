'use strict';

// const data = [
//   {
//     name: 'Иван',
//     surname: 'Петров',
//     phone: '+79514545454',
//   },
//   {
//     name: 'Григорий',
//     surname: 'Дмитриев',
//     phone: '+79999999999',
//   },
//   {
//     name: 'Игорь',
//     surname: 'Семёнов',
//     phone: '+79999999999',
//   },
//   {
//     name: 'Семён',
//     surname: 'Иванов',
//     phone: '+79800252525',
//   },
//   {
//     name: 'Мария',
//     surname: 'Попова',
//     phone: '+79876543210',
//   },
//   {
//     name: 'Валентин',
//     surname: 'Абрамов',
//     phone: '+79876543210',
//   },
//   {
//     name: 'Александр',
//     surname: 'Шилов',
//     phone: '+79876545654',
//   },
// ];

{
  const getStorage = (key) => {
    const dataStorage = JSON.parse(localStorage.getItem(key)) ?
      JSON.parse(localStorage.getItem(key)) : [];
    return dataStorage;
  };

  const setStorage = (key, obj) => {
    let storageData = [];
    if (getStorage(key).length !== 0) {
      storageData = [...getStorage(key), obj];
      localStorage.setItem(key, JSON.stringify(storageData));
    } else {
      storageData.push(obj);
      localStorage.setItem(key, JSON.stringify(storageData));
    }
  };

  const removeStorage = (phoneNum) => {
    const store = getStorage('userData');
    if (store.length !== 0) {
      const newMass = store.filter((item) => item.phone !== phoneNum);
      localStorage.removeItem('userData');
      localStorage.setItem('userData', JSON.stringify(newMass));
    }
    return;
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };
  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;
    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;
    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');
    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.className = className;
      button.textContent = text;

      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th class="delete">Удалить</th>
      <th>Имя</th>
      <th>Фамилия</th>
      <th>Телефон</th>
      <th></th>
    </tr>
    `);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" id="name" name="name" 
          type="text" required/>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" id="surname" name="surname" 
          type="text" required/>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" id="phone" name="phone" 
          type="number" required/>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createCopyRight = (title) => {
    const div = document.createElement('div');
    div.innerHTML = `Все права защищены &copy;${title}`;
    return div;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const headerContainer = createContainer();
    footer.append(headerContainer);

    footer.headerContainer = headerContainer;
    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);

    const table = createTable();
    const {form, overlay} = createForm();
    const copyRight = createCopyRight(title);
    const footer = createFooter();

    header.headerContainer.append(logo);
    footer.headerContainer.append(copyRight);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    const buttonDel = document.createElement('button');
    tdDel.classList.add('delete');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);
    const tdName = document.createElement('td');
    tdName.classList.add('table_name');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.classList.add('table_surname');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');
    buttonEdit.innerHTML = '&#9998;';
    tdEdit.append(buttonEdit);
    buttonEdit.classList.add('btn', 'btn-info');

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
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
