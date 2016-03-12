const body = document.body;
body.innerHTML = localStorage.getItem('notes') || '';
body.onkeyup = () => localStorage.setItem('notes', body.innerHTML);
