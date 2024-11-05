using ProjectManagementWeb.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjectManagementWeb.Controllers
{
    public class RelogController : Controller
    {
        // GET: Relog
        QL_DAEntities database = new QL_DAEntities();
        public ActionResult Login()
        {
            return View();
        }


        public ActionResult Register()
        {
            return View();
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