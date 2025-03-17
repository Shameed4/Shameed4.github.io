(function($) {
    // When the document is ready
    $(document).ready(function() {
        // Check if the URL contains the 'thankyou' hash
        if (window.location.hash === '#thankyou') {
            // Hide the form
            $('#contactForm').hide();
            // Show the thank you message
            $('#thankyou').show();
            // Scroll to the thank you message
            $('html, body').animate({
                scrollTop: $('#thankyou').offset().top - 100
            }, 1000);
            // Remove the hash from the URL after a delay (to ensure scrolling works)
            setTimeout(function() {
                history.replaceState(null, null, ' ');
                // Show the form again after 5 seconds
                setTimeout(function() {
                    $('#thankyou').fadeOut(500, function() {
                        $('#contactForm').fadeIn(500);
                    });
                }, 5000);
            }, 1500);
        }
        
        // Get the contact form
        var form = $('#contactForm');
        
        // Detect if we're running locally (file://) or on a server (http:// or https://)
        var isLocalTesting = window.location.protocol === 'file:';
        
        // If testing locally, prevent FormSpree submission
        if (isLocalTesting) {
            console.log('LOCAL TESTING MODE DETECTED: Form submissions will be simulated');
        }
        
        // Add submit event listener
        form.on('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form values
            var name = $('#name').val().trim();
            var email = $('#email').val().trim();
            var subject = $('#subject').val().trim();
            var message = $('#message').val().trim();
            
            // Basic validation
            if (!name) {
                alert('Please enter your name');
                $('#name').focus();
                return;
            }
            
            if (!email) {
                alert('Please enter your email');
                $('#email').focus();
                return;
            }
            
            // Simple email validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                $('#email').focus();
                return;
            }
            
            if (!subject) {
                alert('Please enter a subject');
                $('#subject').focus();
                return;
            }
            
            if (!message) {
                alert('Please enter your message');
                $('#message').focus();
                return;
            }
            
            // Show loading state
            var submitBtn = form.find('input[type="submit"]');
            var originalBtnValue = submitBtn.val();
            submitBtn.val('Sending...').attr('disabled', 'disabled');
            
            // LOCAL TESTING MODE
            // If we're testing locally, simulate a submission
            if (isLocalTesting) {
                console.log('LOCAL TEST MODE - Would submit:', {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                });
                
                // Simulate a server response delay
                setTimeout(function() {
                    // Show the thank you message
                    form.hide();
                    $('#thankyou').show();
                    
                    // Scroll to the thank you message
                    $('html, body').animate({
                        scrollTop: $('#thankyou').offset().top - 100
                    }, 1000);
                    
                    // Reset button state
                    submitBtn.val(originalBtnValue).removeAttr('disabled');
                    
                    // Reset form
                    form[0].reset();
                    
                    // Show the form again after 5 seconds
                    setTimeout(function() {
                        $('#thankyou').fadeOut(500, function() {
                            form.fadeIn(500);
                        });
                    }, 5000);
                }, 1500);
                
                return;
            }
            
            // PRODUCTION MODE
            // Submit the form traditionally for FormSpree to handle
            form[0].submit();
        });
    });
})(jQuery);