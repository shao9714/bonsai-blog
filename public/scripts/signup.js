function signUp() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var passwordConfirm = document.getElementById('passwordConfirm').value;
    var passwordChangedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
   
    $.ajax({
        url: '/signup',
        type: 'POST',
        data: {
            "username": username,
            "email": email,
            "password": password,
            "passwordConfirm": passwordConfirm,
            "passwordChangedAt": passwordChangedAt
        },
        dataType: 'application/json;charset=utf-8',
        complete: function(response) {
            data = JSON.parse(response.responseText)
            window.localStorage.token = data.data.token;
            window.location.href = "/login";
        }
    });
}