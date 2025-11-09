// Internationalization support
const translations = {
    en: {
        nav: {
            home: "Home",
            books: "Books",
            lectures: "Lectures",
            articles: "Articles"
        },
        home: {
            title: "MathLib",
            subtitle: "Mathematical Materials Library"
        },
        pages: {
            books: "Books",
            lectures: "Lectures",
            articles: "Articles"
        },
        meta: {
            pages: "pages",
            duration: "duration"
        },
        search: {
            placeholder: "Search...",
            noResults: "No results found"
        }
    },
    de: {
        nav: {
            home: "Startseite",
            books: "Bücher",
            lectures: "Vorlesungen",
            articles: "Artikel"
        },
        home: {
            title: "MathLib",
            subtitle: "Bibliothek für mathematische Materialien"
        },
        pages: {
            books: "Bücher",
            lectures: "Vorlesungen",
            articles: "Artikel"
        },
        meta: {
            pages: "Seiten",
            duration: "Dauer"
        },
        search: {
            placeholder: "Suchen...",
            noResults: "Keine Ergebnisse gefunden"
        }
    },
    ru: {
        nav: {
            home: "Главная",
            books: "Книги",
            lectures: "Лекции",
            articles: "Статьи"
        },
        home: {
            title: "MathLib",
            subtitle: "Библиотека математических материалов"
        },
        pages: {
            books: "Книги",
            lectures: "Лекции",
            articles: "Статьи"
        },
        meta: {
            pages: "страниц",
            duration: "длительность"
        },
        search: {
            placeholder: "Поиск...",
            noResults: "Результаты не найдены"
        }
    }
};

// Get current language from localStorage or default to English
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// Set language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
    translatePage();
}

// Get translation
function t(key) {
    const lang = getCurrentLanguage();
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        value = value?.[k];
    }
    
    return value || key;
}

// Toggle language dropdown
function toggleLangDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('lang-dropdown');
    const button = document.querySelector('.lang-dropdown-btn');
    
    if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// Update language dropdown display
function updateLanguageDropdown() {
    const lang = getCurrentLanguage();
    const langText = document.querySelector('.lang-text');
    if (langText) {
        const langNames = { en: 'EN', de: 'DE', ru: 'RU' };
        langText.textContent = langNames[lang] || 'EN';
    }
}

// Initialize language dropdown and translate page on load
document.addEventListener('DOMContentLoaded', function() {
    translatePage();
});

// Listen for language changes in other tabs/windows
window.addEventListener('storage', function(e) {
    if (e.key === 'language') {
        translatePage();
    }
});

// Translate page content
function translatePage() {
    const lang = getCurrentLanguage();
    
    // Set HTML lang attribute
    document.documentElement.lang = lang;
    
    // Translate navigation
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
    
    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Update language dropdown
    updateLanguageDropdown();
    
    // Update meta text in cards (pages, duration) if functions exist
    if (typeof renderBooks === 'function') {
        const searchInput = document.getElementById('search-input');
        const query = searchInput ? searchInput.value : '';
        if (query) {
            searchBooks(query);
        } else {
            renderBooks();
        }
    }
    
    if (typeof renderLectures === 'function') {
        // No need to re-render, duration stays the same
    }
    
    if (typeof renderArticles === 'function') {
        const searchInput = document.getElementById('search-input');
        const query = searchInput ? searchInput.value : '';
        if (query) {
            searchArticles(query);
        } else {
            renderArticles();
        }
    }
}

