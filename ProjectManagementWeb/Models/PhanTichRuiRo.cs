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
    
    public partial class PhanTichRuiRo
    {
        public int RuiRoID { get; set; }
        public int DuAnID { get; set; }
        public string MoTaRuiRo { get; set; }
        public string MucDoRuiRo { get; set; }
        public System.DateTime NgayTao { get; set; }
    
        public virtual DuAn DuAn { get; set; }
    }
}