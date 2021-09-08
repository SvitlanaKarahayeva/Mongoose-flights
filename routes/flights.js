var express = require('express');
const { route } = require('.');
var router = express.Router();

const flightsCtrl = require('../controllers/flights')

//main page '/flights' with the list of all created flights
router.get('/', flightsCtrl.index)

router.get('/new', flightsCtrl.newPage)

//add new flight to the list of flight on the main page
router.post('/', flightsCtrl.create) 

// details page
router.get('/:flightID', flightsCtrl.show)

//create new destination
router.post('/destination/:flightID', flightsCtrl.addDestination)

//routes to a new Ticket form with association to a specific flight
router.get('/:flightID/tickets/new', flightsCtrl.showNewTicket)
router.post('/:flightID/tickets', flightsCtrl.createNewTicket)

module.exports = router;
