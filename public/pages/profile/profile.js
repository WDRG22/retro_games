
async function postData(){
    // Get user values
    const username = document.getElementById("username-input").value;
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    // Send request
    const response = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, email: email, password: password})
    });

    // Handle the response
    const result = await response.json();
    console.log(result);
}
