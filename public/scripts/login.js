function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    $.ajax({
        url: '/login',
        type: 'POST',
        data: {
            "email": email,
            "password": password
        },
        dataType: 'application/json',
        complete: function(response) {
        }
    });
}