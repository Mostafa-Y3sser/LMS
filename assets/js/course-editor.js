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
<<<<<<< HEAD
                <button class="btn btn-outline-primary btn-sm w-100 border-dashed add-content-btn"><i class="bi bi-plus-lg"></i> Add Content</button>
=======
                <button class="btn btn-outline-primary btn-sm w-100 border-dashed add-lesson-btn mb-3"><i class="bi bi-plus-lg"></i> Add Lesson</button>
                
                <!-- Module Assignment Section -->
                <div class="card card-body bg-white border-0 shadow-sm mt-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="fw-bold mb-0"><i class="bi bi-file-earmark-text text-warning me-2"></i>Module Assignment</h6>
                        <div class="form-check form-switch mb-0">
                            <input class="form-check-input toggle-assignment" type="checkbox" id="hasAssignment-${moduleCount}">
                            <label class="form-check-label small" for="hasAssignment-${moduleCount}">Enable</label>
                        </div>
                    </div>
                    <div class="assignment-details d-none mt-3 pt-3 border-top">
                        <div class="row g-3">
                            <div class="col-md-12">
                                <label class="form-label small fw-bold">Assignment Title</label>
                                <input type="text" class="form-control form-control-sm" placeholder="e.g. Module ${moduleCount} Final Project">
                            </div>
                            <div class="col-md-12">
                                <label class="form-label small fw-bold">Instructions</label>
                                <textarea class="form-control form-control-sm" rows="2" placeholder="Describe the requirements..."></textarea>
                            </div>
                            <div class="col-md-12">
                                <label class="form-label small fw-bold">Attachment File</label>
                                <input type="file" class="form-control form-control-sm">
                            </div>
                        </div>
                    </div>
                </div>
>>>>>>> 9d41510daa60ab3e79d5893be0dd5c7ff2c28e25
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

<<<<<<< HEAD
            const contentHtml = `
                <div class="list-group-item d-flex align-items-center animate-fade-in">
                    <i class="bi bi-grip-vertical me-2 text-muted"></i>
                    <span class="flex-grow-1">${moduleIndex}.${contentCount} <input type="text" class="form-control d-inline-block w-75 border-0 bg-transparent p-0 ms-1" placeholder="Content title..."></span>
                    <div class="d-flex gap-1">
                        <button class="btn btn-link btn-sm text-muted edit-content"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-link btn-sm text-danger remove-content"><i class="bi bi-trash"></i></button>
=======
            const lessonId = `lesson-${moduleIndex}-${lessonCount}`;
            const lessonHtml = `
                <div class="list-group-item flex-column align-items-start animate-fade-in p-3">
                    <div class="d-flex align-items-center w-100">
                        <i class="bi bi-grip-vertical me-2 text-muted"></i>
                        <span class="flex-grow-1 fw-medium">${moduleIndex}.${lessonCount} <input type="text" class="form-control d-inline-block w-75 border-0 bg-transparent p-0 ms-1 fw-medium" placeholder="Lesson title..."></span>
                        <div class="d-flex gap-2">
                            <button class="btn btn-sm btn-light toggle-lesson-details" data-bs-toggle="collapse" data-bs-target="#${lessonId}-details" aria-expanded="false"><i class="bi bi-chevron-down"></i></button>
                            <button class="btn btn-sm btn-light text-danger remove-lesson"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                    
                    <div class="collapse mt-3" id="${lessonId}-details">
                        <div class="card card-body bg-light border-0 p-3">
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="form-label small fw-bold">Content Type</label>
                                    <select class="form-select form-select-sm lesson-type-select">
                                        <option value="video">Video</option>
                                        <option value="article">Article</option>
                                    </select>
                                </div>
                                <div class="col-md-8 video-input-group">
                                    <label class="form-label small fw-bold">Video URL</label>
                                    <input type="text" class="form-control form-control-sm" placeholder="https://youtube.com/...">
                                </div>
                                <div class="col-md-12 article-input-group d-none">
                                    <label class="form-label small fw-bold">Article Content</label>
                                    <div class="border rounded bg-white">
                                        <div class="bg-light border-bottom p-2 d-flex gap-2 flex-wrap">
                                            <div class="btn-group btn-group-sm">
                                                <button type="button" class="btn btn-outline-secondary border-0 text-dark fw-bold">B</button>
                                                <button type="button" class="btn btn-outline-secondary border-0 text-dark fst-italic">I</button>
                                                <button type="button" class="btn btn-outline-secondary border-0 text-dark text-decoration-underline">U</button>
                                            </div>
                                            <div class="btn-group btn-group-sm">
                                                <button type="button" class="btn btn-outline-secondary border-0 text-dark"><i class="bi bi-list-ul"></i></button>
                                                <button type="button" class="btn btn-outline-secondary border-0 text-dark"><i class="bi bi-list-ol"></i></button>
                                            </div>
                                            <div class="btn-group btn-group-sm">
                                                <button type="button" class="btn btn-outline-secondary border-0 text-dark"><i class="bi bi-image"></i></button>
                                                <button type="button" class="btn btn-outline-secondary border-0 text-dark"><i class="bi bi-link-45deg"></i></button>
                                                <button type="button" class="btn btn-outline-secondary border-0 text-dark"><i class="bi bi-code-slash"></i></button>
                                            </div>
                                        </div>
                                        <div class="p-3 editor-content" contenteditable="true" style="min-height: 200px; outline: none;">
                                            <p class="text-muted mb-0">Write your lesson content here...</p>
                                        </div>
                                        <div class="bg-light border-top p-2 d-flex justify-content-between text-muted" style="font-size: 0.75rem;">
                                            <span>Last saved: Just now</span>
                                            <span>Words: 0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label class="form-label small fw-bold">Additional Resources (Optional)</label>
                                    <input type="file" class="form-control form-control-sm" multiple>
                                </div>
                            </div>
                        </div>
>>>>>>> 9d41510daa60ab3e79d5893be0dd5c7ff2c28e25
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
