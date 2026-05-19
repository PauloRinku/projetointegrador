// ============================================
// LEIGOSCOOKIE · MAIN APPLICATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== MENU MOBILE =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // ===== CONVERSOR DE LEIGO PARA HUMANO =====
    const termoInput = document.getElementById('termoInput');
    const btnBuscar = document.getElementById('buscarTermo');
    const resultadoDiv = document.getElementById('resultadoConversor');
    
    function buscarTermo(termo) {
        const termoNormalizado = termo.toLowerCase().trim();
        const encontrado = glossario[termoNormalizado];
        
        if (resultadoDiv) {
            if (encontrado) {
                resultadoDiv.innerHTML = `
                    <div class="converter__result-item">
                        <h3>${encontrado.termo}</h3>
                        <p class="converter__result-explicacao">${encontrado.explicacao}</p>
                        <span class="badge badge--small">Nível: ${encontrado.nivelDificuldade}</span>
                    </div>
                `;
                resultadoDiv.classList.remove('hidden');
            } else {
                resultadoDiv.innerHTML = `
                    <div class="converter__result-item">
                        <p>❓ Termo não encontrado. Tente: "uma pitada", "refogar", "fogo baixo".</p>
                    </div>
                `;
                resultadoDiv.classList.remove('hidden');
            }
        }
    }
    
    if (btnBuscar && termoInput) {
        btnBuscar.addEventListener('click', () => {
            buscarTermo(termoInput.value);
        });
        
        termoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                buscarTermo(termoInput.value);
            }
        });
    }
    
    // Chips do conversor
    document.querySelectorAll('.converter__chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const termo = chip.dataset.termo;
            if (termoInput) termoInput.value = termo;
            buscarTermo(termo);
        });
    });
    
    // ===== RECEITA DESTAQUE (Home) =====
    const receitaDestaque = document.getElementById('receitaDestaque');
    if (receitaDestaque) {
        const receitaDoDia = receitas[0];
        receitaDestaque.innerHTML = `
            <div class="recipe-preview__content">
                <h3 class="recipe-preview__title">${receitaDoDia.nome}</h3>
                <p class="recipe-preview__desc">${receitaDoDia.descricao}</p>
                <div class="recipe-preview__meta">
                    <span class="meta-item">⏱️ ${receitaDoDia.tempoPreparo} min</span>
                    <span class="meta-item">🍽️ ${receitaDoDia.rendimento}</span>
                    <span class="meta-item">📊 ${receitaDoDia.dificuldade}</span>
                </div>
                <div class="recipe-preview__ingredientes">
                    <strong>Você vai precisar de:</strong>
                    <span>${receitaDoDia.ingredientes.map(i => i.nome).join(' · ')}</span>
                </div>
            </div>
        `;
    }
    
    // ===== LIMPAR HISTÓRICO (Footer) =====
    const btnLimpar = document.getElementById('limparHistorico');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Resetar todo o progresso? Isso vai desmarcar todas as checklists.')) {
                localStorage.clear();
                carregarProgresso();
                alert('Histórico limpo! Comece do zero.');
                location.reload();
            }
        });
    }
    
    // ===== MODO PÂNICO (Query Param) =====
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('modo') === 'panico') {
        document.body.classList.add('modo-panico');
        // Mostrar receitas mais fáceis primeiro
    }
    
    // ===== ESTILOS ADICIONAIS PARA CHECKLIST =====
    const style = document.createElement('style');
    style.textContent = `
        .checklist-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem;
            background: var(--color-surface);
            border: var(--border-medium);
            margin-bottom: 0.75rem;
        }
        
        .checklist-item.checked {
            opacity: 0.7;
            background: var(--color-secondary);
        }
        
        .checklist-item.checked label {
            text-decoration: line-through;
        }
        
        .checklist-item input[type="checkbox"] {
            margin-top: 0.25rem;
        }
        
        .checklist-item label {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        
        .checklist-item__quantidade {
            font-weight: 700;
            color: var(--color-primary-dark);
        }
        
        .checklist-item__dica {
            font-size: 0.9rem;
            color: var(--color-text-light);
            margin-top: 0.5rem;
            padding: 0.5rem;
            background: #FFF3E0;
            border-left: 4px solid var(--color-emergency);
        }
        
        .timer-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background: var(--color-primary);
            border: var(--border-medium);
            cursor: pointer;
            font-weight: 600;
        }
        
        .timer-badge:hover {
            background: var(--color-primary-dark);
        }
        
        .alerta {
            padding: 1rem 1.5rem;
            border: var(--border-thick);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideDown 0.3s ease;
        }
        
        .alerta--warning {
            background: var(--color-emergency);
            border-color: var(--color-emergency-dark);
        }
        
        .alerta--success {
            background: #A8E6CF;
            border-color: #2D6A4F;
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .modo-panico {
            background: #FFF5F0;
        }
        
        .modo-panico .header {
            background: var(--color-emergency);
        }
    `;
    document.head.appendChild(style);
});

// ===== FUNÇÕES GLOBAIS =====
function formatarTempo(segundos) {
    if (segundos < 60) return `${segundos}s`;
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
}