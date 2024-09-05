using System.ComponentModel.DataAnnotations;
using CoffeeShop.Models;

namespace CoffeeShop.Models
{
    public class Coffee
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Title { get; set; }

        [Required]
        public int BeanVarietyId { get; set; }

        public BeanVariety BeanVariety { get; set; }
    }
}
