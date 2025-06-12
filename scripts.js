// -------------------- BARRAS DE PROGRESSO --------------------
const progressBars = document.querySelectorAll('.progress-bar[data-width]');
if (progressBars.length) {
    progressBars.forEach(bar => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = bar.getAttribute('data-width') + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(bar);
    });
}

// -------------------- EFEITO DE RASTRO DO CURSOR --------------------
document.addEventListener('mousemove', (e) => {
    const trail = document.querySelector('.cursor-trail');
    if (trail) {
        trail.style.left = `${e.pageX}px`;
        trail.style.top = `${e.pageY}px`;
    }
});

// -------------------- ALTERNAÇÃO DE TEMA (LIGHT / DARK) --------------------
document.addEventListener('DOMContentLoaded', function () {
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (!themeSwitcher) return;

    const moonIcon = themeSwitcher.querySelector('.fa-moon, .fa-sun');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.body.classList.toggle('light-theme', savedTheme === 'light');
    } else {
        document.body.classList.toggle('light-theme', !systemPrefersDark);
    }

    updateIcon();

    themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateIcon();
    });

    function updateIcon() {
        const isLight = document.body.classList.contains('light-theme');
        moonIcon?.classList.toggle('fa-moon', !isLight);
        moonIcon?.classList.toggle('fa-sun', isLight);
    }
});

// -------------------- FORMULÁRIO DE CONTATO --------------------
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('meuFormulario');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const btnSubmit = this.querySelector('button[type="submit"]');
        
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Enviando...';

        fetch('https://api.seuservidor.com/contato', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) throw new Error('Erro na rede');
                return response.json();
            })
            .then(data => {
                alert('Mensagem enviada com sucesso!');
                this.reset();
            })
            .catch(error => {
                alert('Erro ao enviar: ' + error.message);
            })
            .finally(() => {
                btnSubmit.disabled = false;
                btnSubmit.textContent = 'Enviar Mensagem';
            });
    });
});

// -------------------- MENU HAMBÚRGUER --------------------
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('nav-links');
        nav.classList.remove('active'); // Fecha o menu após clicar
    });
});
