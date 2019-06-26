namespace Moja_stacja_pogodowa.Models.Database
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Config")]
    public partial class Config
    {
        public int Id { get; set; }

        [Required]
        [StringLength(128)]
        public string UserId { get; set; }

        [StringLength(256)]
        public string OWMKey { get; set; }

        [StringLength(256)]
        public string AWKey { get; set; }

        [StringLength(256)]
        public string WBKey { get; set; }

        public virtual AspNetUsers AspNetUsers { get; set; }
    }
}
