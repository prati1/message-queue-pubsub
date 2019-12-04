const express = require(`express`);

const router = express.Router();

const queueController = require(`../controller/queue.js`);

router.route(`/`).get(queueController.displayMessage);

module.exports = router;
