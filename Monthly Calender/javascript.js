document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const monthYearDisplay = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    // Create header with days of the week
    function createCalendarHeader() {
        const header = document.createElement('div');
        header.className = 'calendar-header-days calendar';
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            header.appendChild(dayElement);
        });
        return header;
    }

    // Generate the calendar for the given month and year
    function generateCalendar(month, year) {
        // Clear previous calendar
        calendar.innerHTML = '';

        // Add calendar header
        calendar.appendChild(createCalendarHeader());

        const firstDay = new Date(year, month).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();

        let date = 1;

        // Update month-year display
        monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

        // Create cells for each day
        for (let i = 0; i < 6; i++) {
            // Create a new row
            const row = document.createElement('div');
            row.className = 'calendar';

            // Fill in the days
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    const emptyCell = document.createElement('div');
                    row.appendChild(emptyCell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const cell = document.createElement('div');
                    cell.textContent = date;
                    cell.className = 'calendar-day';

                    // Highlight today
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add('selected');
                    }

                    // Add click event to display selected date
                    cell.addEventListener('click', function () {
                        document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('selected'));
                        cell.classList.add('selected');
                        alert(`You selected: ${monthNames[month]} ${date}, ${year}`);
                    });

                    row.appendChild(cell);
                    date++;
                }
            }

            calendar.appendChild(row);
        }
    }

    // Initialize the calendar
    generateCalendar(currentMonth, currentYear);

    // Event listeners for navigating between months
    prevMonthButton.addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    nextMonthButton.addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });
});

