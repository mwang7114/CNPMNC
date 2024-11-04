using ProjectManagementWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using PagedList.Mvc;
using PagedList;


namespace ProjectManagementWeb.Controllers
{
    public class QLDAController : Controller
    {
        // GET: QLDA
        QL_DAEntities db = new QL_DAEntities();
        public ActionResult QLDuAn(int? page)
        {
            int pageSize = 5;
            int pageNumber = (page ?? 1);
            return View(db.DuAn.OrderBy(n => n.DuAnID).ToList().ToPagedList(pageNumber, pageSize));
        }
        public ActionResult Create()
        {

            return View();
        }
        [HttpPost]
        public ActionResult Create(DuAn duan)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.DuAn.Add(duan);
                    db.SaveChanges();
                    return RedirectToAction("QLDuAn");
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Có lỗi xảy ra khi tạo mới dự án: " + ex.Message);
                }
            }
            return View(duan);
        }

        public ActionResult Edit(int id)
        {
            var duAn = db.DuAn.FirstOrDefault(s => s.DuAnID == id);
            if (duAn == null)
            {
                return HttpNotFound();
            }
            return View(duAn);
        }
        [HttpPost]
        public ActionResult Edit(int id, DuAn duan)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.Entry(duan).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    return RedirectToAction("QLDuAn");
                }
                catch
                {
                    ModelState.AddModelError("", "Có lỗi xảy ra khi cập nhật dự án.");
                }
            }
            return View(duan);
        }
        public ActionResult Delete(int id)
        {
            var duAn = db.DuAn.FirstOrDefault(s => s.DuAnID == id);
            if (duAn == null)
            {
                return HttpNotFound();
            }
            return View(duAn);
        }
        [HttpPost]
        public ActionResult Delete(int id, DuAn duan)
        {
            duan = db.DuAn.Where(s => s.DuAnID == id).FirstOrDefault();
            db.DuAn.Remove(duan);
            db.SaveChanges();
            return RedirectToAction("QLDuAn");
        }
    }
}