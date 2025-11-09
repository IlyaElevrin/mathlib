// Массив математических формул для фона
const formulas = [
    '$$E = mc^2$$',
    '$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$',
    '$$\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}$$',
    '$$e^{i\\pi} + 1 = 0$$',
    '$$\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}$$',
    '$$\\int_0^{2\\pi} \\sin^2(x) dx = \\pi$$',
    '$$\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e$$',
    '$$\\frac{d}{dx}\\left(\\int_a^x f(t) dt\\right) = f(x)$$',
    '$$\\sum_{k=0}^{n} \\binom{n}{k} = 2^n$$',
    '$$\\int_0^1 x^{n-1}(1-x)^{m-1} dx = \\frac{\\Gamma(n)\\Gamma(m)}{\\Gamma(n+m)}$$',
    '$$\\nabla \\cdot \\mathbf{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y} + \\frac{\\partial F_z}{\\partial z}$$',
    '$$\\sin(A+B) = \\sin A \\cos B + \\cos A \\sin B$$',
    '$$\\cos(A+B) = \\cos A \\cos B - \\sin A \\sin B$$',
    '$$\\int e^x dx = e^x + C$$',
    '$$\\frac{d}{dx}(\\ln x) = \\frac{1}{x}$$',
    '$$\\int_0^\\infty e^{-x} x^{n-1} dx = \\Gamma(n)$$'
];

window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    }
};

function initFormulasBackground() {
    const container = document.getElementById('formulas-background');
    const numFormulas = 15;
    
    // Выбираем случайные формулы
    const selectedFormulas = [];
    for (let i = 0; i < numFormulas; i++) {
        const randomIndex = Math.floor(Math.random() * formulas.length);
        selectedFormulas.push(formulas[randomIndex]);
    }
    
    selectedFormulas.forEach((formula, index) => {
        setTimeout(() => {
            const formulaElement = document.createElement('div');
            formulaElement.className = 'formula-item';
            formulaElement.innerHTML = formula;
            
            // Случайная позиция
            const x = Math.random() * 85;
            const y = Math.random() * 85;
            const delay = Math.random() * 20;
            const duration = 15 + Math.random() * 10;
            
            formulaElement.style.left = x + '%';
            formulaElement.style.top = y + '%';
            formulaElement.style.animationDelay = delay + 's';
            formulaElement.style.animationDuration = duration + 's';
            
            container.appendChild(formulaElement);
            
            // Рендеринг MathJax для этого элемента после загрузки MathJax
            if (window.MathJax && window.MathJax.typesetPromise) {
                MathJax.typesetPromise([formulaElement]).catch(function (err) {
                    console.log('MathJax rendering error:', err);
                });
            }
        }, index * 300);
    });
}

// Ожидаем загрузки MathJax
window.addEventListener('load', function() {
    if (window.MathJax && window.MathJax.startup) {
        window.MathJax.startup.promise.then(function() {
            initFormulasBackground();
        });
    } else {
        // Fallback: если MathJax еще не загружен, ждем еще немного
        setTimeout(function() {
            if (window.MathJax && window.MathJax.startup) {
                window.MathJax.startup.promise.then(function() {
                    initFormulasBackground();
                });
            } else {
                initFormulasBackground();
            }
        }, 1000);
    }
});

