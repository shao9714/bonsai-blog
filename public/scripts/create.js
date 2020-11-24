function initCreate() {
    previewImg();
    window.addTagsList = [];
}

function submitEntry() {
    var title = document.getElementById('title').value;
    var summary = document.getElementById('summary').value;
    var entry = tinyMCE.activeEditor.getContent();
    var tags = window.addTagsList.join(',');
    $.ajax({
        type: 'POST',
        url: '/entry',
        dataType: 'application/json; charset=utf-8',
        data: {
            "title": title,
            "summary": summary,
            "entry": entry,
            "tags": tags
        },
        success: function(response) {
            console.log("here")
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

function previewImg() {
    const inpFile = document.getElementById('inpFile');
    const previewContainer = document.getElementById('imagePreview');
    const previewImage = previewContainer.querySelector('.image-preview-img');
    const previewDefaultText = previewContainer.querySelector('.image-preview-default-text');

    inpFile.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            // change to async?
            const reader = new FileReader();
            previewDefaultText.style.display = 'none';
            previewImage.style.display = 'block';

            reader.addEventListener('load', function() {
                previewImage.setAttribute('src', this.result);
            });

            reader.readAsDataURL(file);
        } else {
            previewDefaultText.style.display = null;
            previewImage.display = null;
            previewImage.setAttribute('src', null);
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

