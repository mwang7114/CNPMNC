/// <reference path="jslich.js" />

// Phần JavaScript cho tính năng tạo dự án

// Hàm để thay đổi màu nền
function changeBackgroundColor(color) {
    const backgroundSample = document.getElementById("backgroundSample");
    backgroundSample.style.background = color; // Cập nhật màu nền cho backgroundSample
    document.getElementById("createProjectModal").setAttribute("data-background", color); // Lưu màu đã chọn
}

// JavaScript để mở modal
document.querySelectorAll("#createProjectBtn").forEach(button => {
    button.onclick = function () {
        document.getElementById("createProjectModal").style.display = "flex"; // Mở modal
    };
});

// Đóng modal
document.querySelector(".close").onclick = closeModal;

window.onclick = function (event) {
    if (event.target == document.getElementById("createProjectModal")) {
        closeModal(); // Đóng modal khi click bên ngoài
    }
};

// Hàm để đóng modal
function closeModal() {
    document.getElementById("createProjectModal").style.display = "none";
}

// Hàm để thêm dự án vào sidebar
function addProjectToSidebar(projectTitle, backgroundColor) {
    const sidebar = document.querySelector('.sidebar');
    const newProject = document.createElement('div');
    newProject.style.display = "flex";
    newProject.style.alignItems = "center";
    newProject.style.marginBottom = "10px";

    const colorBox = document.createElement('div');
    colorBox.style.width = "20px";
    colorBox.style.height = "20px";
    colorBox.style.background = backgroundColor; // Đặt màu nền cho box
    colorBox.style.marginRight = "10px";
    colorBox.style.borderRadius = "5px";
    colorBox.style.flexShrink = "0"; // Ngăn không cho box co lại

    const projectName = document.createElement('span');
    projectName.classList.add('project-name');
    projectName.innerText = projectTitle;

    const starIcon = document.createElement('i');
    starIcon.classList.add('star', 'far', 'fa-star');
    starIcon.onclick = function () { toggleStar(this); }; // Gán sự kiện cho icon

    newProject.appendChild(colorBox);
    newProject.appendChild(projectName);
    newProject.appendChild(starIcon);

    sidebar.appendChild(newProject);
}

// Hàm để tạo bảng dự án mới trong giao diện
function createNewBoard(projectTitle, backgroundColor) {
    const newBoard = document.createElement('div');
    newBoard.classList.add('board');
    newBoard.style.background = backgroundColor;

    const boardTitle = document.createElement('h3');
    boardTitle.innerText = projectTitle;
    boardTitle.style.fontWeight = "bold"; // Đảm bảo tiêu đề được in đậm
    newBoard.appendChild(boardTitle);

    document.querySelector('.boards').appendChild(newBoard);

    addProjectToSidebar(projectTitle, backgroundColor);
}

// Gán sự kiện cho nút "Tạo mới" trong modal
document.getElementById("createProjectConfirm").onclick = function () {
    const projectTitle = document.getElementById("projectTitle").value.trim();
    const backgroundColor = document.getElementById("createProjectModal").getAttribute("data-background") || "linear-gradient(90deg, #56ab2f, #a8e063)";

    // Thay đổi cách lấy quyền xem từ select option
    const visibility = document.getElementById("projectVisibility").value;

    if (projectTitle === "") {
        $('#customAlert').show(); // Hiện thông báo nếu tiêu đề trống
        return;
    }

    $.ajax({
        url: '/User/CreateDuAn',
        type: 'POST',
        data: {
            tenDuAn: projectTitle,
            mauGradient: backgroundColor,
            quyenXem: visibility
        },
        success: function (response) {
            if (response.success) {
                createNewBoard(projectTitle, backgroundColor);
            } else {
                alert(response.message);
            }
        },
        error: function () {
            $('#customAlerts').show();
        }
    });

    closeModal();
    document.getElementById("projectTitle").value = "";
};

