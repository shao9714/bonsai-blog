function searchTag(tag) {
    console.log(tag);
    $.ajax({
        type: "GET",
        url: "/search",
        dataType: "text",
        data: {
            "tags": tag
        },
        success: function(response) {
            if (response.success) {
            }
        },
        complete: function(response, textStatus) {
            return window.location = '/search?tags='+tag;
        }
    });
}

function init() {
    document.getElementById('search-box').addEventListener('keypress', function(e) {
        if (e.keyCode == 13) {
            var tag = document.getElementById('search-box').value;
            console.log(tag);
            if (tag != '') searchTag(tag);
        }
    });

    const token = window.localStorage.token;
    
    // need to actually store token in req headers, and send it as a cookie
    // $.ajax({
    //     type: "GET",
    //     url: "/",
    //     dataType: "application/json",
    //     headers: {
    //         "Authorization": `Bearer ${token}`
    //     },
    //     complete: function(response, textStatus) {
    //         var data = JSON.parse(response.responseText);
    //         var name = data.user[0].username;
    //         document.getElementById('portal').innerHTML = `Welcome! ${name}`;
    //     }
    // });
}

