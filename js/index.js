// 1. Toggle Password Visibility Feature
function togglePass(id) {
    const field = document.getElementById(id);
    if (field) {
        field.type = field.type === "password" ? "text" : "password";
    }
}

// 2. Signup Validation Logic
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset Error Messages
        document.querySelectorAll('.error-msg').forEach(el => el.innerText = "");

        const name = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const city = document.getElementById('city').value;
        const pass = document.getElementById('password').value;
        const cPass = document.getElementById('confirmPassword').value;

        let isValid = true;

        // Validation Rule: City (Alphabets only)
        if (!/^[A-Za-z\s]+$/.test(city)) {
            document.getElementById('cityError').innerText = "City must contain only alphabets.";
            isValid = false;
        }

        // Validation Rule: Phone (10 Digits)
        if (!/^\d{10}$/.test(phone)) {
            document.getElementById('phoneError').innerText = "Phone number must be exactly 10 digits.";
            isValid = false;
        }

        // Validation Rule: Password (8+ chars, mix of letters & numbers)
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass)) {
            document.getElementById('passError').innerText = "Minimum 8 characters, at least one letter and one number.";
            isValid = false;
        }

        // Validation Rule: Password Match
        if (pass !== cPass) {
            document.getElementById('cPassError').innerText = "Passwords do not match.";
            isValid = false;
        }

        // If all validations pass
        if (isValid) {
            const userData = { 
                email: email, 
                pass: pass, 
                name: name,
                city: city,
                phone: phone
            };
            
            // Register user in LocalStorage
            localStorage.setItem(email, JSON.stringify(userData));
            
            alert("Registration Successful! Redirecting to Sign In...");
            window.location.href = "SignIn.html"; 
        }
    });
}

// 3. Sign In Logic
const signinForm = document.getElementById('signinForm');
if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPass').value;

        const storedData = localStorage.getItem(email);

        if (storedData) {
            const user = JSON.parse(storedData);
            // Authentication check
            if (user.pass === pass) {
                // Successful redirect to the Landing Page
                window.location.href = "travelapp.html"; 
            } else {
                alert("Incorrect Password!");
            }
        } else {
            alert("No account found with this email. Please Sign Up first.");
        }
    });
}

// 4. Real-time Feedback (Clear errors on input)
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        const errorId = input.id + "Error";
        const errorElement = document.getElementById(errorId);
        if (errorElement) errorElement.innerText = "";
    });
});