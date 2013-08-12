using NHibernate;
using NHibernate.Criterion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeSite.Dal
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        public void Add(T item)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    session.Save(item);
                    transaction.Commit();
                }
            }
        }

        public void Delete(T item)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    session.Delete(item);
                    transaction.Commit();
                }
            }
        }

        public IList<T> GetList()
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                return session.CreateCriteria<T>().List<T>();
            }
        }

        public IList<T> Query(ICriterion expression)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                return session.CreateCriteria<T>().Add(expression).List<T>();
            }
        }
    }
}
