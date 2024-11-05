using ProjectManagementWeb.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjectManagementWeb.Controllers
{
    public class UserController : Controller
    {

        // GET: User
        private QL_DAEntities db = new QL_DAEntities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DuAn(string sortOrder = "recent")
        {
            ViewBag.SortOrder = sortOrder;
            var listDuAn = db.DuAn.ToList();
            switch (sortOrder)
            {
                case "az":
                    listDuAn = listDuAn.OrderBy(d => d.TenDuAn).ToList();
                    break;
                case "za":
                    listDuAn = listDuAn.OrderByDescending(d => d.TenDuAn).ToList();
                    break;
                case "recent":
                    listDuAn = listDuAn.OrderByDescending(d => d.NgayBatDau).ToList();
                    break;
            }
            return View(listDuAn);
        }
        [HttpPost]
        public JsonResult CreateDuAn(string tenDuAn, string mauGradient, string quyenXem, DateTime? ngayKetThuc, decimal nganSach)
        {
            if (string.IsNullOrEmpty(tenDuAn))
            {
                return Json(new { success = false, message = "Tiêu đề dự án không được để trống" });
            }

            try
            {
                var newDuAn = new DuAn
                {
                    TenDuAn = tenDuAn,
                    MauGradient = mauGradient,
                    QuyenXem = quyenXem,
                    NgayBatDau = DateTime.Now,
                    NgayKetThuc = ngayKetThuc,
                    NganSach = nganSach
                };

                db.DuAn.Add(newDuAn);
                db.SaveChanges();

                return Json(new { success = true });
            }
            catch (DbUpdateException dbEx)
            {
                return Json(new { success = false, message = "Lỗi khi cập nhật dữ liệu: " + dbEx.InnerException?.Message ?? dbEx.Message });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Lỗi: " + ex.Message });
            }
        }


        public ActionResult ThanhVien()
        {
            if (Request.IsAjaxRequest())
            {
                return PartialView("_ThanhVienPartial"); // Trả về nội dung chính cho AJAX
            }
            return View(); // Trả về view đầy đủ cho các request thông thường
        }
        public ActionResult NhiemVu()
        {
            if (Request.IsAjaxRequest())
            {
                return PartialView("_NhiemVuPartial"); // Trả về nội dung chính cho AJAX
            }
            return View(); // Trả về view đầy đủ cho các request thông thường
        }
        public ActionResult Lich()
        {
            if (Request.IsAjaxRequest())
            {
                return PartialView("_LichPartial"); // Trả về nội dung chính cho AJAX
            }
            return View(); // Trả về view đầy đủ cho các request thông thường
        }
    }
}