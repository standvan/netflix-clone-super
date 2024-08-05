const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://netflix-pro-32b7c.appspot.com",
});
const bucket = admin.storage().bucket();

module.exports = bucket;
