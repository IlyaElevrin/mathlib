// Articles data (no translations - each article stays in its original language)
const articlesData = [
    {
        title: "-",
        pages: 15,
        coverImage: "-",
        link: "-",
        description: "-"
    }
];

function renderArticles(articles = null) {
    const grid = document.getElementById('content-grid');
    grid.innerHTML = '';
    
    const articlesToRender = articles || articlesData;
    
    if (articlesToRender.length === 0) {
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
    
    articlesToRender.forEach(article => {
        const card = document.createElement('a');
        card.href = article.link;
        card.target = '_blank';
        card.className = 'content-card';
        
        const lang = getCurrentLanguage();
        const pagesText = t('meta.pages');
        
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${article.coverImage}" alt="${article.title}" class="card-image">
                <div class="card-overlay">
                    <h3 class="card-title">${article.title}</h3>
                    <p class="card-description">${article.description}</p>
                </div>
            </div>
            <div class="card-info">
                <div class="card-meta">📄 ${article.pages} ${pagesText}</div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function searchArticles(query) {
    if (!query || query.trim() === '') {
        renderArticles();
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    const filtered = articlesData.filter(article => 
        article.title.toLowerCase().includes(lowerQuery) ||
        article.description.toLowerCase().includes(lowerQuery)
    );
    
    renderArticles(filtered);
}

// Initialize search
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchArticles(e.target.value);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
    initSearch();
    // Ensure page is translated after content is rendered
    translatePage();
});
