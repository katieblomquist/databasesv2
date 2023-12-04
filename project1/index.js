const express = require('express');
const cors = require('cors');
const { getAllBookings, filterBookingsStaff, filterBookingsAdmin, updateStaffId, updateStatus, getBookingId, addBooking } = require('./db');
const app = express();
app.use(cors());

app.get('/bookings', async (req, res) => {
    res.json(await getAllBookings());
});

app.get('/staff', async (req, res) => {
    staffId = req.query.staffId;
    bstatus = req.query.status;
    res.json(await filterBookingsStaff(staffId, bstatus));
});

app.get('/admin', async (req, res) => {
    bstatus = req.query.status;
    res.json(await filterBookingsAdmin(bstatus));
});

app.patch('/updatestatus', async (req, res) => {
    bstatus = req.query.status;
    bookingId = req.query.bookingId;
    res.json(await updateStatus(bstatus, bookingId));
});

app.patch('/updatestaff', async (req, res) => {
    staffId = req.query.staffId;
    bookingId = req.query.bookingId;
    res.json(await updateStaffId(staffId, bookingId));
});

app.get('/bookingid', async (req, res) => {
    res.json(await getBookingId());
})

app.post('/newbooking', async (req, res) => {
    bookingId = req.query.bookingId;
    fname = req.query.fname;
    lname = req.query.lname;
    phone = req.query.phone;
    child_name = req.query.child;
    visit_date = req.query.visit_date;
    visit_length = req.query.visit_length;
    characterid = req.query.characterid;
    street = req.query.street;
    city = req.query.city;
    zip = req.query.zip;
    agreeTos = req.query.agreeTos

    res.json(await addBooking(bookingId, fname, lname, phone, child_name, visit_date, visit_length, characterid, street, city, zip, agreeTos));
})

app.listen(3000);