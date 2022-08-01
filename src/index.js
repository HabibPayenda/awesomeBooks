const title = document.getElementById('title');
const author = document.getElementById('author');

const addBtn = document.getElementById('add');
const list = document.getElementById('list');



{/* <div class="bookCard">
<p class="bookTitle">Lorem impsum</p>
<p class="bookAuthor">
  Testeroo testyy
</p>
<button class="remove">Remove</button>
<hr>
<br>
</div> */}

class book {
  constructor(title, author) {
    this.title = title, 
    this.author = author
  }
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
 let titleText = title.value;
 let authorText = author.value; 
 const newBook = new book(titleText, authorText);
if(localStorage.getItem('books')) {
  let savedBooks = JSON.parse( localStorage.getItem('books'));
  savedBooks = [ newBook, ...savedBooks]
  localStorage.setItem('books', JSON.stringify(savedBooks));

}else{

  localStorage.setItem('books', JSON.stringify([newBook]));
}
document.location.reload();
});



var listbooks = JSON.parse(localStorage.getItem('books'));
listbooks.forEach(book => {
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
  removeBtn.innerText = 'Remove'
  const hr = document.createElement('hr');
  const br = document.createElement('br');

  bookCard.append(bookTitle, bookAuthor, removeBtn, hr, br);
  list.append(bookCard);
});


