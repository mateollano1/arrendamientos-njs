const { getDays, getFormatDate } = require('../helpers/email/emailHelper');

describe('Testing email helper', () => {
    test('Testing getDays', () => {
        const response = getDays('2020-05-05', '2020-05-15');
        expect(response).toEqual(10);
    });
    test('Testing getDays with checkin greater than checkout', () => {
        const response = getDays('2020-05-15', '2020-05-05');
        expect(response).toEqual(10);
    });
});