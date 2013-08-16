using NHibernate;
using NHibernate.Criterion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeSite.Dal
{
    public class Repository : IDisposable, IRepository
    {
        private ISession session = NHibernateHelper.OpenSession();

        public void Add<T>(T item) where T : class
        {
            using (ITransaction transaction = session.BeginTransaction())
            {
                session.Save(item);
                transaction.Commit();
            }
        }

        public void Delete<T>(T item) where T : class
        {
            using (ITransaction transaction = session.BeginTransaction())
            {
                session.Delete(item);
                transaction.Commit();
            }
        }

        public IList<T> GetList<T>() where T : class
        {
            return session.CreateCriteria<T>().List<T>();
        }

        public IList<T> Query<T>(ICriterion expression) where T : class
        {
            return session.CreateCriteria<T>().Add(expression).List<T>();
        }

        public void Dispose()
        {
            session.Dispose();
        }
    }
}
