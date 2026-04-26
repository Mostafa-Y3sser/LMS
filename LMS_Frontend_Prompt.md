# LMS Frontend Implementation Prompt
> Full detailed prompt for building the LMS frontend using HTML, CSS, JavaScript, and Bootstrap 5

---

## 🎯 Project Overview

You are building the **complete frontend** for a **Learning Management System (LMS)** using **HTML, CSS, JavaScript, and Bootstrap 5**. The project will later be integrated into an **ASP.NET MVC project**, so all pages must follow MVC-friendly conventions (no frameworks like React/Vue). All pages must be **static HTML files** for now with **placeholder data**.

---

## 🏗️ Technical Stack

| Technology | Usage |
|---|---|
| **HTML5** | Page structure |
| **CSS3** | Custom styling |
| **Bootstrap 5** | Layout, components, responsiveness |
| **Vanilla JavaScript** | Interactivity, DOM manipulation, role switching |
| **Bootstrap Icons / Font Awesome** | Icons |
| **Google Fonts** | Typography |

---

## 🎨 Design Requirements

### General Style:
- **Modern, clean, professional** design
- **Consistent color palette** across all pages — suggest: deep blue primary, white background, light gray sections, accent color for CTAs
- **Fully responsive** — mobile, tablet, desktop
- **Smooth transitions and hover effects** on interactive elements
- **No page should look empty** — always use realistic placeholder content

### Typography:
- Use **Google Fonts** — suggest: `Inter` or `Poppins` for body, `Nunito` for headings
- Clear hierarchy: H1 → H2 → H3 → body text → captions

### Spacing:
- Consistent padding and margin using Bootstrap spacing utilities
- Cards should have proper padding, shadows, and border-radius

---

## 🏛️ LAYOUT ARCHITECTURE (Most Important)

### There is ONE master layout for the entire project with TWO layout modes:

---

### Layout Mode 1 — Public Layout (Guest)
Used for: Landing, Browse Courses, Course Detail, Login, Register, Forgot Password

**Structure:**
```
┌─────────────────────────────────┐
│         TOP NAVBAR              │
│  Logo | Courses | Login | Signup│
├─────────────────────────────────┤
│                                 │
│         PAGE CONTENT            │
│                                 │
├─────────────────────────────────┤
│            FOOTER               │
└─────────────────────────────────┘
```

**Navbar contains:**
- Logo (left)
- "Browse Courses" link (center/left)
- Login button (outline) + Register button (filled) — right side
- Fully responsive with hamburger menu on mobile

**Footer contains:**
- Logo + short tagline
- Quick links column
- Contact info column
- Social media icons
- Copyright line

---

### Layout Mode 2 — Dashboard Layout (Student / Assistant / Admin)
Used for: All authenticated pages

**Structure:**
```
┌──────────┬──────────────────────────┐
│          │      TOP HEADER          │
│          ├──────────────────────────┤
│ SIDEBAR  │                          │
│          │      PAGE CONTENT        │
│          │                          │
│          │                          │
└──────────┴──────────────────────────┘
```

**Sidebar contains (role-based — see below)**

**Top Header contains:**
- Hamburger toggle (mobile)
- Page title / breadcrumb
- Notification bell with badge count
- User avatar + dropdown (Profile, Logout)

---

## 👤 ROLE-BASED SIDEBAR NAVIGATION

### The sidebar changes based on the logged-in user role:

---

### 🎓 Student Sidebar:
```
📊 Dashboard (My Courses)
🔍 Browse Courses
📚 My Enrollments
🔔 Notifications
👤 Profile
```

---

### 🛠️ Assistant Sidebar:
```
📊 Dashboard
📝 Submissions
    └── All Submissions
    └── Pending Submissions
📚 Courses (view/edit content)
🔔 Notifications
👤 Profile
```

---

### 👑 Admin Sidebar:
```
📊 Dashboard
👥 Users
    └── All Users
    └── Create Assistant
📚 Courses
    └── All Courses
    └── Create Course
📦 Modules & Lessons
📝 Submissions
💳 Payments
📋 Enrollments
🔔 Send Notification
👤 Profile
```

---

