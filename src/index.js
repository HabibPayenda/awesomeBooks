const list = document.getElementById('list');
const main = document.getElementById('main');

const listMenu = document.getElementById('listMenu');
const addNewMenu = document.getElementById('addNewMenu');
const contactMenu = document.getElementById('contactMenu');

let menu = '';

const listbooks = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  add(title, author) {
    this.new = 'new';
    const newBook = { title, author };
    if (localStorage.getItem('books')) {
      let savedBooks = JSON.parse(localStorage.getItem('books'));
      savedBooks = [newBook, ...savedBooks];
      localStorage.setItem('books', JSON.stringify(savedBooks));
    } else {
      localStorage.setItem('books', JSON.stringify([newBook]));
    }
  }

  remove(id) {
    this.new = 'new';
    const list = listbooks.filter((book) => book.title !== listbooks[id].title);
    localStorage.setItem('books', JSON.stringify(list));
  }
}

const newBook = new Book();

const listNavMenu = () => {
  menu = 'list';
  if (listbooks.length <= 0) {
    main.innerHTML = '';
    const noBooks = document.createElement('h1');
    noBooks.innerText = 'Please add some books!';
    main.append(noBooks);
  }
  const allBooks = document.createElement('h1');
  allBooks.innerText = 'All awesome books';
  listbooks.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');
    const bookTitle = document.createElement('p');
    bookTitle.classList.add('bookTitle');
    bookTitle.innerText = `"${book.title}" by ${book.author}`;
    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('bookAuthor');
    bookAuthor.innerText = book.author;
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.innerText = 'Remove';
    const id = listbooks.indexOf(book);
    if (id % 2 === 0) {
      bookCard.style.backgroundColor = '#a4f560';
      bookCard.style.outline = 'solid 3px #daa520';
      removeBtn.style.backgroundColor = '#53c453';
      removeBtn.style.color = '#000';
    } else {
      bookCard.style.backgroundColor = '#53c453';
      bookCard.style.outline = 'solid 3px #daa520';
      bookTitle.style.color = '#000';
      removeBtn.style.backgroundColor = '#a4f560';
    }
    removeBtn.addEventListener('click', () => {
      newBook.remove(id);
      document.location.reload();
    });

    bookCard.append(bookTitle, removeBtn);
    list.append(bookCard);
    main.append(allBooks, list);
    return main;
  });
};

const addMenu = () => {
  const addContainer = document.createElement('div');
  addContainer.classList.add('addNew');
  const addText = document.createElement('h2');
  addText.classList.add('addBook');
  addText.innerText = 'Add a new book';
  const addForm = document.createElement('form');
  addForm.classList.add('addForm');

  const titleInput = document.createElement('input');
  titleInput.classList.add('text');
  titleInput.type = 'text';
  titleInput.placeholder = 'Title';
  titleInput.id = 'title';
  titleInput.required = true;

  const authorInput = document.createElement('input');
  authorInput.classList.add('text');
  authorInput.type = 'text';
  authorInput.placeholder = 'Author';
  authorInput.id = 'author';
  authorInput.required = true;

  const addButton = document.createElement('button');
  addButton.classList.add('button');
  addButton.type = 'button';
  addButton.setAttribute('id', 'add');
  addButton.innerText = 'Add';
  addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const titleText = titleInput.value;
    const authorText = authorInput.value;
    newBook.add(titleText, authorText);
    document.location.reload();
  });
  addForm.append(titleInput, authorInput, addButton);
  addContainer.append(addText, addForm);
  main.appendChild(addContainer);
  return main;
};

const contactNavMenu = () => {
  const contactContainer = document.createElement('div');
  contactContainer.classList.add('contactDiv');
  const contactText = document.createElement('h2');
  contactText.innerText = 'Contact information';
  contactText.classList.add('contactText');
  const contactP1 = document.createElement('p');
  contactP1.innerText = 'Do you have any question or you just want to say "Hello"?';
  const contactP2 = document.createElement('p');
  contactP2.innerText = 'You can reach out to us!';
  contactP2.classList.add('p2');
  const contactUl = document.createElement('ul');
  contactUl.classList.add('contactList');
  const ourEmail = document.createElement('li');
  ourEmail.innerText = 'Our e-mail: info@payenda.af';
  const ourPhone = document.createElement('li');
  ourPhone.innerText = 'Our phone number: +93(0)749665340';
  const ourAdd = document.createElement('li');
  ourAdd.innerText = 'Kabul, Afghanistan';
  contactUl.append(ourEmail, ourPhone, ourAdd);
  contactContainer.append(contactText, contactP1, contactP2, contactUl);
  main.append(contactContainer);
  return main;
};

// eslint-disable-next-line no-constant-condition
if (menu === '' || 'list') {
  if (listbooks.length <= 0) {
    const noBooks = document.createElement('h1');
    noBooks.innerText = 'Please add some books!';
    main.append(noBooks);
  }
  listNavMenu();
}

const changeList = () => {
  main.innerHTML = '';
  list.innerHTML = '';
  menu = 'list';
  listNavMenu();
};

const chnageAdd = () => {
  main.innerHTML = '';
  addMenu();
};

const changeContact = () => {
  main.innerHTML = '';
  contactNavMenu();
};

listMenu.addEventListener('click', () => {
  changeList();
});

addNewMenu.addEventListener('click', () => {
  chnageAdd();
});

contactMenu.addEventListener('click', () => {
  changeContact();
});
