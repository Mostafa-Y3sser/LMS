/* Instructor Users Logic */
document.addEventListener('DOMContentLoaded', function() {
    const modalElement = document.getElementById('userDetailsModal');
    if (modalElement) {
        window.userDetailsModal = new bootstrap.Modal(modalElement);
    }
});

function viewUserDetails(name, role, initials, email, assistantId = '', permissions = []) {
    document.getElementById('modal-user-name').textContent = name;
    document.getElementById('modal-user-email').textContent = email;
    document.getElementById('modal-user-avatar').textContent = initials;
    
    const roleBadge = document.getElementById('modal-user-role');
    roleBadge.textContent = role;
    roleBadge.className = `badge badge-role badge-${role.toLowerCase()}`;

    const isAssistant = role.toUpperCase() === 'ASSISTANT';
    const assistantInfo = document.getElementById('assistant-info');
    
    if (assistantInfo) assistantInfo.classList.toggle('d-none', !isAssistant);

    if (isAssistant) {
        const assistantIdEl = document.getElementById('modal-assistant-id');
        if (assistantIdEl) assistantIdEl.textContent = assistantId;
        
        const permContainer = document.getElementById('modal-assistant-permissions');
        if (permContainer) {
            permContainer.innerHTML = permissions.map(p => `
                <span class="badge bg-light text-dark border fw-medium px-3 py-2">
                    <i class="bi bi-shield-check text-success me-1"></i> ${p}
                </span>
            `).join('');
        }
    }
    
    if (window.userDetailsModal) {
        window.userDetailsModal.show();
    }
}
