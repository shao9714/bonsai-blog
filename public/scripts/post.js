function displayEditForm() {
    $.ajax({
        type: 'GET',
        url: '/editEntry',
        dataType: 'application/json; charset=utf-8',
        success: function(response) {
            if (response.success) {
                window.location.href = '/';
            } 
        },
        complete: function(response, textStatus) {
            window.location.href = '/';
            return;
        }
    });
}

function deleteEntry(id) {
    $.ajax({
        type: 'DELETE',
        url: '/deleteEntry/'+id,
        dataType: 'application/json; charset=utf-8',
        success: function(response) {
            if (response.success) {
                window.location.href = '/';
            } 
        },
        complete: function(response, textStatus) {
            window.location.href = '/';
            return;
        }
    });
}

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