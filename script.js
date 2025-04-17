document.addEventListener('DOMContentLoaded', function() {
    // Function to load and insert the sidebar
    function loadSidebar() {
        fetch('sidebar.html') // Fetch the sidebar component
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                const placeholder = document.getElementById('sidebar-placeholder');
                if (placeholder) {
                    placeholder.innerHTML = html; // Insert the HTML
                    initializeSidebarLogic(); // Initialize its JS AFTER insertion
                    updateCurrentArchiveLink(); // Highlight current page link
                } else {
                    console.error('Sidebar placeholder not found!');
                }
            })
            .catch(error => {
                console.error('Error fetching or inserting sidebar:', error);
            });
    }

    // Function to set up sidebar event listeners
    function initializeSidebarLogic() {
        const sidebar = document.querySelector('.sidebar');
        const sidebarToggleContainer = document.querySelector('.sidebar-toggle-container');
        let sidebarTimeout;

        if (sidebarToggleContainer && sidebar) {
            // Event listener for hovering over the toggle area (icon + text)
            sidebarToggleContainer.addEventListener('mouseover', function() {
                clearTimeout(sidebarTimeout);
                sidebar.classList.add('active');
            });

            // Event listener for mouse leaving the toggle area
            sidebarToggleContainer.addEventListener('mouseout', function() {
                sidebarTimeout = setTimeout(() => {
                    if (!sidebar.matches(':hover')) {
                        sidebar.classList.remove('active');
                    }
                }, 300);
            });

            // Event listener for hovering over the sidebar itself
            sidebar.addEventListener('mouseover', function() {
                clearTimeout(sidebarTimeout);
            });

            // Event listener for mouse leaving the sidebar
            sidebar.addEventListener('mouseout', function() {
                sidebarTimeout = setTimeout(() => {
                    if (!sidebarToggleContainer.matches(':hover')) {
                        sidebar.classList.remove('active');
                    }
                }, 300);
            });

            // Sidebar hierarchy toggle logic
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
        } else {
            console.error("Sidebar elements (.sidebar or .sidebar-toggle-container) not found after injection.");
        }
    }

    // Function to highlight the current page link in the sidebar
    function updateCurrentArchiveLink() {
        const currentPagePath = window.location.pathname.split('/').pop(); // Get current filename (e.g., '4.15.html')
        const sidebarLinks = document.querySelectorAll('.sidebar .day-list a');
        sidebarLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPagePath) {
                link.classList.add('current-archive-link');
                // Optionally expand parent month/year if needed
                // This part might need adjustment based on final structure
                const dayList = link.closest('.day-list');
                const monthToggle = dayList?.previousElementSibling;
                const monthList = monthToggle?.closest('.month-list');
                const yearToggle = monthList?.previousElementSibling;

                dayList?.classList.add('expanded');
                monthToggle?.classList.add('expanded');
                monthList?.classList.add('expanded');
                yearToggle?.classList.add('expanded');

            } else {
                link.classList.remove('current-archive-link');
            }
        });
    }

    // --- Initialize Tab Navigation --- (Can run independently)
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    if (sections.length > 0 && navItems.length > 0) {
        const hash = window.location.hash;
        let activeIndex = 0;
        if (hash) {
            navItems.forEach((item, index) => {
                if (item.getAttribute('href') === hash || '#' + item.getAttribute('href').split('#').pop() === hash) {
                   activeIndex = index;
                }
            });
        }
        sections.forEach(section => section.classList.remove('active'));
        navItems.forEach(nav => nav.classList.remove('active'));
        if (sections[activeIndex]) sections[activeIndex].classList.add('active');
        if (navItems[activeIndex]) navItems[activeIndex].classList.add('active');
    }

    navItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            // Allow hash change for navigation history
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            item.classList.add('active');
            if (sections[index]) {
               sections[index].classList.add('active');
            }
        });
    });

    // --- Load Sidebar --- (Starts fetching)
    loadSidebar();
}); 