// ============================================
// LEIGOSCOOKIE · SISTEMA DE TIMER
// ============================================

class TimerManager {
    constructor() {
        this.timerAtivo = null;
        this.tempoRestante = 0;
        this.intervalId = null;
        this.displayElement = document.getElementById('timerDisplay');
        this.btnIniciar = document.getElementById('timerIniciar');
        this.btnPausar = document.getElementById('timerPausar');
        this.btnResetar = document.getElementById('timerResetar');
        this.init();
    }
    
    init() {
        if (!this.displayElement) return;
        
        this.btnIniciar?.addEventListener('click', () => this.iniciar());
        this.btnPausar?.addEventListener('click', () => this.pausar());
        this.btnResetar?.addEventListener('click', () => this.resetar());
        
        // Delegar clicks nos badges de timer
        document.addEventListener('click', (e) => {
            const timerBadge = e.target.closest('.timer-badge');
            if (timerBadge) {
                const segundos = parseInt(timerBadge.dataset.tempo);
                if (segundos) {
                    this.definirTimer(segundos);
                }
            }
        });
    }
    
    definirTimer(segundos) {
        this.tempoRestante = segundos;
        this.atualizarDisplay();
        
        // Scroll suave até o timer
        this.displayElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Feedback visual
        this.displayElement.style.animation = 'pulse-emergency 0.5s';
        setTimeout(() => {
            this.displayElement.style.animation = '';
        }, 500);
    }
    
    iniciar() {
        if (this.intervalId) return;
        if (this.tempoRestante <= 0) return;
        
        this.intervalId = setInterval(() => {
            this.tempoRestante--;
            this.atualizarDisplay();
            
            if (this.tempoRestante <= 0) {
                this.finalizar();
            }
        }, 1000);
        
        this.btnIniciar.disabled = true;
        this.btnPausar.disabled = false;
    }
    
    pausar() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.btnIniciar.disabled = false;
        this.btnPausar.disabled = true;
    }
    
    resetar() {
        this.pausar();
        this.tempoRestante = 0;
        this.atualizarDisplay();
        this.btnIniciar.disabled = false;
        this.btnPausar.disabled = true;
    }
    
    finalizar() {
        this.pausar();
        this.btnIniciar.disabled = false;
        this.btnPausar.disabled = true;
        
        // Alerta sonoro (beep via Web Audio API)
        this.tocarAlarme();
        
        // Feedback visual
        this.displayElement.style.background = 'var(--color-emergency)';
        setTimeout(() => {
            this.displayElement.style.background = '';
        }, 3000);
        
        alert('⏰ O TIMER ACABOU! Volte para a cozinha!');
    }
    
    tocarAlarme() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Web Audio não suportado');
        }
    }
    
    atualizarDisplay() {
        const minutos = Math.floor(this.tempoRestante / 60);
        const segundos = this.tempoRestante % 60;
        this.displayElement.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }
}

// Inicializar timer global
let timerGlobal = null;
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('timerDisplay')) {
        timerGlobal = new TimerManager();
    }
});