### ⚙️ Role Switching (For Development/Demo):
- Add a **floating dev panel** (bottom-right corner, small gear icon)
- Clicking it opens a small popup with role selector: Guest / Student / Assistant / Admin
- Switching role: updates the sidebar, navbar, and visible elements accordingly
- Store selected role in **localStorage**
- This panel should be easy to remove later when integrating with MVC

---

## 📄 ALL 40 SCREENS — DETAILED SPECIFICATIONS

---

### 🌐 GUEST SCREENS

---

#### Screen 1 — Landing Page (`index.html`)
**Layout:** Public

**Sections:**
1. **Hero Section**
   - Full-width background (gradient or image overlay)
   - Headline: "Learn Without Limits"
   - Subheadline: short description
   - Two CTA buttons: "Get Started" (filled) + "Browse Courses" (outline)

2. **Stats Bar**
   - 3–4 counters: Total Courses, Total Students, Total Instructors, Completion Rate

3. **Featured Courses Section**
   - Section title: "Popular Courses"
   - 3–4 course cards in a row (Bootstrap grid)
   - Each card: Thumbnail image, Title, Short description, Price badge or "Free", Enroll button

4. **How It Works Section**
   - 3 steps with icons: Register → Enroll → Learn

5. **Testimonials Section**
   - 3 student testimonial cards with avatar, name, quote, star rating

6. **CTA Banner**
   - "Ready to start learning?" with Register button

7. **Footer**

---

#### Screen 2 — Browse Courses (`courses.html`)
**Layout:** Public

**Elements:**
- Page header: "All Courses"
- Search bar (full width top)
- Filter row: All / Free / Paid (button group)
- Course cards grid (3 per row desktop, 2 tablet, 1 mobile)
- Each card: Thumbnail, Title, Description snippet, Free/Paid badge, Price, "View Course" button
- Pagination component at bottom

---

#### Screen 3 — Course Detail Guest View (`course-detail.html`)
**Layout:** Public

**Elements:**
- Course banner: large thumbnail, title, description overlay
- Two-column layout:
  - Left (wider): Full description, What you'll learn (bullet list), Module accordion (locked lessons with 🔒 icon)
  - Right (sticky sidebar): Price card — Price or Free, "Enroll Now" / "Get for Free" button, Course info (modules count, lessons count, level)
- Module accordion: each module expandable, lessons listed inside with lock icon

---

#### Screen 4 — Register (`register.html`)
**Layout:** Public (centered card, no sidebar)

**Elements:**
- Centered card (max-width: 480px)
- Logo at top
- Title: "Create Your Account"
- Fields: First Name, Last Name, Email, Phone Number, Password, Confirm Password
- Register button (full width)
- "Already have an account? Login" link
- Inline validation error messages

---

#### Screen 5 — Login (`login.html`)
**Layout:** Public (centered card)

**Elements:**
- Centered card
- Logo at top
- Title: "Welcome Back"
- Fields: Email, Password (with show/hide toggle)
- Remember Me checkbox
- Forgot Password link
- Login button (full width)
- "Don't have an account? Register" link
- Error alert (wrong credentials)

---

#### Screen 6 — Forgot Password (`forgot-password.html`)
**Layout:** Public (centered card)

**Elements:**
- Centered card
- Title: "Reset Your Password"
- Description text
- Email field
- Submit button
- Success alert: "Check your email for reset instructions"
- Back to Login link

---

### 🎓 STUDENT SCREENS

---

#### Screen 7 — Student Dashboard (`student/dashboard.html`)
**Layout:** Dashboard (Student Sidebar)

**Elements:**
- Welcome banner: "Welcome back, [Name]! 👋"
- Stats row: Enrolled Courses, Completed Courses, Pending Assignments, Notifications
- Section: "Continue Learning" — 3 course cards with progress bar
- Section: "Recently Added Courses" — 3 course cards
- Each course card: Thumbnail, Title, Progress bar (%), "Continue" button

---

#### Screen 8 — My Enrollments (`student/enrollments.html`)
**Layout:** Dashboard (Student Sidebar)

**Elements:**
- Page title: "My Courses"
- Filter tabs: All / Active / Completed / Dropped
- Course cards grid: Thumbnail, Title, Status badge, Progress bar, "Continue Learning" button
- Empty state illustration when no enrollments

