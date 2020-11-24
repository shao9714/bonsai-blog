const dbClient = require('./../index');

async function getHomePage(req, res, next) {
    const content = await dbClient.getAllEntries();

    let user;
    if (req.user) {
        var l = await req.user.then(
            result => user = result[0]);

    }

    res.status(200).render('base', { content: content, user: user });

}

async function getEntry(req, res) {
    var id = req.url.substring(7, req.url.length);
    const content = await dbClient.getEntry(id);

    let user;
    if (req.user) {
        var l = await req.user.then(
            result => user = result[0]);

    }

    res.status(200).render('post', { content: content, user: user });
}

async function displayEntryForm(req, res) {
    let user;

    if (req.user) {
        var l = await req.user.then(
            result => user = result[0]);

    }

    res.status(200).render('create', { user: user });
}

async function createEntry(req, res) {
    let user;

    if (req.user) {
        var l = await req.user.then(
            result => user = result[0]);

    }

    const title = req.body.title;
    const author = user.username; 
    // hardcoded, need to replace with actual img
    const img = "banner2.jpg";
    const linkID = await dbClient.getNewEntryId();
    const link = linkID[0].AUTO_INCREMENT; 
    const summary = req.body.summary;
    var entry = req.body.entry;
    entry = entry.replace(/\r?\n/g, '');
    const tags = req.body.tags;
    const content = await dbClient.createEntry(title, author, img, link, summary, entry, tags, user.id);

    res.status(200).render('create', { user: user });
}

async function displayEditForm(req, res) {
    let user;

    if (req.user) {
        var l = await req.user.then(
            result => user = result[0]);

    }

    const id = req.url.substring(11, req.url.length);
    const content = await dbClient.getEntry(id);
    const title = content[0].title;
    const author = content[0].author;
    const link = content[0].link;
    const summary = content[0].summary;
    var entry = content[0].content;
    entry = entry.replace(/\r?\n/g, '<br/>');
    var tags = content[0].tags.split(',');
    res.status(200).render('edit', {
        id,
        title,
        author,
        link,
        summary,
        entry,
        tags,
        user
    });
}

async function editEntry(req, res) {
    const title = req.body.title;
    const img = "banner2.jpg";
    const summary = req.body.summary;
    let entry = req.body.entry;
    entry = entry.replace(/\r?\n/g, '<br/>');
    const id = req.body.id;
    const tags = req.body.tags;
    const content = await dbClient.editEntry(id, title, img, summary, entry, tags);
    res.status(200).json({
        success: true
    });
}

async function deleteEntry(req, res) {
    const id = req.url.substring(13, req.url.length);
    const content = await dbClient.deleteEntry(id);
    res.redirect('/');
}

async function getTags(req, res) {
    let user;

    if (req.user) {
        var l = await req.user.then(
            result => user = result[0]);

    }

    const tags = req.query;
    const content = await dbClient.getTags(tags);
    console.log(content);
    res.status(200).render('base', { 
        content,
        tags,
        user
    });
}

async function getAboutPage(req, res) {
    let user;

    if (req.user) {
        var l = await req.user.then(
            result => user = result[0]);

    }

    res.status(200).render('about', { user });
}

async function getAccountPage(req, res) {
    let user;
    if (req.user) {
        var l = await req.user.then(
            result => user = result[0]);

    }

    const content = await dbClient.getAccountPage(user.id);
    res.status(200).render('account', { content: content, user });
}

async function getSignup(req, res) {
    res.status(200).render('signup');
}

async function getLogin(req, res) {
    res.status(200).render('login');
}

exports.getHomePage = getHomePage;
exports.getEntry = getEntry;
exports.displayEntryForm = displayEntryForm;
exports.createEntry = createEntry;
exports.displayEditForm = displayEditForm;
exports.editEntry = editEntry;
exports.deleteEntry = deleteEntry;
exports.getTags = getTags;
exports.getAboutPage = getAboutPage;
exports.getAccountPage = getAccountPage;
exports.getSignup = getSignup;
exports.getLogin = getLogin;
