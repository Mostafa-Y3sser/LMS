document.getElementById('forgot-form').addEventListener('submit', function(e) {
            e.preventDefault();
            if (this.checkValidity()) {
                document.getElementById('form-state').classList.add('d-none');
                document.getElementById('success-state').classList.remove('d-none');
            }
            this.classList.add('was-validated');
        });