---

#### Screen 9 — Browse Courses (Student) (`student/courses.html`)
**Layout:** Dashboard (Student Sidebar)

**Elements:**
- Same as Guest browse but:
  - "Enrolled" badge on already-enrolled courses
  - "Continue Learning" replaces "View Course" for enrolled courses

---

#### Screen 10 — Course Detail (Student) (`student/course-detail.html`)
**Layout:** Dashboard (Student Sidebar)

**Elements:**
- Course banner
- Two columns:
  - Left: Description, Module accordion (unlocked if enrolled), lessons with completion checkmarks
  - Right: Enrollment status card — if enrolled: progress bar + "Go to Course" button; if not: Price + Enroll button

---

#### Screen 11 — Payment Page (`student/payment.html`)
**Layout:** Dashboard (Student Sidebar)

**Elements:**
- Page title: "Complete Your Enrollment"
- Two columns:
  - Left: Payment form — Card Number, Expiry Date, CVV, Cardholder Name, Pay button
  - Right: Order summary card — Course thumbnail, title, amount
- Success state: green checkmark card — "Payment Successful! You are now enrolled."
- Failed state: red alert — "Payment Failed. Please try again."
- Pending state: spinner overlay

---

#### Screen 12 — Course Content / Learning Page (`student/learn.html`)
**Layout:** Dashboard BUT sidebar is replaced with course navigation sidebar

**Special Layout:**
```
┌──────────────┬──────────────────────┐
│ COURSE NAV   │   TOP HEADER         │
│ SIDEBAR      ├──────────────────────┤
│              │                      │
│ Module 1     │   LESSON CONTENT     │
│  ✅ Lesson 1 │                      │
│  ▶ Lesson 2  │                      │
│ Module 2     │                      │
│  🔒 Lesson 3 │                      │
└──────────────┴──────────────────────┘
```

**Course Nav Sidebar:**
- Course title at top
- Overall progress bar
- Modules (collapsible) with lessons inside
- Lesson states: ✅ Completed, ▶ Current, ○ Not started, 🔒 Locked

**Main Content Area:**
- Lesson title
- Video player (placeholder iframe/div)
- Download material button (if available)
- Rich text content area (lorem ipsum HTML content)
- Previous / Next lesson navigation buttons
- "Mark as Complete" button (bottom right)

---

#### Screen 13 — Assignment View (`student/assignment.html`)
**Layout:** Dashboard (Student Sidebar)

**States (show all 3 as tabs or separate sections for demo):**

**State 1 — Not Submitted:**
- Assignment title, Max Score
- Resource file download button
- Submission form:
  - Link input (optional)
  - File upload area (drag & drop style)
  - Uploaded files list
  - Submit button

**State 2 — Pending:**
- "Awaiting Grade" yellow badge
- Submitted files list (view only)
- Submitted link
- Submitted timestamp

**State 3 — Graded:**
- Green "Graded" badge
- Score: "85 / 100"
- Admin Comment box
- Submitted files (view only)

---

#### Screen 14 — Notifications (`student/notifications.html`)
**Layout:** Dashboard (Student Sidebar)

**Elements:**
- Page title: "Notifications"
- "Mark All as Read" button (top right)
- Notification list:
  - Each item: Icon, Title, Message snippet, Timestamp, Unread dot indicator
  - Unread items: slightly highlighted background
  - Read items: normal background
- Clicking notification → expands or marks as read
- Empty state: "You have no notifications yet"

---

#### Screen 15 — Student Profile (`student/profile.html`)
**Layout:** Dashboard (Student Sidebar)

**Elements:**
- Profile header: large avatar, Name, Email, Role badge
- Edit avatar button (upload)
- Form: First Name, Last Name, Phone Number (editable), Email (read-only)
- Save Changes button
- Divider
- Change Password section: Current Password, New Password, Confirm New Password, Update Password button

---

### 🛠️ ASSISTANT SCREENS

---

#### Screen 16 — Assistant Dashboard (`assistant/dashboard.html`)
**Layout:** Dashboard (Assistant Sidebar)

