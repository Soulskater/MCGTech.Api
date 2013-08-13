using NHibernate;
using NHibernate.Criterion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeSite.Dal
{
    public class Repository<T> : IDisposable, IRepository<T> where T : class
    {
        private ISession session = NHibernateHelper.OpenSession();

        public void Add(T item)
        {
            using (ITransaction transaction = session.BeginTransaction())
            {
                session.Save(item);
                transaction.Commit();
            }
        }

        public void Delete(T item)
        {
            using (ITransaction transaction = session.BeginTransaction())
            {
                session.Delete(item);
                transaction.Commit();
            }
        }

        public IList<T> GetList()
        {
            return session.CreateCriteria<T>().List<T>();
        }

        public IList<T> Query(ICriterion expression)
        {
            return session.CreateCriteria<T>().Add(expression).List<T>();
        }

        public void Dispose()
        {
            session.Dispose();
        }
    }
}
