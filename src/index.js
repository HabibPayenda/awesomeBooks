const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add');
const list = document.getElementById('list');

const listbooks = JSON.parse(localStorage.getItem('books'));

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

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const titleText = title.value;
  const authorText = author.value;
  newBook.add(titleText, authorText);
  document.location.reload();
});

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

  bookCard.append(bookTitle, removeBtn);
  list.append(bookCard);
});