**Elements:**
- Stats cards: Total Pending Submissions, Total Graded, Courses Assigned
- Recent Submissions table: Student, Course, Module, Submitted At, Status badge, Grade button
- Quick filters: All / Pending / Graded

---

#### Screen 17 — All Submissions (`assistant/submissions.html`)
**Layout:** Dashboard (Assistant Sidebar)

**Elements:**
- Page title: "Submissions"
- Filter bar: Course dropdown, Module dropdown, Status dropdown (Pending/Graded), Search by student name
- Table: #, Student Name, Course, Module, Assignment, Submitted At, Status badge, Action (Grade button)
- Pagination

---

#### Screen 18 — Grade Submission (`assistant/grade-submission.html`)
**Layout:** Dashboard (Assistant Sidebar)

**Elements:**
- Back button
- Two columns:
  - Left: Student info card (avatar, name, email), Submission details (submitted at, link, files list with download)
  - Right: Grading card — Assignment title, Max Score, Score input (number), Comment textarea, Submit Grade button
- Success alert after grading

---

#### Screen 19 — Edit Lesson Content (`assistant/edit-lesson.html`)
**Layout:** Dashboard (Assistant Sidebar)

**Elements:**
- Breadcrumb: Course > Module > Lesson
- Lesson title (read-only header)
- Rich text editor (use a placeholder WYSIWYG like Quill.js or TinyMCE placeholder UI)
- Save Changes button
- Last updated timestamp
- Preview toggle button

---

### 👑 ADMIN SCREENS

---

#### Screen 20 — Admin Dashboard (`admin/dashboard.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- KPI Cards row: Total Users, Total Courses, Total Enrollments, Total Revenue, Pending Submissions
- Revenue chart (use Chart.js — monthly bar chart, placeholder data)
- Two-column bottom:
  - Recent Enrollments table
  - Recent Payments table
- Recent Submissions table (full width)

---

#### Screen 21 — All Users (`admin/users.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Page title + "Create Assistant" button (top right)
- Search bar + Role filter (All / Admin / Student / Assistant)
- Table: Avatar, Full Name, Email, Role badge, Phone, Join Date, Actions (Edit, Delete)
- Delete confirmation modal
- Pagination

---

#### Screen 22 — Create Assistant (`admin/create-assistant.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Page title: "Create Assistant Account"
- Form card (centered):
  - First Name, Last Name, Email, Phone Number, Password, Confirm Password
  - Role: pre-set to "Assistant" (shown as read-only badge)
  - Create Account button
- Success alert

---

#### Screen 23 — Manage Assistant Permissions (`admin/assistant-permissions.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Assistant info card at top (avatar, name, email)
- Permissions section:
  - List of permissions with toggle switches:
    - Grade Assignments
    - Manage Lessons
    - View Submissions
    - Manage Courses
    - Send Notifications
- Save Permissions button
- Success toast

---

#### Screen 24 — All Courses (`admin/courses.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Page title + "Create Course" button (top right)
- Search bar + Free/Paid filter
- Table or card grid: Thumbnail, Title, Free/Paid badge, Price, Modules count, Enrollments count, Actions (Edit, Delete, View)
- Delete confirmation modal

---

#### Screen 25 — Create Course (`admin/create-course.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Page title: "Create New Course"
- Form:
  - Title input
  - Description textarea (rich or plain)
  - Thumbnail image upload with preview
  - Is Free toggle switch
  - Price input (hidden/disabled when Is Free is ON)
  - Create Course button

---

#### Screen 26 — Edit Course (`admin/edit-course.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Same as Create Course but pre-filled
- "Update Course" button
- "Delete Course" button (danger, with confirmation modal)

---

#### Screen 27 — Manage Modules (`admin/modules.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Breadcrumb: Courses > [Course Title] > Modules
- Course title at top
- "Add Module" button
- Modules list (drag-and-drop reorderable):
  - Each module row: drag handle, OrderIndex, Title, "Manage Lessons" button, Edit icon, Delete icon
- Add/Edit Module inline form or modal: Title input, Save button
- Delete confirmation modal

---

