document.addEventListener('change', function(e) {
            if(e.target.classList.contains('modal-assignment-toggle')) {
                const fields = e.target.closest('.border-top').querySelector('.assignment-fields');
                if(e.target.checked) {
                    fields.classList.remove('d-none');
                } else {
                    fields.classList.add('d-none');
                }
            }
        });
