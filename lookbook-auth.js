// Check authentication on lookbook page load
(function() {
    // Check both localStorage and sessionStorage
    const localAuth = localStorage.getItem('sohoAuth');
    const sessionAuth = sessionStorage.getItem('sohoAuth');
    
    const authData = localAuth ? JSON.parse(localAuth) : (sessionAuth ? JSON.parse(sessionAuth) : null);
    
    // If not authenticated, redirect to login
    if (!authData || !authData.loggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    // Optional: Check if auth is expired (24 hours)
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (Date.now() - authData.timestamp > twentyFourHours) {
        localStorage.removeItem('sohoAuth');
        sessionStorage.removeItem('sohoAuth');
        window.location.href = 'login.html';
        return;
    }
    
    // User is authenticated, allow access
    console.log('Welcome back, ' + authData.name);
})();