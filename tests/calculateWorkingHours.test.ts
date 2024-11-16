import calculateWorkingHours from '@@';
import Holidays from 'date-holidays';

describe('calculateWorkingHours', () => {
  let holidaysInDecember;

  beforeAll(() => {
    holidaysInDecember = new Holidays('PL').getHolidays(2024).filter(holiday => holiday.date.startsWith('2024-12'));
  });

  it('should correctly calculate working hours with default options in December for PL', () => {
    const expectedWorkingHours = (22 - holidaysInDecember.length) * 8;

    expect(
      calculateWorkingHours({
        country: 'PL',
        month: 12
      })
    ).toBe(expectedWorkingHours);
  });
  it('should correctly calculate working hours based on hoursPerDay', () => {
    const expectedWorkingHours = (22 - holidaysInDecember.length) * 6;

    expect(
      calculateWorkingHours({
        country: 'PL',
        month: 12,
        hoursPerDay: 6
      })
    ).toBe(expectedWorkingHours);
  });
  it('should correctly calculate working hours when weekends are included', () => {
    const expectedWorkingHours = (31 - holidaysInDecember.length) * 8;

    expect(
      calculateWorkingHours({
        country: 'PL',
        month: 12,
        withSaturdays: true,
        withSundays: true
      })
    ).toBe(expectedWorkingHours);
  });

  it('should correctly calculate working hours when Fridays are free', () => {
    const expectedWorkingHours = (22 - holidaysInDecember.length - 4) * 8;

    expect(
      calculateWorkingHours({
        country: 'PL',
        month: 12,
        withoutFridays: true
      })
    ).toBe(expectedWorkingHours);
  });
});
