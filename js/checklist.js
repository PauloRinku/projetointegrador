// ============================================
// LEIGOSCOOKIE · SISTEMA DE CHECKLIST
// ============================================

class ChecklistManager {
    constructor(receitaId) {
        this.receita = receitas.find(r => r.id === receitaId);
        this.containerIngredientes = document.getElementById('checklistIngredientes');
        this.containerPassos = document.getElementById('checklistPassos');
        this.alertaContainer = document.getElementById('alertaChecklist');
        this.init();
    }
    
    init() {
        this.renderIngredientes();
        this.renderPassos();
        this.setupEventListeners();
    }
    
    renderIngredientes() {
        if (!this.containerIngredientes) return;
        
        this.containerIngredientes.innerHTML = this.receita.ingredientes.map((ing, idx) => `
            <div class="checklist-item ${ing.check ? 'checked' : ''}">
                <input type="checkbox" 
                       id="ing_${idx}" 
                       data-index="${idx}"
                       data-tipo="ingrediente"
                       ${ing.check ? 'checked' : ''}>
                <label for="ing_${idx}">
                    <span class="checklist-item__quantidade">${ing.quantidade}</span>
                    <span class="checklist-item__nome">${ing.nome}</span>
                </label>
            </div>
        `).join('');
    }
    
    renderPassos() {
        if (!this.containerPassos) return;
        
        this.containerPassos.innerHTML = this.receita.passos.map((passo, idx) => `
            <div class="checklist-item checklist-item--passo ${passo.check ? 'checked' : ''}">
                <input type="checkbox" 
                       id="passo_${idx}" 
                       data-index="${idx}"
                       data-tipo="passo"
                       ${passo.check ? 'checked' : ''}>
                <label for="passo_${idx}">
                    <span class="checklist-item__ordem">${passo.ordem}.</span>
                    <span class="checklist-item__texto">${passo.texto}</span>
                    ${passo.timer > 0 ? `<span class="timer-badge" data-tempo="${passo.timer}">⏱️ ${this.formatarTempo(passo.timer)}</span>` : ''}
                </label>
                ${passo.dica ? `<div class="checklist-item__dica">💡 ${passo.dica}</div>` : ''}
            </div>
        `).join('');
    }
    
    formatarTempo(segundos) {
        if (segundos < 60) return `${segundos}s`;
        const min = Math.floor(segundos / 60);
        const sec = segundos % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    }
    
    setupEventListeners() {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const tipo = e.target.dataset.tipo;
                const index = parseInt(e.target.dataset.index);
                this.handleCheck(tipo, index, e.target.checked);
            });
        });
        
        // Botão resetar checklist
        const btnReset = document.getElementById('resetChecklist');
        if (btnReset) {
            btnReset.addEventListener('click', () => this.resetarChecklist());
        }
    }
    
    handleCheck(tipo, index, checked) {
        if (tipo === 'ingrediente') {
            this.receita.ingredientes[index].check = checked;
        } else if (tipo === 'passo') {
            this.validarOrdemPassos(index, checked);
            this.receita.passos[index].check = checked;
        }
        
        salvarProgresso();
        this.verificarConclusao();
    }
    
    validarOrdemPassos(indexPassoAtual, checked) {
        if (!checked) return true;
        
        // Verificar se passos anteriores estão concluídos
        for (let i = 0; i < indexPassoAtual; i++) {
            if (!this.receita.passos[i].check) {
                this.mostrarAlerta(
                    `⚠️ Calma, guerreiro! Você precisa completar o passo ${i + 1} antes: "${this.receita.passos[i].texto}"`,
                    'warning'
                );
                setTimeout(() => {
                    document.getElementById(`passo_${indexPassoAtual}`).checked = false;
                }, 100);
                return false;
            }
        }
        
        return true;
    }
    
    mostrarAlerta(mensagem, tipo = 'warning') {
        if (!this.alertaContainer) return;
        
        this.alertaContainer.innerHTML = `
            <div class="alerta alerta--${tipo}">
                <span class="alerta__emoji">${tipo === 'warning' ? '⚠️' : '✅'}</span>
                <span class="alerta__texto">${mensagem}</span>
            </div>
        `;
        
        setTimeout(() => {
            this.alertaContainer.innerHTML = '';
        }, 5000);
    }
    
    verificarConclusao() {
        const todosIngredientes = this.receita.ingredientes.every(i => i.check);
        const todosPassos = this.receita.passos.every(p => p.check);
        
        if (todosIngredientes && todosPassos) {
            this.mostrarAlerta('🎉 PARABÉNS! Você sobreviveu! Agora é só comer!', 'success');
        }
    }
    
    resetarChecklist() {
        this.receita.ingredientes.forEach(i => i.check = false);
        this.receita.passos.forEach(p => p.check = false);
        salvarProgresso();
        this.renderIngredientes();
        this.renderPassos();
        this.setupEventListeners();
        this.mostrarAlerta('Checklist resetada! Comece do zero.', 'warning');
    }
}

// Inicializar na página de receita
if (window.location.pathname.includes('receitas.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlParams.get('id')) || 1;
        window.checklist = new ChecklistManager(id);
    });
}