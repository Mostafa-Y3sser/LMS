/* Settings Page Interactions */
function toggleEdit() {
    const viewMode = document.getElementById('view-mode');
    const editMode = document.getElementById('edit-mode');
    const btn = document.getElementById('editInfoBtn') || document.querySelector('button[onclick="toggleEdit()"]');
    
    if (viewMode && editMode) {
        viewMode.classList.toggle('d-none');
        editMode.classList.toggle('d-none');
        
        if (btn) {
            const isEditing = !editMode.classList.contains('d-none');
            if (isEditing) {
                btn.innerHTML = btn.innerHTML.includes('bi-pencil') 
                    ? btn.innerHTML.replace('bi-pencil', 'bi-x').replace('Edit', 'Cancel')
                    : '<i class="bi bi-x me-1"></i> Cancel';
            } else {
                btn.innerHTML = btn.innerHTML.includes('bi-x')
                    ? btn.innerHTML.replace('bi-x', 'bi-pencil').replace('Cancel', 'Edit')
                    : '<i class="bi bi-pencil me-1"></i> Edit';
            }
        }
    }
}

function saveEdit(e) {
    e.preventDefault();
    // Simulate API call
    alert('Changes saved successfully!');
    toggleEdit();
}

function toggleBioEdit() {
    const viewMode = document.getElementById('bio-view-mode');
    const editMode = document.getElementById('bio-edit-mode');
    const btn = document.querySelector('button[onclick="toggleBioEdit()"]');
    
    if (viewMode && editMode) {
        viewMode.classList.toggle('d-none');
        editMode.classList.toggle('d-none');
        
        if (btn) {
            const isEditing = !editMode.classList.contains('d-none');
            if (isEditing) {
                btn.innerHTML = btn.innerHTML.includes('bi-pencil') 
                    ? btn.innerHTML.replace('bi-pencil', 'bi-x').replace('Edit', 'Cancel')
                    : '<i class="bi bi-x me-1"></i> Cancel';
            } else {
                btn.innerHTML = btn.innerHTML.includes('bi-x')
                    ? btn.innerHTML.replace('bi-x', 'bi-pencil').replace('Cancel', 'Edit')
                    : '<i class="bi bi-pencil me-1"></i> Edit';
            }
        }
    }
}

function saveBioEdit(e) {
    e.preventDefault();
    // Simulate API call
    alert('Biography updated successfully!');
    toggleBioEdit();
}
