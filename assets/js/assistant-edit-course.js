// Add new module dynamically
        let moduleCount = 2;
        document.getElementById('addModuleBtn').addEventListener('click', function () {
            moduleCount++;
            const builder = document.getElementById('curriculum-builder');
            const tpl = `
                <div class="card border-0 bg-light module-card mb-4 p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-grip-vertical text-muted fs-5"></i>
                            <input type="text" class="form-control form-control-sm fw-bold fs-6 border-0 bg-transparent" value="Module ${moduleCount}: New Module" style="min-width:300px;">
                        </div>
                        <button class="btn btn-outline-danger btn-sm" onclick="this.closest('.card').remove()"><i class="bi bi-trash"></i></button>
                    </div>
                    <div class="list-group shadow-sm mb-3"></div>
                    <button class="btn btn-outline-primary btn-sm border-dashed w-100" data-bs-toggle="modal" data-bs-target="#contentModal">
                        <i class="bi bi-plus-lg me-1"></i> Add Content
                    </button>
                </div>`;
            this.insertAdjacentHTML('beforebegin', tpl);
        });
