document.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirect');
            if (redirectUrl) {
                const form = document.querySelector('form');
                if (form) {
                    form.action = redirectUrl;
                }
            }
        });
