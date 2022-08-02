const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add');
const list = document.getElementById('list');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const titleText = title.value;
  const authorText = author.value;

  const newBook = new Book(titleText, authorText);
  if (localStorage.getItem('books')) {
    let savedBooks = JSON.parse(localStorage.getItem('books'));
    savedBooks = [newBook, ...savedBooks];
    localStorage.setItem('books', JSON.stringify(savedBooks));
  } else {
    localStorage.setItem('books', JSON.stringify([newBook]));
  }
  document.location.reload();
});

const listbooks = JSON.parse(localStorage.getItem('books'));

const removeTheBook = (id) => {
  const list = listbooks.filter((book) => book.title !== listbooks[id].title);
  localStorage.setItem('books', JSON.stringify(list));
  document.location.reload();
};

listbooks.forEach((book) => {
  const bookCard = document.createElement('div');
  bookCard.classList.add('bookCard');
  const bookTitle = document.createElement('p');
  bookTitle.classList.add('bookTitle');
  bookTitle.innerText = book.title;
  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('bookAuthor');
  bookAuthor.innerText = book.author;
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove');
  removeBtn.innerText = 'Remove';
  const id = listbooks.indexOf(book);
  removeBtn.addEventListener('click', () => {
    removeTheBook(id);
  });
  const hr = document.createElement('hr');
  const br = document.createElement('br');

  bookCard.append(bookTitle, bookAuthor, removeBtn, hr, br);
  list.append(bookCard);
});