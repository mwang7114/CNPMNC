using ProjectManagementWeb.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;


namespace ProjectManagementWeb.Controllers
{
    public class RelogController : Controller
    {
        QL_DAEntities database = new QL_DAEntities();
        // GET: Relog
        public ActionResult Login()
        {
            var model = new NguoiDung(); // Khởi tạo đối tượng NguoiDung để tránh null
            return View(model); // Truyền model tới View
            //return View();
        }
        public ActionResult AuthenLogin(NguoiDung nguoiDung)
        {
            try
            {
                // Tìm người dùng trong cơ sở dữ liệu
                var check_email = database.NguoiDung.Where(u => u.Email == nguoiDung.Email).FirstOrDefault();
                var check_pass = database.NguoiDung.Where(u => u.MatKhau == nguoiDung.MatKhau).FirstOrDefault();
                // Tìm người dùng trong cơ sở dữ liệu
                var user = database.NguoiDung.FirstOrDefault(u => u.Email == nguoiDung.Email);
                if (check_email == null || check_pass == null)
                {
                    if (check_email == null)
                    {
                        ViewBag.ErrorEmail = "Email not match";
                    }
                    if (check_pass == null)
                    {
                        ViewBag.ErrorPass = "Password not match";
                    }
                    return View("Login");
                }

                // Kiểm tra vai trò của người dùng
                if (user.VaiTro == "Quản trị viên")
                {
                    // Đăng nhập thành công cho admin
                    return RedirectToAction("HomeAdmin", "Admin"); // Chuyển hướng đến dashboard của admin
                }
                else if (user.VaiTro == "Người dùng")
                {
                    // Đăng nhập thành công cho user
                    return RedirectToAction("Duan", "User"); // Chuyển hướng đến trang dành cho user
                }
                // Nếu không phải admin hoặc user, có thể xử lý thêm nếu cần
                ViewBag.ErrorRole = "User role not recognized.";
                return View("Login");
            }
            catch
            {
                return View("Login");
            }

        }

        public ActionResult Register()
        {
            var model = new NguoiDung(); // Khởi tạo đối tượng NguoiDung để tránh null
            return View(model); // Truyền model tới View

        }

        public ActionResult AuthenRegister(NguoiDung nguoiDung)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return View("Register", nguoiDung); // Trả về view với model đã nhập
                }

                // Kiểm tra xem mật khẩu và xác nhận mật khẩu có trùng khớp không
                if (nguoiDung.MatKhau != nguoiDung.NhapLaiMatKhau)
                {
                    ModelState.AddModelError("NhapLaiMatKhau", "Mật khẩu và xác nhận mật khẩu không khớp.");
                    return View("Register", nguoiDung); // Trả về view với thông tin đã nhập
                }

                // Gán thêm thuộc tính cần thiết cho người dùng
                nguoiDung.TenDangNhap = nguoiDung.Email;
                nguoiDung.VaiTro = "Người dùng";
                nguoiDung.NgayTao = DateTime.Now;

                // Thêm người dùng vào database
                database.NguoiDung.Add(nguoiDung);
                database.SaveChanges();

                return RedirectToAction("Login", "Relog");
            }
            catch (Exception ex)
            {
                // Ghi lỗi vào console
                System.Diagnostics.Debug.WriteLine($"Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    System.Diagnostics.Debug.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                ModelState.AddModelError("", "Đăng ký không thành công. Vui lòng thử lại.");
                return View("Register", nguoiDung); // Trả về view với model để giữ dữ liệu đã nhập
            }
        }

        public ActionResult ForgotPass()
        {
            return View();
        }

        public ActionResult Logout()
        {
            Session.Clear();
            Session.Abandon();
            return RedirectToAction("Login");
        }
    }
}

