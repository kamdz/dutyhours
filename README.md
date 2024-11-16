# 🕒 DutyHours

A flexible tool for calculating the total number of working hours in a given month, considering public holidays and customizable working days. This library allows you to specify which days of the week should be considered as working days and accounts for holidays.

## 🚀 Features

- **Customizable working days** – Choose which days of the week should be considered working days.
- **Flexible working hours** – Set the number of working hours per day.
- **Holiday handling** – Include public holidays from your country.
- **Configurable month and year** – Specify the month and year for which you want to calculate working hours.

## 🛠️ Installation

```bash
npm install dutyhours
```

## 📖 Usage

### JavaScript/TypeScript

```javascript
import calculateWorkingHours from 'dutyhours';

// Basic usage
const workingHours = calculateWorkingHours({ country: 'PL' });
console.log(`Total working hours: ${workingHours}`);

// More custom usage
const customWorkingHours = calculateWorkingHours({
  country: 'PL',
  hoursPerDay: 6,
  withSaturdays: true,
  withoutThursdays: true,
  month: 5, // May
  year: 2024
});
console.log(`Total working hours: ${customWorkingHours}`);
```

### Command Line Interface (CLI)

You can also use it via the command line:

```bash
# Calculate working hours for PL in the current month
npx dutyhours PL

# More custom calculations...
npx dutyhours PL --month 5 --year 2024
npx dutyhours PL --withSaturdays --hours 6
npx dutyhours PL --withoutFridays
```

## 🔧 API

### `calculateWorkingHours(options: Options): number`

Calculates the total number of working hours in the given month, considering public holidays and configurable working days.

- `options` (object):
  - `country` (string): The country code to determine the public holidays. In [ISO 3166-1 alpha-2 format](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). For example, 'US' for United States, 'PL' for Poland, etc.
  - `hoursPerDay` (number, optional): The number of working hours per day. Defaults to 8.
  - `withMondays`, `withTuesdays`, `withWednesdays`, `withThursdays`, `withFridays`, `withSaturdays`, `withSundays` (boolean, optional): Whether to include these days as working days. Defaults to true for weekdays, false for weekends.
  - `withoutMondays`, `withoutTuesdays`, `withoutWednesdays`, `withoutThursdays`, `withoutFridays`, `withoutSaturdays`, `withoutSundays` (boolean, optional): Whether to exclude these days from working days.
  - `month` (number, optional): The month to calculate working hours for (1 to 12). Defaults to the current month.
  - `year` (number, optional): The year to calculate working hours for. Defaults to the current year.
