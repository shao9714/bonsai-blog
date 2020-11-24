function initEdit(tags) {
    if (tags.length > 0) {
        window.addTagsList = tags.split(',');
        updateTagListDisplay()
    } else {
        window.addTagsList = [];
    }
}

function editEntry(id) {
    var title = document.getElementById('title').value;
    var summary = document.getElementById('summary').value;
    var entry = tinyMCE.activeEditor.getContent();
    var tags = window.addTagsList.join(',');
    $.ajax({
        type: 'PATCH',
        url: '/editEntry/'+id,
        dataType: 'application/json; charset=utf-8',
        data: {
            "id": id,
            "title": title,
            "summary": summary,
            "entry": entry,
            "tags": tags
        },
        success: function(response) {
            if (response.success) {
                window.location.href = '/';
            } 
        },
        complete: function(response, textStatus) {
            window.location.href = '/entry/'+id;
            return;
        }
    });
}

function removeFromAddTagListIdx(tagIdx) {
	window.addTagsList.splice(tagIdx, 1);
	updateTagListDisplay();
}

function updateTagListDisplay() {
	var holder = document.getElementById("add-tags-list-holder");
	holder.innerHTML = "";
	for (var i = 0; i < window.addTagsList.length; i++) {
		holder.innerHTML += "<span class='badge badge-dark list-item'>" + window.addTagsList[i] + "<span aria-hidden='true' class='list-close'><a href='javascript:void(0)' onclick='removeFromAddTagListIdx(" + i + ")'>&times;</a></span></span> ";
	}
}

function uniqueTag(input) {
    for (var i=0; i<window.addTagsList.length; i++) {
        if (window.addTagsList[i] === input) return false;
    }
    return true;
}

document.getElementById('add-tags').addEventListener('keypress', function(e){
    if (e.keyCode === 13) {
        var tagInput = document.getElementById("add-tags").value;
        document.getElementById("add-tags").value = "";
        if (tagInput != "" && uniqueTag(tagInput)) {
            window.addTagsList.push(tagInput);
            updateTagListDisplay();
        }
    }
});