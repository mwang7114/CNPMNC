function renderCalendar() {
    // Kiểm tra nếu monthName và daysContainer tồn tại trước khi thực thi
    const monthName = document.querySelector('.month-name');
    const daysContainer = document.querySelector('.days');
    if (!monthName || !daysContainer) {
        console.warn("Không tìm thấy các phần tử lịch.");
        return;
    }

    daysContainer.innerHTML = ''; // Xóa hết các ngày hiện tại
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    monthName.textContent = `Tháng ${month + 1} ${year}`;

    if (currentView === 'month') {
        renderMonthView(month, year);
    } else if (currentView === 'week') {
        renderWeekView();
    }
}

function initCalendarEvents() {
    document.querySelector('.prev-btn')?.addEventListener('click', () => {
        if (currentView === 'month') {
            currentDate.setMonth(currentDate.getMonth() - 1);
        } else if (currentView === 'week') {
            currentDate.setDate(currentDate.getDate() - 7);
        }
        renderCalendar();
    });

    document.querySelector('.next-btn')?.addEventListener('click', () => {
        if (currentView === 'month') {
            currentDate.setMonth(currentDate.getMonth() + 1);
        } else if (currentView === 'week') {
            currentDate.setDate(currentDate.getDate() + 7);
        }
        renderCalendar();
    });

    document.querySelector('.week-view-btn')?.addEventListener('click', () => {
        currentView = 'week';
        renderCalendar();
    });

    document.querySelector('.month-view-btn')?.addEventListener('click', () => {
        currentView = 'month';
        renderCalendar();
    });

    document.querySelector('.today-btn')?.addEventListener('click', () => {
        currentDate = new Date();
        renderCalendar();
    });

    // Hiển thị lịch khi tải trang
    renderCalendar();
}
});
