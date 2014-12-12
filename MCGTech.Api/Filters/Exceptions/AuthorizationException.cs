using System;

namespace MCGTech.Api.Filters.Exceptions
{
    public class AuthorizationException : Exception
    {
        public AuthorizationException(string message, Exception ex = null)
            : base(message, ex)
        {
        }
    }
}