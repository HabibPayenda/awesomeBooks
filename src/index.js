const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add');
const list = document.getElementById('list');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  this.add(title, author) {
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
    const list = listbooks.filter((book) => book.title !== listbooks[id].title);
    localStorage.setItem('books', JSON.stringify(list));
  }
}

const newBook = new Book();

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const titleText = title.value;
  const authorText = author.value;
  newBook.add(titleText, authorText);
  document.location.reload();
});

const listbooks = JSON.parse(localStorage.getItem('books'));

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
    bookCard.style.backgroundColor = '#999';
  }
  removeBtn.addEventListener('click', () => {
    newBook.remove(id);
    document.location.reload();
  });
  const hr = document.createElement('hr');
  const br = document.createElement('br');

  bookCard.append(bookTitle, removeBtn);
  list.append(bookCard);
});