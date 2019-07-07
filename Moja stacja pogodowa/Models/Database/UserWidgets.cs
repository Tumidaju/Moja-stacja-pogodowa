namespace Moja_stacja_pogodowa.Models.Database
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class UserWidgets
    {
        public int Id { get; set; }

        [Required]
        [StringLength(128)]
        public string UserId { get; set; }

        [Required]
        public int APIID { get; set; }

        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        [StringLength(256)]
        public string Lat { get; set; }

        [StringLength(256)]
        public string Lon { get; set; }

        [StringLength(256)]
        public string CityID { get; set; }

        [StringLength(256)]
        public string Duration { get; set; }

        public virtual AspNetUsers AspNetUsers { get; set; }
    }
}
