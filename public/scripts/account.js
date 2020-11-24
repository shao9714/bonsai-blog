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

}

