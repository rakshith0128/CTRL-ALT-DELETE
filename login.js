function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");
  
    // Hardcoded credentials for simplicity
    const validUsername = "admin";
    const validPassword = "password123";
  
    if (username === validUsername && password === validPassword) {
      
      window.location.href = "webpage.html";
    } else {

      errorMessage.textContent = "Invalid username or password. Please try again.";
    }
  }
  