#### Screen 28 — Manage Lessons (`admin/lessons.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Breadcrumb: Courses > [Course] > Modules > [Module] > Lessons
- "Add Lesson" button
- Lessons list (reorderable):
  - Each row: drag handle, OrderIndex, Title, Video indicator icon, Material indicator icon, "Edit Content" button, Edit icon, Delete icon
- Add/Edit Lesson modal:
  - Title
  - Order Index
  - Video URL input
  - Material file upload
  - Save button

---

#### Screen 29 — Lesson Blog Editor (`admin/lesson-editor.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Breadcrumb: Courses > Module > Lesson > Edit Content
- Lesson title header
- Full-width rich text editor (Quill.js placeholder or similar)
- Toolbar: Bold, Italic, Underline, Headings, Lists, Image, Code block, Link
- Save Content button (top right + bottom)
- Last saved timestamp
- Preview mode toggle

---

#### Screen 30 — Manage Assignment (`admin/assignment.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Breadcrumb: Courses > Module > Assignment
- If no assignment: empty state + "Create Assignment" button
- Assignment form:
  - Title input
  - Resource File upload (with current file shown if exists)
  - Max Score number input
  - Save / Update button
  - Delete button (if exists)

---

#### Screen 31 — All Submissions Admin (`admin/submissions.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Same as Assistant submissions page but admin sees everything
- Additional bulk action: Export to CSV (button)
- Table + filters + pagination

---

#### Screen 32 — Grade Submission Admin (`admin/grade-submission.html`)
**Layout:** Dashboard (Admin Sidebar)

- Same as Assistant grade submission page

---

#### Screen 33 — All Enrollments (`admin/enrollments.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Page title: "Enrollments"
- Filter: Course, Status (Active/Completed/Dropped), Date range
- Search by student name
- Table: Student, Course, Enrollment Date, Status badge, Action (Change Status dropdown)
- Pagination

---

#### Screen 34 — All Payments (`admin/payments.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Total Revenue card at top (big number)
- Filter: Status (Completed/Failed/Pending), Date range
- Search: by student or course
- Table: Student, Course, Amount, Method, Transaction ID, Date, Status badge
- Pagination

---

#### Screen 35 — Send Notification (`admin/send-notification.html`)
**Layout:** Dashboard (Admin Sidebar)

**Elements:**
- Page title: "Send Notification"
- Form card:
  - Select User (searchable dropdown)
  - Title input
  - Message textarea
  - Send button
- Recent sent notifications table below (To, Title, Sent At)

---

### 🌐 SHARED SCREENS

---

#### Screen 36 — 404 Not Found (`404.html`)
- Public layout
- Large 404 illustration/number
- "Page not found" message
- "Go Home" button

---

#### Screen 37 — Unauthorized (`unauthorized.html`)
- Public layout
- Lock icon illustration
- "You don't have permission to access this page"
- "Go Back" button

---

#### Screen 38 — Loading / Splash (`loading.html`)
- Full screen centered
- Logo + spinner
- "Loading..." text

---

### 📋 ADDITIONAL MODAL SCREENS (JS-powered, not separate files)

These are modals that appear on top of existing pages:

- **Screen 39 — Delete Confirmation Modal** — used across all delete actions
- **Screen 40 — Success / Error Toast** — bottom-right corner, auto-dismiss after 3 seconds

---

## 📁 RECOMMENDED FILE STRUCTURE

