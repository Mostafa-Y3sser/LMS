function toggleEdit() {
        document.getElementById('view-mode').classList.toggle('d-none');
        document.getElementById('edit-mode').classList.toggle('d-none');
        const btn = document.getElementById('editInfoBtn');
        btn.innerHTML = btn.innerHTML.includes('pencil')
            ? '<i class="bi bi-x me-1"></i>Cancel'
            : '<i class="bi bi-pencil me-1"></i>Edit';
    }
    function saveEdit(e) {
        e.preventDefault();
        toggleEdit();
    }
