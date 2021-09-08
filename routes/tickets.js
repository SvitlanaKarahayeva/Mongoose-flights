var express = require('express');
var router = express.Router();

const ticketsCtrl = require('../controllers/tickets')

router.get('/', ticketsCtrl.index)

// the orginal routes to render a ticket page in isolation and submit to '/tickets'
// router.get('/new', ticketsCtrl.show)
// router.post('/', ticketsCtrl.create)

router.get('/new', ticketsCtrl.show)
router.post('/', ticketsCtrl.create)

module.exports = router;