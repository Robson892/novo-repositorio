// Animar barras de progresso quando a seção for visível
const progressBars = document.querySelectorAll('.progress-bar[data-width]');
progressBars.forEach(bar => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bar.style.width = bar.getAttribute('data-width') + '%';
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(bar);
});



        // Seu JavaScript com animações e interações
document.addEventListener('mousemove', (e) => {
    const trail = document.querySelector('.cursor-trail');
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
});
        
        // Mais interações e animações



document.addEventListener('DOMContentLoaded', function() {
const themeSwitcher = document.querySelector('.theme-switcher');
const moonIcon = themeSwitcher.querySelector('.fa-moon');

// Verifica se há preferência salva ou usa o tema do sistema
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Aplica o tema inicial
if (savedTheme) {
    document.body.classList.toggle('light-theme', savedTheme === 'light');
} else {
    document.body.classList.toggle('light-theme', !systemPrefersDark);
}

// Atualiza o ícone
updateIcon();

// Função para alternar temas
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateIcon();
}

// Função para atualizar o ícone
function updateIcon() {
    const isLight = document.body.classList.contains('light-theme');
    moonIcon.classList.toggle('fa-moon', !isLight);
    moonIcon.classList.toggle('fa-sun', isLight);
}

// Adiciona o evento de clique
themeSwitcher.addEventListener('click', toggleTheme);
});

document.getElementById('meuFormulario').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const btnSubmit = this.querySelector('button[type="submit"]');
    
    // Feedback visual
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