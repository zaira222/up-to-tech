async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if ( username && password) {
    const response = await fetch('/api/userlogin/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok) {
      document.location.replace('/dashboard')
       console.log('success');
    } else {
      alert(response.statusText);
    }
   
  }
}

async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/Userlogin', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if(response.ok) {
        document.location.replace('/dashboard')
         console.log('success');
      } else {
        alert(response.statusText);
      }
     
    }
  }


document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);