```
/lms-frontend
│
├── index.html                  ← Landing page
├── courses.html                ← Browse courses (guest)
├── course-detail.html          ← Course detail (guest)
├── login.html                  ← Login
├── register.html               ← Register
├── forgot-password.html        ← Forgot password
├── 404.html
├── unauthorized.html
├── loading.html
│
├── /student
│   ├── dashboard.html
│   ├── enrollments.html
│   ├── courses.html
│   ├── course-detail.html
│   ├── payment.html
│   ├── learn.html
│   ├── assignment.html
│   ├── notifications.html
│   └── profile.html
│
├── /assistant
│   ├── dashboard.html
│   ├── submissions.html
│   ├── grade-submission.html
│   └── edit-lesson.html
│
├── /admin
│   ├── dashboard.html
│   ├── users.html
│   ├── create-assistant.html
│   ├── assistant-permissions.html
│   ├── courses.html
│   ├── create-course.html
│   ├── edit-course.html
│   ├── modules.html
│   ├── lessons.html
│   ├── lesson-editor.html
│   ├── assignment.html
│   ├── submissions.html
│   ├── grade-submission.html
│   ├── enrollments.html
│   ├── payments.html
│   └── send-notification.html
│
├── /assets
│   ├── /css
│   │   ├── main.css            ← Global styles
│   │   ├── sidebar.css         ← Sidebar styles
│   │   └── components.css      ← Reusable components
│   ├── /js
│   │   ├── main.js             ← Global JS
│   │   ├── role-switcher.js    ← Dev role switcher
│   │   └── components.js       ← Reusable JS components
│   └── /images
│       ├── logo.svg
│       ├── /placeholders       ← Placeholder images
│       └── /illustrations      ← 404, empty states, etc.
│
└── /components
    ├── navbar-public.html      ← Public navbar snippet
    ├── navbar-dashboard.html   ← Dashboard header snippet
    ├── sidebar-student.html    ← Student sidebar
    ├── sidebar-assistant.html  ← Assistant sidebar
    ├── sidebar-admin.html      ← Admin sidebar
    └── footer.html             ← Public footer
```

---

## ⚙️ JAVASCRIPT BEHAVIOR REQUIREMENTS

### Role Switcher (Dev Tool):
```javascript
// Store role in localStorage
localStorage.setItem('lms_role', 'admin'); // guest | student | assistant | admin

// On page load, read role and show/hide elements
const role = localStorage.getItem('lms_role') || 'guest';
document.querySelectorAll('[data-role]').forEach(el => {
    const roles = el.dataset.role.split(',');
    el.style.display = roles.includes(role) ? '' : 'none';
});
```

### Sidebar Toggle (Mobile):
- Hamburger button toggles sidebar open/close
- Overlay background when sidebar is open on mobile
- Smooth CSS transition

### Active Navigation:
- Current page link highlighted in sidebar
- Use JS to detect current URL and add `active` class

### Form Validation:
- All forms validated before submit
- Inline error messages below each field
- Submit button disabled during "loading" state

### Toast Notifications:
- Global `showToast(message, type)` function
- Types: success (green), error (red), info (blue), warning (yellow)
- Auto-dismiss after 3 seconds
- Stack multiple toasts

### Confirmation Modal:
- Global `confirmDelete(message, onConfirm)` function
- Reusable across all delete actions

---

## 🔌 MVC INTEGRATION NOTES

> Keep these in mind for easy MVC migration later

- Use `data-` attributes for dynamic content placeholders
- Keep all href links as relative paths (no hardcoded domains)
- Forms should use standard HTML form structure (`action`, `method` attributes) — even if not functional now
- No JavaScript frameworks — pure vanilla JS only
- Comment all placeholder data clearly: `<!-- TODO: Replace with @Model.Title -->`
- Layouts should map cleanly to **Razor Layout pages** (`_Layout.cshtml`)
- Each sidebar should be a separate **partial view** later (`_StudentSidebar.cshtml`)
- CSS class naming should be BEM-friendly or at least consistent

---

## ✅ QUALITY CHECKLIST

Before delivering, every screen must have:

- [ ] Correct layout mode (public or dashboard)
- [ ] Correct sidebar for the role
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1440px)
- [ ] Realistic placeholder data (not just "Lorem Ipsum" everywhere)
- [ ] All interactive elements have hover states
- [ ] All tables have at least 3–5 rows of placeholder data
- [ ] All forms have validation states (error + success examples)
- [ ] Empty states designed for all lists/tables
- [ ] Loading states for buttons (spinner inside button)
- [ ] Active sidebar link highlighted correctly per page

---

## 📊 Screen Count Summary

| Role | Count |
|---|---|
| 🌐 Guest | 6 |
| 🎓 Student | 11 |
| 🛠️ Assistant | 4 |
| 👑 Admin | 16 |
| 🌐 Shared | 3 |
| **Total** | **40 Screens** |

---

> This is everything needed to implement all **40 screens** of the LMS frontend.
> The result should be a fully navigable static HTML prototype ready to be converted into an ASP.NET MVC Razor project.
