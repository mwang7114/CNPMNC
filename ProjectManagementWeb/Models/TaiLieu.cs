//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProjectManagementWeb.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TaiLieu
    {
        public int TaiLieuID { get; set; }
        public int DuAnID { get; set; }
        public string TenFile { get; set; }
        public string DuongDan { get; set; }
        public System.DateTime NgayTaiLen { get; set; }
        public int NguoiTaiLenID { get; set; }
    
        public virtual DuAn DuAn { get; set; }
        public virtual NguoiDung NguoiDung { get; set; }
    }
}
