const { validateDates } = require('../helpers/datesHelpers');

describe('Testing validate dates', () => {
  test('Testing validate dates with valid dates', () => {
    const response = validateDates('2021-05-31', '2021-06-08');
    expect(response).toBe(true);
  });
  test('Testing validate dates with invalid checkin date', () => {
    const response = validateDates('2020-05-22', '2020-06-08');
    expect(response).toBe(false);
  });
  test('Testing validate dates with invalid checkout date', () => {
    const response = validateDates('2021-05-22', '2021-05-20');
    expect(response).toBe(false);
  });
  test('Testing validate dates with undefined checkin date', () => {
    const response = validateDates(undefined, '2021-05-20');
    expect(response).toBe(false);
  });
  test('Testing validate dates with undefined checkout date', () => {
    const response = validateDates('2021-05-31', undefined);
    expect(response).toBe(false);
  });
});