// Hàm tạo dự án từ sidebar
function createProjectFromSidebar() {
    const projectTitle = prompt("Nhập tên dự án:");
    const backgroundColor = prompt("Nhập màu nền cho dự án (mặc định là màu ngẫu nhiên):") || "linear-gradient(90deg, #56ab2f, #a8e063)";

    // Thay đổi cách lấy quyền xem từ select option nếu cần
    const visibility = "public"; // Hoặc có thể lấy từ một giá trị mặc định hoặc prompt

    if (projectTitle && projectTitle.trim() !== "") {
        $.ajax({
            url: '/User/CreateDuAn',
            type: 'POST',
            data: {
                tenDuAn: projectTitle,
                mauGradient: backgroundColor,
                quyenXem: visibility
            },
            success: function (response) {
                if (response.success) {
                    createNewBoard(projectTitle, backgroundColor);
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                $('#customAlerts').show();
            }
        });
    }
}

// Gán sự kiện cho nút tạo dự án trong sidebar
document.querySelectorAll('.sidebar .create-project-btn').forEach(button => {
    button.onclick = createProjectFromSidebar;
});

// Phần JavaScript cho tính năng lịch

let currentDate = new Date();
let currentView = 'month';

function renderCalendar() {
    const monthName = document.querySelector('.month-name');
    const daysContainer = document.querySelector('.days');
    if (!monthName || !daysContainer) {
        console.warn("Không tìm thấy các phần tử lịch.");
        return;
    }

    daysContainer.innerHTML = '';
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    monthName.textContent = `Tháng ${month + 1} ${year}`;

    if (currentView === 'month') {
        renderMonthView(month, year);
    } else if (currentView === 'week') {
        renderWeekView();
    }
}

function renderMonthView(month, year) {
    const daysContainer = document.querySelector('.days');
    daysContainer.innerHTML = '';
    const today = new Date();
    const firstDayOfMonth = new Date(year, month, 1);
    let startDay = firstDayOfMonth.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startDay; i++) {
        const emptyDiv = document.createElement('div');
        daysContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= lastDate; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('today');
        }

        daysContainer.appendChild(dayDiv);
    }
}

function renderWeekView() {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    const daysContainer = document.querySelector('.days');
    daysContainer.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        const dayDiv = document.createElement('div');
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(startOfWeek.getDate() + i);
        dayDiv.textContent = dayDate.getDate();

        const today = new Date();
        if (dayDate.toDateString() === today.toDateString()) {
            dayDiv.classList.add('today');
            const dot = document.createElement('span');
            dot.classList.add('today-dot');
            dayDiv.appendChild(dot);
        }

        if (dayDate.getMonth() === currentDate.getMonth()) {
            daysContainer.appendChild(dayDiv);
        }
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

    renderCalendar();
}

// Khởi tạo sự kiện khi tải trang
$(document).ready(function () {
    $(".section3").click(function (e) {
        e.preventDefault();
        var url = $(this).attr("href");

        $.ajax({
            url: url,
            type: "GET",
            success: function (data) {
                $('.content-main').html(data);
                initCalendarEvents();
            },
            error: function () {
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        });
    });

    initCalendarEvents();
});

// Kiểm tra và xác thực ngày
document.getElementById("startDate").addEventListener("blur", validateDate);
document.getElementById("endDate").addEventListener("blur", validateDate);

function validateDate(event) {
    const input = event.target;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Định dạng yyyy-mm-dd
    const [year, month, day] = input.value.split('-');

    // Kiểm tra định dạng và số lượng ký tự
    if (
        !input.value.match(datePattern) ||            // Kiểm tra định dạng yyyy-mm-dd
        input.value.length !== 10 ||                  // Đảm bảo chỉ có 10 ký tự
        parseInt(year) < 1000 || parseInt(year) > 9999 || // Kiểm tra số ký tự năm
        parseInt(month) < 1 || parseInt(month) > 12 || // Kiểm tra tháng hợp lệ
        parseInt(day) < 1 || parseInt(day) > 31       // Kiểm tra ngày hợp lệ
    ) {
        alert("Vui lòng nhập ngày theo định dạng yyyy-mm-dd (VD: 2024-10-31).");
        input.focus();
    }
}
