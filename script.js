document.addEventListener('DOMContentLoaded', function() {
    // --- Tab Navigation Logic --- 
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

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

    // --- Sidebar Logic (Hover Activated) ---
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    let leaveTimeout; // Timeout variable for delaying close

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('mouseenter', function() {
            clearTimeout(leaveTimeout); // Cancel any pending close
            sidebar.classList.add('active');
        });

        sidebarToggle.addEventListener('mouseleave', function() {
            // Delay closing slightly to allow moving mouse to sidebar
            leaveTimeout = setTimeout(() => {
                if (!sidebar.matches(':hover')) { // Only close if mouse isn't over sidebar
                     sidebar.classList.remove('active');
                }
            }, 200); // 200ms delay
        });

        sidebar.addEventListener('mouseenter', function() {
            clearTimeout(leaveTimeout); // Cancel closing if mouse enters sidebar
        });

        sidebar.addEventListener('mouseleave', function() {
            // Delay closing when leaving sidebar itself
             leaveTimeout = setTimeout(() => {
                 sidebar.classList.remove('active');
             }, 200);
        });
    }

    // --- Sidebar Hierarchy Toggle Logic ---
    const toggleItems = document.querySelectorAll('.sidebar .toggle-item');
    toggleItems.forEach(item => {
        item.addEventListener('click', function() {
            // Find the adjacent UL
            const sublist = this.nextElementSibling;
            if (sublist && sublist.tagName === 'UL') {
                // Toggle the 'expanded' class on the UL
                sublist.classList.toggle('expanded');
                // Toggle the 'expanded' class on the clicked item (for the arrow)
                this.classList.toggle('expanded');
            }
        });
    });

    // --- Back to Top Button Logic ---
    const backToTopButton = document.getElementById("backToTopBtn");
    const scrollThreshold = 300; // Show button after scrolling 300px

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            if (backToTopButton) backToTopButton.style.display = "block";
        } else {
            if (backToTopButton) backToTopButton.style.display = "none";
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}); 