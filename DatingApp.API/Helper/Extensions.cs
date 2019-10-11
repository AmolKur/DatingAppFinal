using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API
{
    public static class Extensions
    {
        public static void AddAppGlobalError(this HttpResponse response, string msg )
        {
            response.Headers.Add("Application-Error",msg);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");

        }

        public static int Age(this DateTime ageDOB )
        {
            var age =  DateTime.Now.Year - ageDOB.Year;
            if (ageDOB.AddYears(age) > DateTime.Now)
                age--;
            return age;

        }
    }
}