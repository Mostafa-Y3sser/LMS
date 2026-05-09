/* role-switcher.js - Dev Role Switcher Logic */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize role if not set
    if (!localStorage.getItem('lms_role')) {
        localStorage.setItem('lms_role', 'guest');
    }

    const currentRole = localStorage.getItem('lms_role');
    
    // Create Switcher HTML
    const switcherHTML = `
        <div id="role-switcher-panel">
            <div id="role-switcher-menu">
                <div class="fw-bold mb-2 small text-muted px-2">SWITCH ROLE</div>
                <div class="role-option ${currentRole === 'guest' ? 'active' : ''}" data-role="guest" title="Browse courses as a guest">🌐 Guest</div>
                <div class="role-option ${currentRole === 'student' ? 'active' : ''}" data-role="student" title="Access your enrolled courses">🎓 Student</div>
                <div class="role-option ${currentRole === 'assistant' ? 'active' : ''}" data-role="assistant" title="Manage courses and submissions">🛠️ Assistant</div>
                <div class="role-option ${currentRole === 'instructor' ? 'active' : ''}" data-role="instructor" title="Full instructor access">👑 Instructor</div>
            </div>
            <div id="role-switcher-toggle" title="Switch Development Role">
                <i class="bi bi-gear-fill"></i>
            </div>
            <div id="role-switcher-toast" class="role-toast"></div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', switcherHTML);

    const toggle = document.getElementById('role-switcher-toggle');
    const menu = document.getElementById('role-switcher-menu');
    const options = document.querySelectorAll('.role-option');
    const toast = document.getElementById('role-switcher-toast');

    // Toggle menu
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
    });

    // Show toast notification
    function showToast(message, isError = false) {
        toast.textContent = message;
        toast.className = 'role-toast ' + (isError ? 'error' : 'success');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // Validate target page exists
    async function validateTargetPage(targetUrl) {
        try {
            const response = await fetch(targetUrl, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }

    // Determine relative path based on current URL
    function getPrefix() {
        const path = window.location.pathname;
        const isInStudentSubdir = path.includes('/student/');
        const isInAssistantSubdir = path.includes('/assistant/');
        const isInInstructorSubdir = path.includes('/instructor/');
        
        if (isInStudentSubdir || isInAssistantSubdir || isInInstructorSubdir) {
            return '../';
        }
        return './';
    }

    // Get target URL for each role
    function getTargetUrl(role) {
        const prefix = getPrefix();
        
        const roleUrls = {
            'guest': prefix + 'index.html',
            'student': prefix + 'student/dashboard.html',
            'assistant': prefix + 'assistant/dashboard.html',
            'instructor': prefix + 'instructor/dashboard.html'
        };
        
        return roleUrls[role] || prefix + 'index.html';
    }

    // Handle role selection
    options.forEach(option => {
        option.addEventListener('click', async () => {
            const role = option.getAttribute('data-role');
            const targetUrl = getTargetUrl(role);
            
            // Show loading feedback
            menu.classList.remove('active');
            showToast(`Switching to ${role}...`);
            
            // Validate target page exists
            const isValid = await validateTargetPage(targetUrl);
            
            if (!isValid) {
                showToast(`Target page not found: ${targetUrl}`, true);
                console.error('Role switcher: Target page not found:', targetUrl);
                
                // Fallback: try to navigate anyway, or show error
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 1000);
                return;
            }
            
            // Save role to localStorage
            localStorage.setItem('lms_role', role);
            
            // Show success and navigate
            showToast(`Switched to ${role}!`);
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
        }
    });

    // Prevent menu close when clicking inside menu
    menu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Initial UI adjustments based on role
    applyRoleUI(currentRole);
    
    // Log current role for debugging
    console.log('LMS Role Switcher: Current role =', currentRole);
});

function applyRoleUI(role) {
    const allRoleElements = document.querySelectorAll('.instructor-only, .student-only, .guest-only, .assistant-only');

    allRoleElements.forEach(el => {
        let shouldShow = false;
        if (el.classList.contains('instructor-only') && role === 'instructor') shouldShow = true;
        if (el.classList.contains('student-only') && role === 'student') shouldShow = true;
        if (el.classList.contains('guest-only') && role === 'guest') shouldShow = true;
        if (el.classList.contains('assistant-only') && role === 'assistant') shouldShow = true;
        
        el.classList.toggle('d-none', !shouldShow);
    });
}

