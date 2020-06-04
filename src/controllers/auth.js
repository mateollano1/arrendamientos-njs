const admin = require('firebase-admin')
const serviceAccount = require("../../config/account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rentrooms-20192.firebaseio.com"
});

function checkAuth(req, res, next) {
    if (req.headers.authtoken) {
        admin.auth().verifyIdToken(req.headers.authtoken)
            .then(() => {
                next();
            }).catch(() => {
                res.status(401).send('Unauthorized')
            });
    } else {
        res.status(401).send('Unauthorized')
    }
}

module.exports = { checkAuth }