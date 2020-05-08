validateDates = (checkin, checkout) => {
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0);
    let checkIn = new Date(checkin);
    let checkOut = new Date(checkout);

    if (checkIn < checkOut && checkIn >= currentDate && checkIn !== undefined && checkOut !== undefined) {
        return true
    } else {

        return false
    }
}

module.exports = {
    validateDates
}