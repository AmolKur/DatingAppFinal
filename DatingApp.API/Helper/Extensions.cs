using System;
using DatingApp.API.Helper;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

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
         public static void AddPaginationHeader(this HttpResponse response, 
         int totalCount,int pageSize,int pageNumber,int totalPages )
        {
            var paginationHeader = new PaginationHeader(totalCount,pageSize,pageNumber,totalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("PaginationHeader",JsonConvert.SerializeObject(paginationHeader,camelCaseFormatter));
            response.Headers.Add("Access-Control-Expose-Headers", "PaginationHeader");
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