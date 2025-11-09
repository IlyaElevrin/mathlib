// Books data (no translations - each book stays in its original language)
const booksData = [
    {
        title: "-",
        pages: 450,
        coverImage: "-",
        link: "-",
        description: "-"
    }
];

function renderBooks(books = null) {
    const grid = document.getElementById('content-grid');
    grid.innerHTML = '';
    
    const booksToRender = books || booksData;
    
    if (booksToRender.length === 0) {
        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.style.display = 'block';
        }
        return;
    }
    
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = 'none';
    }
    
    booksToRender.forEach(book => {
        const card = document.createElement('a');
        card.href = book.link;
        card.target = '_blank';
        card.className = 'content-card';
        
        const lang = getCurrentLanguage();
        const pagesText = t('meta.pages');
        
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${book.coverImage}" alt="${book.title}" class="card-image">
                <div class="card-overlay">
                    <h3 class="card-title">${book.title}</h3>
                    <p class="card-description">${book.description}</p>
                </div>
            </div>
            <div class="card-info">
                <div class="card-meta">📚 ${book.pages} ${pagesText}</div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function searchBooks(query) {
    if (!query || query.trim() === '') {
        renderBooks();
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    const filtered = booksData.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) ||
        book.description.toLowerCase().includes(lowerQuery)
    );
    
    renderBooks(filtered);
}

// Initialize search
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchBooks(e.target.value);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
    initSearch();
    // Ensure page is translated after content is rendered
    translatePage();
});
