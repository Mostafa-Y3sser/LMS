/* Article Editor Logic */
function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}

document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    if (editor) {
        // Placeholder logic for contenteditable
        editor.addEventListener('focus', function() {
            if (this.textContent.trim() === this.getAttribute('placeholder')) {
                this.textContent = '';
            }
        });
    }

    // Add active state to toolbar buttons (simplified)
    document.querySelectorAll('.toolbar-btn').forEach(btn => {
        btn.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevent focus loss from editor
        });
    });
});
