// login.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission
  
      // Collect form data
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const browser_info = document.getElementById('browser_info').value;
  
      // Prepare payload
      const payload = { email, password, browser_info };
  
      try {
        const res = await fetch(
          'https://klwfhdpmrjmvkrhaywlc.supabase.co/functions/v1/swift-service',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          }
        );
  
        // Parse response JSON
        const data = await res.json();
  
        if (res.ok && data.redirect_url) {
          // ✅ Redirect browser to target URL
          window.location.href = data.redirect_url;
        } else if (data.error) {
          alert('Error: ' + data.error);
        } else {
          alert('Unexpected response from server.');
        }
  
      } catch (err) {
        console.error('Fetch error:', err);
        alert('Failed to reach backend. Check console for details.');
      }
    });
  });
  