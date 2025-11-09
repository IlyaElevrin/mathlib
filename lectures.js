// Lectures data (no translations - each lecture stays in its original language)
const lecturesData = [
    {
        title: "-",
        duration: "1h 9min",
        coverImage: "-",
        link: "-",
        description: "-"
    }
];

function renderLectures(lectures = null) {
    const grid = document.getElementById('content-grid');
    grid.innerHTML = '';
    
    const lecturesToRender = lectures || lecturesData;
    
    if (lecturesToRender.length === 0) {
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
    
    lecturesToRender.forEach(lecture => {
        const card = document.createElement('a');
        card.href = lecture.link;
        card.target = '_blank';
        card.className = 'content-card';
        
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${lecture.coverImage}" alt="${lecture.title}" class="card-image">
                <div class="card-overlay">
                    <h3 class="card-title">${lecture.title}</h3>
                    <p class="card-description">${lecture.description}</p>
                </div>
            </div>
            <div class="card-info">
                <div class="card-meta">⏱️ ${lecture.duration}</div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function searchLectures(query) {
    if (!query || query.trim() === '') {
        renderLectures();
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    const filtered = lecturesData.filter(lecture => 
        lecture.title.toLowerCase().includes(lowerQuery) ||
        lecture.description.toLowerCase().includes(lowerQuery)
    );
    
    renderLectures(filtered);
}

// Initialize search
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchLectures(e.target.value);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderLectures();
    initSearch();
    // Ensure page is translated after content is rendered
    translatePage();
});
