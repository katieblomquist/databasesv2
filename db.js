const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
});

async function getAllBookings() {
    const result = await sql`select bookings.booking_id, bookings.status, bookings.visit_date, bookings.street, bookings.city, bookings.zip, bookings.staffid, aCharacters.cName, staff.fname FROM bookings INNER JOIN aCharacters ON aCharacters.character_id = bookings.characterid INNER JOIN staff ON staff.staff_id = bookings.staffid;`
    return result;
}

async function filterBookingsStaff(staffId, status) {
    const result = await sql`select bookings.booking_id, bookings.status, bookings.visit_date, bookings.street, bookings.city, bookings.zip, bookings.staffid, aCharacters.cName, staff.fname FROM bookings INNER JOIN aCharacters ON aCharacters.character_id = bookings.characterid INNER JOIN staff ON staff.staff_id = bookings.staffid INNER JOIN char_played ON aCharacters.character_id = char_played.characterid WHERE bookings.status = ${status} AND char_played.staffid = ${staffId};`
    return result;
}

async function filterBookingsAdmin(status){
    const result = await sql`select bookings.booking_id, bookings.status, bookings.visit_date, bookings.street, bookings.city, bookings.zip, bookings.staffid, aCharacters.cName, staff.fname FROM bookings INNER JOIN aCharacters ON aCharacters.character_id = bookings.characterid INNER JOIN staff ON staff.staff_id = bookings.staffid WHERE bookings.status = ${status};`
    return result;
}

async function updateStatus(status, bookingId){
    const result = await sql`UPDATE bookings SET status = ${status}  WHERE booking_id = ${bookingId};`
    return result;
}

async function updateStaffId(staffId, bookingId){
    const result = await sql `UPDATE bookings SET staffid = ${staffId} , status = 'pending' where booking_id = ${bookingId};`
    return result;
}

async function getBookingId(){
    const result = await sql `SELECT MAX(booking_id) FROM bookings;`;
    return result;
}

async function addBooking(booking_id, fname, lname, phone, child_name, visit_date, visit_length, characterid, street, city, zip, agreeTos){
    const result = await sql `INSERT INTO bookings (booking_id, fName, lName, phone, child_name, visit_date, visit_length, characterid, street, city, zip, agree_tos, staffid, status) VALUES (${booking_id}, ${fname}, ${lname}, ${phone}, ${child_name}, ${visit_date}, ${visit_length}, ${characterid}, ${street}, ${city}, ${zip}, ${agreeTos}, 0, 'open');
    `
    return result;
}



module.exports = { getAllBookings, filterBookingsStaff, filterBookingsAdmin, updateStatus, updateStaffId, getBookingId, addBooking };