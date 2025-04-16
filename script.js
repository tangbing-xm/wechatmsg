document.addEventListener('DOMContentLoaded', function() {
    // Existing tab navigation code...
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    // const navigation = document.querySelector('.navigation'); // Keep if needed

    if (sections.length > 0 && navItems.length > 0) {
        // Check hash in URL to activate specific tab/section
        const hash = window.location.hash;
        let activeIndex = 0;
        if (hash) {
            navItems.forEach((item, index) => {
                // Ensure comparison handles the '#' prefix
                if (item.getAttribute('href') === hash || '#' + item.getAttribute('href').split('#').pop() === hash) {
                   activeIndex = index;
                }
            });
        }

        sections.forEach(section => section.classList.remove('active'));
        navItems.forEach(nav => nav.classList.remove('active'));

        // Activate the determined or default section/nav item
        if (sections[activeIndex]) sections[activeIndex].classList.add('active');
        if (navItems[activeIndex]) navItems[activeIndex].classList.add('active');
    }

    navItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            // Don't prevent default; allow hash change
            // e.preventDefault(); // Keep commented out or remove

            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            item.classList.add('active');
            if (sections[index]) {
               sections[index].classList.add('active');
            }
            // Optional: Scroll to the top of the section
            // if (sections[index]) sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });


    // --- START: Modified Sidebar Script (Hover Activated) ---
    const sidebar = document.querySelector('.sidebar');
    // Target the container that includes the button and text
    const sidebarToggleContainer = document.querySelector('.sidebar-toggle-container');
    let sidebarTimeout; // To manage the delay for closing

    if (sidebarToggleContainer && sidebar) {
        // Event listener for hovering over the toggle area (icon + text)
        sidebarToggleContainer.addEventListener('mouseover', function() {
            clearTimeout(sidebarTimeout); // Cancel any scheduled closing
            sidebar.classList.add('active'); // Expand the sidebar
        });

        // Event listener for mouse leaving the toggle area
        sidebarToggleContainer.addEventListener('mouseout', function() {
            // Schedule closing after a short delay
            sidebarTimeout = setTimeout(() => {
                // Only close if the mouse is NOT currently over the sidebar itself
                if (!sidebar.matches(':hover')) {
                    sidebar.classList.remove('active');
                }
            }, 300); // 300ms delay - adjust as needed
        });

        // Event listener for hovering over the sidebar itself
        sidebar.addEventListener('mouseover', function() {
            // If the mouse enters the sidebar, cancel any scheduled closing
            clearTimeout(sidebarTimeout);
        });

        // Event listener for mouse leaving the sidebar
        sidebar.addEventListener('mouseout', function() {
            // Schedule closing after a short delay when leaving the sidebar
            sidebarTimeout = setTimeout(() => {
                 // Only close if the mouse is NOT currently over the toggle area either
                 if (!sidebarToggleContainer.matches(':hover')) {
                    sidebar.classList.remove('active');
                 }
            }, 300); // 300ms delay - adjust as needed
        });
    }

    // --- END: Modified Sidebar Script ---

    // Keep Sidebar hierarchy toggle logic
    const toggleItems = document.querySelectorAll('.sidebar .toggle-item');
    toggleItems.forEach(item => {
        item.addEventListener('click', function() {
            const sublist = this.nextElementSibling;
            if (sublist && sublist.tagName === 'UL') {
                sublist.classList.toggle('expanded');
                this.classList.toggle('expanded');
            }
        });
    });
}); 