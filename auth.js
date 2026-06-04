// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Get form elements
const loginFormElement = document.getElementById('loginFormElement');
const signupFormElement = document.getElementById('signupFormElement');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');

// Toggle between login and signup forms
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    clearErrors();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    clearErrors();
});

// Clear all error messages
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
}

// Show error message
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(inputId + 'Error');
    
    if (input && errorElement) {
        input.classList.add('error');
        errorElement.textContent = message;
    }
}

// Validate email
function validateEmail(email) {
    return emailRegex.test(email);
}

// Validate password
function validatePassword(password) {
    return password.length >= 8;
}

// Login form submission
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    let isValid = true;
    
    // Validate email
    if (!email) {
        showError('loginEmail', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('loginEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showError('loginPassword', 'Password is required');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('sohoUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showError('loginPassword', 'Invalid email or password');
        return;
    }
    
    // Store authentication
    const authData = {
        email: user.email,
        name: user.name,
        loggedIn: true,
        timestamp: Date.now()
    };
    
    if (rememberMe) {
        localStorage.setItem('sohoAuth', JSON.stringify(authData));
    } else {
        sessionStorage.setItem('sohoAuth', JSON.stringify(authData));
    }
    
    // Redirect to lookbook
    window.location.href = 'lookbook.html';
});

// Signup form submission
signupFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
    
    let isValid = true;
    
    // Validate name
    if (!name) {
        showError('signupName', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('signupName', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showError('signupEmail', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('signupEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showError('signupPassword', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('signupPassword', 'Password must be at least 8 characters');
        isValid = false;
    }
    
    // Validate password confirmation
    if (!passwordConfirm) {
        showError('signupPasswordConfirm', 'Please confirm your password');
        isValid = false;
    } else if (password !== passwordConfirm) {
        showError('signupPasswordConfirm', 'Passwords do not match');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('sohoUsers') || '[]');
    
    if (users.find(u => u.email === email)) {
        showError('signupEmail', 'An account with this email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        name,
        email,
        password,
        createdAt: Date.now()
    };
    
    users.push(newUser);
    localStorage.setItem('sohoUsers', JSON.stringify(users));
    
    // Auto login
    const authData = {
        email: newUser.email,
        name: newUser.name,
        loggedIn: true,
        timestamp: Date.now()
    };
    
    localStorage.setItem('sohoAuth', JSON.stringify(authData));
    
    // Redirect to lookbook
    window.location.href = 'lookbook.html';
});

// Real-time validation
document.getElementById('loginEmail')?.addEventListener('blur', function() {
    const email = this.value.trim();
    if (email && !validateEmail(email)) {
        showError('loginEmail', 'Please enter a valid email address');
    }
});

document.getElementById('signupEmail')?.addEventListener('blur', function() {
    const email = this.value.trim();
    if (email && !validateEmail(email)) {
        showError('signupEmail', 'Please enter a valid email address');
    }
});

document.getElementById('signupPassword')?.addEventListener('input', function() {
    const password = this.value;
    const errorElement = document.getElementById('signupPasswordError');
    
    if (password && !validatePassword(password)) {
        this.classList.add('error');
        errorElement.textContent = 'Password must be at least 8 characters';
    } else {
        this.classList.remove('error');
        errorElement.textContent = '';
    }
});

document.getElementById('signupPasswordConfirm')?.addEventListener('input', function() {
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = this.value;
    const errorElement = document.getElementById('signupPasswordConfirmError');
    
    if (passwordConfirm && password !== passwordConfirm) {
        this.classList.add('error');
        errorElement.textContent = 'Passwords do not match';
    } else {
        this.classList.remove('error');
        errorElement.textContent = '';
    }
});