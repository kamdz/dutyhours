import Holidays from 'date-holidays';

export interface Options {
  /**
   * The country code to determine the public holidays.
   * For example, 'US' for United States, 'PL' for Poland, etc.
   * @type {string}
   */
  country: string;

  /**
   * The number of working hours in a single working day.
   * @type {number}
   * @default 8
   *
   */
  hoursPerDay?: number;

  /**
   * Whether to include Mondays as working days.
   * @type {boolean}
   * @default true
   */
  withMondays?: boolean;

  /**
   * Whether to include Tuesdays as working days.
   * @type {boolean}
   * @default true
   */
  withTuesdays?: boolean;

  /**
   * Whether to include Wednesdays as working days.
   * @type {boolean}
   * @default true
   */
  withWednesdays?: boolean;

  /**
   * Whether to include Thursdays as working days.
   * @type {boolean}
   * @default true
   */
  withThursdays?: boolean;

  /**
   * Whether to include Fridays as working days.
   * @type {boolean}
   * @default true
   */
  withFridays?: boolean;

  /**
   * Whether to include Saturdays as working days.
   * @type {boolean}
   * @default false
   */
  withSaturdays?: boolean;

  /**
   * Whether to include Sundays as working days.
   * @type {boolean}
   * @default false
   */
  withSundays?: boolean;

  /**
   * Whether to exclude Mondays from working days.
   * @type {boolean}
   * @default false
   */
  withoutMondays?: boolean;

  /**
   * Whether to exclude Tuesdays from working days.
   * @type {boolean}
   * @default false
   */
  withoutTuesdays?: boolean;

  /**
   * Whether to exclude Wednesdays from working days.
   * @type {boolean}
   * @default false
   */
  withoutWednesdays?: boolean;

  /**
   * Whether to exclude Thursdays from working days.
   * @type {boolean}
   * @default false
   */
  withoutThursdays?: boolean;

  /**
   * Whether to exclude Fridays from working days.
   * @type {boolean}
   * @default false
   */
  withoutFridays?: boolean;

  /**
   * Whether to exclude Saturdays from working days.
   * @type {boolean}
   * @default true
   */
  withoutSaturdays?: boolean;

  /**
   * Whether to exclude Sundays from working days.
   * @type {boolean}
   * @default true
   */
  withoutSundays?: boolean;

  /**
   * The month (indexed from 1 to 12) to calculate working hours for. Defaults to the current month.
   * @type {number}
   */
  month?: number;

  /**
   * The year to calculate working hours for. Defaults to the current year.
   * @type {number}
   */
  year?: number;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

type DayName = (typeof DAY_NAMES)[number];

function isWorkingDay(dayIndex: number, options: Options): boolean {
  const dayName = DAY_NAMES[dayIndex] as DayName;

  if (options[`without${String(dayName)}s` as keyof Options]) return false;
  if (options[`with${String(dayName)}s` as keyof Options]) return true;

  return dayIndex >= 1 && dayIndex <= 5;
}

/**
 * Calculates the total number of working hours in the current month based on the given options.
 * @param options Configuration options
 * @returns Total working hours
 */
function calculateWorkingHours(options: Options): number {
  const today = new Date();
  const { country, hoursPerDay = 8, month = today.getMonth() + 1, year = today.getFullYear() } = options;
  const hd = new Holidays(country);

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);

  const holidays = new Set(
    hd
      .getHolidays(year)
      .filter(({ date, type }) => {
        const holidayDate = new Date(date);
        return holidayDate >= startOfMonth && holidayDate <= endOfMonth && type !== 'observance';
      })
      .map(({ date }) => new Date(date).toDateString())
  );

  let workingHours = 0;

  for (let day = 1; day <= endOfMonth.getDate(); day++) {
    const currentDate = new Date(year, month - 1, day);
    const dayIndex = currentDate.getDay();

    if (!holidays.has(currentDate.toDateString()) && isWorkingDay(dayIndex, options)) {
      workingHours += hoursPerDay;
    }
  }

  return workingHours;
}

export default calculateWorkingHours;
