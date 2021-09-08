const Ticket = require('../models/ticket')
const Flight = require('../models/flight')

function showNewFlightsPage(req, res){
    res.render('flights/new')
}

function createFlight(req, res){
    const newFlight = new Flight({
        depart: req.body.flightDepart,
        airline: req.body.flightAirline,
        flightNo: req.body.flightNo,
        airport: req.body.flightAirport
    })
    newFlight.save().then(() => console.log(newFlight)) 
    res.redirect('/flights')
}

function showAllFlights(req, res){
    Flight.find({}, function(err, docs){
        // console.log(docs)
        res.render('flights/index', {flights: docs})
    })
}

async function showFlightDetails(req, res){
    const flightDetails = await Flight.findById(req.params.flightID).populate('tickets')
    console.log(flightDetails)
    res.render('flights/show', {flights: flightDetails})
}

async function addDestination(req, res){
    console.log(req.body)
    let flight = await Flight.findById(req.params.flightID)
    flight.destinations.push({ 
        airport: req.body.destAirport,
        arrival: req.body.destArrival
     })
    await flight.save()
    res.redirect(`/flights/${req.params.flightID}`)
    
}
//render the form to add a new ticket associated with the specific flight
function showNewTicket (req, res){
    console.log(req.params)
    const flightID = req.params.flightID
    res.render('tickets/new', {flightID})
}

async function createNewTicket(req, res){
    const flightID = req.params.flightID
    const foundFlight = await Flight.findById(flightID)
    const { price, seat } = req.body
    const newTicket = new Ticket({ price, seat })

    foundFlight.tickets.push(newTicket)
    newTicket.flight = foundFlight
    await foundFlight.save()
    await newTicket.save()
    // res.redirect(`/flights/${flightID}`)
    res.redirect(`/flights/${flightID}` )
}


module.exports = {
    newPage: showNewFlightsPage,
    index: showAllFlights,
    create: createFlight,
    show: showFlightDetails,
    addDestination,
    showNewTicket,
    createNewTicket
}