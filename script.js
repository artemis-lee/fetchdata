const button = document.querySelector("#post");
const comment = document.querySelector("#comment");
const list = document.querySelector("#list");

function loadComments() {
  const savedComments = localStorage.getItem('comments');
  if (savedComments) {
      list.innerHTML = savedComments;
  }
}

function saveComments() {
  localStorage.setItem('comments', list.innerHTML);
}

button.addEventListener('click', () => {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    li.textContent = comment.value;
    deleteButton.textContent = 'Delete';
    li.appendChild(deleteButton);
    list.appendChild(li);

    comment.value = ''; 
    saveComments(); 

}) 

list.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
      const li = event.target.closest('li');
      if (li) {
          li.remove();
          saveComments(); 
      }
  }
}, true); 

loadComments();
