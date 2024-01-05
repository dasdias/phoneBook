'use strict';

{
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

  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const header = createHeader();
    const logo = createLogo(title);
    app.append(header);
  };

  window.phoneBookInit = init;
}