// Show/hide mobile menu
document.addEventListener('DOMContentLoaded', function() {
    // Close any open dropdown when clicking anywhere
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    // Toggle dropdown when clicking the toggle button
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = this.nextElementSibling;
            const allMenus = document.querySelectorAll('.dropdown-menu');
            
            // Close all other open dropdowns
            allMenus.forEach(m => {
                if (m !== menu) m.classList.remove('show');
            });
            
            // Toggle current dropdown
            menu.classList.toggle('show');
        });
    });
});

document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('liked');
        const countEl = this.querySelector('.tweet-action-count');
        if (this.classList.contains('liked')) {
            countEl.textContent = parseInt(countEl.textContent) + 1;
        } else {
            countEl.textContent = parseInt(countEl.textContent) - 1;
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Close all dropdowns when clicking anywhere
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.post-dropdown')) {
            document.querySelectorAll('.post-dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    // Toggle dropdown for each post
    document.querySelectorAll('.post-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = this.parentElement.querySelector('.post-dropdown-menu');
            
            // Close all other dropdowns
            document.querySelectorAll('.post-dropdown-menu').forEach(m => {
                if (m !== menu) m.classList.remove('show');
            });
            
            // Toggle current dropdown
            menu.classList.toggle('show');
        });
    });
});



 document.addEventListener('DOMContentLoaded', function() {
        const fileInput = document.getElementById('id_image');
        const imagePreview = document.getElementById('image-preview');
        const uploadText = document.querySelector('.upload-text');
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    if (imagePreview.classList.contains('image-placeholder')) {
                        // Convert placeholder to image
                        imagePreview.innerHTML = '';
                        imagePreview.classList.remove('image-placeholder');
                        imagePreview.classList.add('selected-image');
                        imagePreview.src = event.target.result;
                        
                        // Show change text if hidden
                        if (uploadText.style.display === 'none') {
                            uploadText.style.display = 'inline-block';
                            uploadText.innerHTML = '<i class="upload-icon"></i> Change Image';
                        }
                    } else {
                        // Update existing image
                        imagePreview.src = event.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Make both the image and text clickable
        if (imagePreview) {
            imagePreview.addEventListener('click', function() {
                fileInput.click();
            });
        }
        
        if (uploadText) {
            uploadText.addEventListener('click', function() {
                fileInput.click();
            });
        }
    });


    //show selected image name

    document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('id_image');
    const fileNameDisplay = document.getElementById('file-name-display');
    const uploadArea = document.getElementById('image-upload-area');
    
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const fileName = this.files[0].name;
                
                // Update file name display
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = fileName;
                }
                
                // Change styling to indicate file selected
                if (uploadArea) {
                    uploadArea.style.borderColor = '#1da1f2';
                    uploadArea.style.backgroundColor = 'rgba(29, 161, 242, 0.05)';
                    
                    // Update the instruction text
                    const instruction = uploadArea.querySelector('.upload-instruction');
                    if (instruction) {
                        instruction.textContent = 'Change Image';
                    }
                }
                
                // Create image preview if it's an image file
                if (this.files[0].type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        // Replace upload area with image preview
                        uploadArea.outerHTML = `
                            <img src="${e.target.result}" 
                                 class="image-preview" 
                                 id="image-preview">
                        `;
                    };
                    reader.readAsDataURL(this.files[0]);
                }
            }
        });
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // At top of page - always show navbar
        if (currentScrollY <= 0) {
            navbar.style.transform = 'translateY(0)';
            lastScrollY = currentScrollY;
            return;
        }
        
        // Only trigger if scrolled enough pixels
        if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) {
            return;
        }
        
        // Scrolling down - hide navbar
        if (currentScrollY > lastScrollY && currentScrollY > navbar.offsetHeight) {
            navbar.style.transform = 'translateY(-100%)';
        } 
        // Scrolling up - show navbar
        else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('id_profile_pic');
    const fileInfo = document.getElementById('file-info');
    const preview = document.getElementById('profile-pic-preview');
    
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                fileInfo.textContent = "Selected: " + this.files[0].name;
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
});