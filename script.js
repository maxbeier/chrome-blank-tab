let isLocalChange = false;

// Migrate old notes
const oldNotes = localStorage.getItem('notes');
if (oldNotes) {
  chrome.storage.local.set({ notes: oldNotes });
  localStorage.removeItem('notes');
}

// Initialize and Sync Content
chrome.storage.local.get(['notes'], (result) => {
  document.body.innerHTML = result.notes || '';
});

document.body.oninput = () => {
  isLocalChange = true;
  chrome.storage.local.set({ notes: document.body.innerHTML });
};

// Inter Tab Synchronization
chrome.storage.onChanged.addListener((changes) => {
  if (changes.notes && !isLocalChange) {
    document.body.innerHTML = changes.notes.newValue;
  }
  isLocalChange = false;
});

// Key Events
document.onkeydown = (event) => {
  // Change Tab to Spaces
  if (event.key === 'Tab') {
    event.preventDefault();
    const range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode('  '));
  }
  // Save per ⌘ + S
  if (event.metaKey && event.key === 's') {
    event.preventDefault();
    const content = document.documentElement.outerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'notes.html';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }
};
