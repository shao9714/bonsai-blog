const fs = require('fs');
const dbClient = require('./../index');

// Read placeholder file
const data = JSON.parse(fs.readFileSync(
    `${__dirname}/../data/data.json`
));

// need to add try catch to all, not finalized
async function getAllEntries(req, res) {
    const content = await dbClient.getAllEntries();
    res.status(200).json({
        status: 'success',
        data: {
            content
        }
    });
}
async function createEntry(req, res) {
    var title = req.body.title;
    var summary = req.body.summary;
    var content = req.body.content;
   
    const data = await dbClient.createEntry(title, summary, content);
    res.status(201).json({
        status: 'success',
        data: {
            data
        }
    });
}
async function getEntry(req, res) {
    var id = req.url.substring(1, req.url.length);
    const data = await dbClient.getEntry(id);

    res.status(200).json({
        status: 'success',
        data: {
            data
        }
    });
}
async function editEntry(req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var summary = req.body.summary;
    var content = req.body.content;

    const data = await dbClient.editEntry(id, title, summary, content);
    res.status(200).json({
        status: 'success',
        data: {
            data
        }
    });;
}
async function deleteEntry(req, res) {
    var id = req.body.id;

    const data = await dbClient.deleteEntry(id);
   
    res.status(204).json({
        status: 'success',
        data: null
    });
}

exports.getAllEntries = getAllEntries;
exports.createEntry = createEntry;
exports.getEntry = getEntry;
exports.editEntry = editEntry;
exports.deleteEntry = deleteEntry;
