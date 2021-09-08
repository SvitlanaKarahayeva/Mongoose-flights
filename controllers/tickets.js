const Ticket = require('../models/ticket')
const Flight = require('../models/flight')

async function showAllTickets(req, res){
    const tickets = await Ticket.find({}) //find all tickets
    res.render('tickets/index', {tickets})
}

function showNewTicketsPage(req, res){
    res.render('tickets/new')
}
///submitting to /tickets
async function createTicket(req, res){
     //res.send(req.body) //printed out the obj of our input on a new page
    const ticket = new Ticket(req.body);
    await ticket.save()
    res.redirect('/tickets')

}
module.exports = {
    index: showAllTickets,
    show: showNewTicketsPage,
    create: createTicket
}