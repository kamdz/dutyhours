import calculateWorkingHours, { Options } from '@@';

jest.mock('date-holidays', () =>
  jest.fn((country: string) => ({
    getHolidays: (year: number) => {
      if (country === 'US' && year === 2024) {
        return [{ date: '2024-11-28', type: 'public' }]; // Thanksgiving
      }
      return [];
    }
  }))
);

describe('calculateWorkingHours', () => {
  it('calculates working hours for default settings', () => {
    const options: Options = { country: 'US', month: 11, year: 2024 };
    const result = calculateWorkingHours(options);

    // November 2024: 21 weekdays - 1 holiday (Thanksgiving) = 20 working days
    expect(result).toBe(20 * 8);
  });

  it('calculates working hours with custom hours per day', () => {
    const options: Options = { country: 'US', month: 11, year: 2024, hoursPerDay: 6 };
    const result = calculateWorkingHours(options);

    // November 2024: 20 working days * 6 hours
    expect(result).toBe(20 * 6);
  });

  it('includes weekends as working days', () => {
    const options: Options = { country: 'US', month: 11, year: 2024, withSaturdays: true, withSundays: true };
    const result = calculateWorkingHours(options);

    // November 2024: 30 days - 1 holiday = 29 working days
    expect(result).toBe(29 * 8);
  });

  it('excludes specific weekdays', () => {
    const options: Options = { country: 'US', month: 11, year: 2024, withoutFridays: true };
    const result = calculateWorkingHours(options);

    // November 2024: 16 weekdays (excluding Fridays) - 1 holiday
    expect(result).toBe(15 * 8);
  });
});
