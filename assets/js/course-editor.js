/**
 * course-editor.js
 * Handles interactivity for the Create/Edit Course pages.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initCurriculumBuilder();
    initThumbnailUpload();
    initFormActions();
});

/**
 * Tab Navigation Logic
 */
function initTabNavigation() {
    const nextBtns = document.querySelectorAll('.next-tab');
    const prevBtns = document.querySelectorAll('.prev-tab');

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextTabId = btn.getAttribute('data-next');
            const nextTabTrigger = document.querySelector(`[data-bs-target="${nextTabId}"]`);
            if (nextTabTrigger) {
                const tab = new bootstrap.Tab(nextTabTrigger);
                tab.show();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prevTabId = btn.getAttribute('data-prev');
            const prevTabTrigger = document.querySelector(`[data-bs-target="${prevTabId}"]`);
            if (prevTabTrigger) {
                const tab = new bootstrap.Tab(prevTabTrigger);
                tab.show();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

/**
 * Curriculum Builder Logic
 */
function initCurriculumBuilder() {
    const builderContainer = document.getElementById('curriculum-builder');
    const addModuleBtn = document.getElementById('add-module-btn');

    if (!builderContainer || !addModuleBtn) return;

    let moduleCount = builderContainer.querySelectorAll('.card').length;

    addModuleBtn.addEventListener('click', () => {
        moduleCount++;
        const moduleHtml = `
            <div class="card bg-light border-0 p-4 mb-4 animate-fade-in" id="module-${moduleCount}">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="flex-grow-1 me-3">
                        <input type="text" class="form-control fw-bold bg-transparent border-0 p-0 fs-5" value="Module ${moduleCount}: New Module" placeholder="Module Title">
                    </div>
                    <button class="btn btn-outline-danger btn-sm remove-module" data-target="module-${moduleCount}"><i class="bi bi-trash"></i></button>
                </div>
                <div class="list-group shadow-sm mb-3 content-list">
                    <!-- Contents will be added here -->
                </div>
                <button class="btn btn-outline-primary btn-sm w-100 border-dashed add-content-btn"><i class="bi bi-plus-lg"></i> Add Content</button>
            </div>
        `;
        // Insert before the "Add Module" button
        addModuleBtn.insertAdjacentHTML('beforebegin', moduleHtml);
    });

    // Event Delegation for Remove Module and Add Content
    builderContainer.addEventListener('click', (e) => {
        // Remove Module
        if (e.target.closest('.remove-module')) {
            const btn = e.target.closest('.remove-module');
            const targetId = btn.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                if (confirm('Are you sure you want to delete this module and all its contents?')) {
                    targetElement.classList.add('animate-fade-out');
                    setTimeout(() => targetElement.remove(), 300);
                }
            }
        }

        // Add Content
        if (e.target.closest('.add-content-btn')) {
            const btn = e.target.closest('.add-content-btn');
            const contentList = btn.closest('.card').querySelector('.content-list');
            const contentCount = contentList.querySelectorAll('.list-group-item').length + 1;
            const moduleIndex = btn.closest('.card').id.split('-')[1];

            const contentHtml = `
                <div class="list-group-item d-flex align-items-center animate-fade-in">
                    <i class="bi bi-grip-vertical me-2 text-muted"></i>
                    <span class="flex-grow-1">${moduleIndex}.${contentCount} <input type="text" class="form-control d-inline-block w-75 border-0 bg-transparent p-0 ms-1" placeholder="Content title..."></span>
                    <div class="d-flex gap-1">
                        <button class="btn btn-link btn-sm text-muted edit-content"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-link btn-sm text-danger remove-content"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            `;
            contentList.insertAdjacentHTML('beforeend', contentHtml);
        }

        // Remove Content
        if (e.target.closest('.remove-content')) {
            const contentItem = e.target.closest('.list-group-item');
            contentItem.classList.add('animate-fade-out');
            setTimeout(() => contentItem.remove(), 300);
        }
    });

    // Handle Content Type Change
    builderContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('lesson-type-select')) {
            const select = e.target;
            const detailsContainer = select.closest('.card-body');
            const type = select.value;
            
            detailsContainer.querySelector('.video-input-group').classList.add('d-none');
            detailsContainer.querySelector('.article-input-group').classList.add('d-none');
            
            if (type === 'video') detailsContainer.querySelector('.video-input-group').classList.remove('d-none');
            if (type === 'article') detailsContainer.querySelector('.article-input-group').classList.remove('d-none');
        }

        // Handle Module Assignment Toggle
        if (e.target.classList.contains('toggle-assignment')) {
            const checkbox = e.target;
            const details = checkbox.closest('.card').querySelector('.assignment-details');
            if (checkbox.checked) {
                details.classList.remove('d-none');
                details.classList.add('animate-fade-in');
            } else {
                details.classList.add('d-none');
                details.classList.remove('animate-fade-in');
            }
        }
    });
}

/**
 * Thumbnail Upload Simulation
 */
function initThumbnailUpload() {
    const dropzone = document.getElementById('thumbnail-dropzone');
    const input = document.getElementById('thumbnail-input');
    const previewContainer = document.getElementById('thumbnail-preview-container');
    const previewImg = document.getElementById('thumbnail-preview');
    const uploadPrompt = document.getElementById('upload-prompt');

    if (!dropzone || !input) return;

    dropzone.addEventListener('click', () => input.click());

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('border-primary', 'bg-primary-subtle');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('border-primary', 'bg-primary-subtle');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-primary', 'bg-primary-subtle');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    });

    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    });

    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            previewContainer.classList.remove('d-none');
            uploadPrompt.classList.add('d-none');
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Form Actions Logic
 */
function initFormActions() {
    const publishBtn = document.getElementById('btn-publish');
    const finishPublishBtn = document.getElementById('btn-finish-publish');
    const saveDraftBtn = document.getElementById('btn-save-draft');

    const handleAction = (action) => {
        // Collect some basic data to simulate
        const title = document.querySelector('input[placeholder*="Photography"]').value;
        
        if (!title && action !== 'draft') {
            alert('Please enter at least a course title.');
            const basicInfoTab = document.querySelector('[data-bs-target="#basic-info"]');
            new bootstrap.Tab(basicInfoTab).show();
            return;
        }

        const message = action === 'draft' 
            ? 'Course saved as draft successfully!' 
            : 'Course published successfully!';
        
        // Show success alert (simulated)
        alert(message);
        
        // Redirect back to courses list
        window.location.href = 'courses.html';
    };

    if (publishBtn) publishBtn.addEventListener('click', () => handleAction('publish'));
    if (finishPublishBtn) finishPublishBtn.addEventListener('click', () => handleAction('publish'));
    if (saveDraftBtn) saveDraftBtn.addEventListener('click', () => handleAction('draft'));
}
