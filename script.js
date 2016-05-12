const body = document.body;
body.innerHTML = localStorage.getItem('notes') || '';
body.onkeyup = () => localStorage.setItem('notes', body.innerHTML);

// Inter Tab Synchronization
window.onstorage = (event) => { body.innerHTML = event.newValue; };

// Key Events
document.onkeydown = (event) => {
   // Change Tab to Spaces
   if (event.code === 'Tab') {
      event.preventDefault();
      const spaces = '  ';
      document.execCommand('insertText', false, spaces);
   }

   // Save per ⌘ + S
   if (event.metaKey && event.key === 's') {
      event.preventDefault();
      const link = document.createElement('a');
      link.download = 'notes.html';
      link.href = `data:text/html,<!DOCTYPE html>\n${body.parentElement.outerHTML}`;
      link.click();
   }
};
