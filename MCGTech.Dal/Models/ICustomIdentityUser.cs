using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCGTech.Dal.Models
{
    public interface ICustomIdentityUser
    {
        string FirstName { get; set; }
        string LastName { get; set; }
    }
}
