getDays = (checkin, checkout) => {
    let checkIn = new Date(checkin);
    let checkOut = new Date(checkout);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
getFormatDate = (date) => {
    let check = new Date(date);
    return `${check.getDate()}/${check.getMonth()+1}/${check.getFullYear()}`
}

module.exports = { getDays, getFormatDate }