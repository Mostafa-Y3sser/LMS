/* ── Step navigation ── */
    function goStep(idx, btn) {
        document.querySelectorAll('.tab-step').forEach((s,i) => s.classList.toggle('active', i===idx));
        document.querySelectorAll('.step-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    /* ── Description editor toolbar ── */
    function fmt(cmd, val) { document.getElementById('desc-editor').focus(); document.execCommand(cmd, false, val||null); }
    function fmt2(cmd, val) { document.getElementById('text-editor').focus(); document.execCommand(cmd, false, val||null); }

    /* ── Thumbnail preview ── */
    function previewThumb(input) {
        const file = input.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        document.getElementById('thumb-prompt').classList.add('d-none');
        const img = document.getElementById('thumb-preview');
        img.src = url; img.classList.remove('d-none');
    }

    /* ── Add Module ── */
    let modCount = 2;
    document.getElementById('add-module-btn').addEventListener('click', () => {
        const id = 'module-' + modCount;
        const listId = 'content-list-' + modCount;
        const div = document.createElement('div');
        div.className = 'module-card'; div.id = id;
        div.innerHTML = `
            <div class="d-flex align-items-center gap-2 mb-3">
                <i class="bi bi-grip-vertical text-muted"></i>
                <input type="text" class="form-control form-control-sm fw-semibold" value="Module ${modCount}: New Module" style="max-width:320px">
                <button class="btn btn-light btn-sm ms-auto text-danger" onclick="this.closest('.module-card').remove()"><i class="bi bi-trash"></i></button>
            </div>
            <div class="content-list mb-3" id="${listId}"></div>
            <button class="btn btn-light btn-sm w-100" style="border-style:dashed" onclick="openContentModal('${listId}')">
                <i class="bi bi-plus-lg me-1"></i> Add Content
            </button>`;
        document.getElementById('curriculum-builder').insertBefore(div, document.getElementById('add-module-btn'));
        modCount++;
    });

    /* ── Content Modal ── */
    let activeListId = null;
    let currentType = null;
    const modal = new bootstrap.Modal(document.getElementById('contentModal'));

    function openContentModal(listId) {
        activeListId = listId;
        backToPicker();
        modal.show();
    }

    function selectType(type) {
        if (type === 'text') {
            window.location.href = 'create-article.html';
            return;
        }
        currentType = type;
        document.getElementById('type-picker').classList.add('d-none');
        document.getElementById('form-video').classList.toggle('d-none', type !== 'video');
        document.getElementById('form-link').classList.toggle('d-none', type !== 'link');
        document.getElementById('form-text').classList.toggle('d-none', type !== 'text');
        document.getElementById('modal-footer').style.display = 'flex';
        document.getElementById('modal-footer-type').style.display = 'none';
        // Highlight card
        document.querySelectorAll('.content-type-card').forEach(c => c.classList.remove('selected'));
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('selected');
        }
    }

    function backToPicker() {
        currentType = null;
        document.getElementById('type-picker').classList.remove('d-none');
        document.getElementById('form-video').classList.add('d-none');
        document.getElementById('form-link').classList.add('d-none');
        document.getElementById('form-text').classList.add('d-none');
        document.getElementById('modal-footer').style.display = 'none';
        document.getElementById('modal-footer-type').style.display = 'flex';
    }

    document.getElementById('btn-add-content').addEventListener('click', () => {
        if (!currentType || !activeListId) return;
        let title = '', badge = '', badgeClass = '';
        if (currentType === 'video') {
            title = document.getElementById('video-title').value || 'Video Content';
            badge = 'VIDEO'; badgeClass = 'badge-video';
            // Reset file input UI
            if (document.getElementById('video-file')) {
                document.getElementById('video-file').value = '';
                document.getElementById('video-file-name').textContent = 'Click to upload or drag and drop';
                document.getElementById('video-title').value = '';
            }
        } else if (currentType === 'link') {
            title = document.getElementById('link-title').value || 'Resource Link';
            badge = 'LINK'; badgeClass = 'badge-link';
        } else {
            title = document.getElementById('text-title').value || 'Text Content';
            badge = 'TEXT'; badgeClass = 'badge-text';
        }
        const list = document.getElementById(activeListId);
        const item = document.createElement('div');
        item.className = 'builder-item';
        item.innerHTML = `
            <i class="bi bi-grip-vertical text-muted" style="font-size:12px"></i>
            <span class="content-type-badge ${badgeClass}">${badge}</span>
            <span style="font-size:14px;flex:1">${title}</span>
            <button class="btn btn-light btn-sm"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-light btn-sm text-danger" onclick="this.closest('.content-item').remove()"><i class="bi bi-trash"></i></button>`;
        list.appendChild(item);
        modal.hide();
        backToPicker();
    });
    /* ── URL Parameter Navigation ── */
    document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        const step = params.get('step');
        if (step !== null) {
            const stepIdx = parseInt(step);
            const stepBtns = document.querySelectorAll('.step-btn');
            if (stepBtns[stepIdx]) {
                goStep(stepIdx, stepBtns[stepIdx]);
            }
        }
    });

    function updateVideoFileName(input) {
        const fileName = input.files[0] ? input.files[0].name : 'Click to upload or drag and drop';
        const el = document.getElementById('video-file-name');
        if (el) el.textContent = fileName;
    }

    // Assignment logic
    let currentAssignmentListId = null;

    function openAssignmentModal(listId) {
        currentAssignmentListId = listId;
        const modal = new bootstrap.Modal(document.getElementById('assignmentModal'));
        modal.show();
    }

    function addAssignment() {
        if (!currentAssignmentListId) return;
        
        const title = document.getElementById('assignment-title').value || 'New Assignment';
        const list = document.getElementById(currentAssignmentListId);
        
        const item = document.createElement('div');
        item.className = 'builder-item';
        item.innerHTML = `
            <i class="bi bi-grip-vertical text-muted" style="font-size:12px"></i>
            <span class="content-type-badge badge-assignment">ASSIGNMENT</span>
            <span style="font-size:14px;flex:1">${title}</span>
            <button class="btn btn-light btn-sm"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-light btn-sm text-danger" onclick="this.closest('.builder-item').remove()"><i class="bi bi-trash"></i></button>
        `;
        list.appendChild(item);
        
        // Reset and hide
        document.getElementById('assignment-title').value = '';
        bootstrap.Modal.getInstance(document.getElementById('assignmentModal')).hide();
    }
