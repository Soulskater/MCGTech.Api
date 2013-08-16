using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeSite.Dal
{
    public interface IRepository
    {
        void Add<T>(T item) where T : class;
    }
}
