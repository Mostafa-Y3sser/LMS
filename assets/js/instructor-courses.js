/* Instructor Courses Logic */
document.addEventListener('DOMContentLoaded', function() {
    const modalEl = document.getElementById('deleteConfirmModal');
    if (modalEl) {
        window.deleteModal = new bootstrap.Modal(modalEl);
    }
});

let courseToDelete = '';

function confirmDeleteCourse(courseName) {
    courseToDelete = courseName;
    const nameEl = document.getElementById('courseNameToDelete');
    if (nameEl) nameEl.textContent = courseName;
    if (window.deleteModal) window.deleteModal.show();
}

function deleteCourse() {
    // Logic to delete course
    console.log('Deleting course:', courseToDelete);
    if (window.deleteModal) window.deleteModal.hide();
    // In a real app, you would remove the element or refresh the list
}
