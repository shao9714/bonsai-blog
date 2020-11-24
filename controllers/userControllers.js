const dbClient = require('./../index');

async function getAllUsers(req, res) {
    const data = await dbClient.getAllUsers();
    res.status(200).json({
        status: 'success',
        data: {
            data
        }
    });
}
async function createUser(req, res) {
    var username = req.body.username;
   
    const data = await dbClient.createUser(username);
    res.status(201).json({
        status: 'success',
        data: {
            data
        }
    });
}
async function getUser(req, res) {
    var id = req.url.substring(1, req.url.length);
    const data = await dbClient.getUser(id);

    res.status(200).json({
        status: 'success',
        data: {
            data
        }
    });
}
async function editUser(req, res) {
    var id = req.body.id;
    var username = req.body.username;

    const data = await dbClient.editUser(id, username);
    res.status(200).json({
        status: 'success',
        data: {
            data
        }
    });;
}
async function deleteUser(req, res) {
    var id = req.body.id;

    const data = await dbClient.deleteUser(id);
   
    res.status(204).json({
        status: 'success',
        data: null
    });
}

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.getUser = getUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;