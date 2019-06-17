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

        public int APIId { get; set; }

        [Required]
        [StringLength(256)]
        public string APIKey { get; set; }

        [Required]
        [StringLength(256)]
        public string Latitude { get; set; }

        [Required]
        [StringLength(256)]
        public string Longtitude { get; set; }

        public virtual APIs APIs { get; set; }

        public virtual AspNetUsers AspNetUsers { get; set; }
    }
}
