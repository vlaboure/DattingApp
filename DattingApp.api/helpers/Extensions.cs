using System;
using Microsoft.AspNetCore.Http;

namespace DattingApp.api.helpers
{
    public static class Helpers
    {
        public static void AddApplicationHelper(this HttpResponse response,string message)
        {
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }

        public static int CalcAge(this DateTime theDateTime)// this DateTime theDateTime-->appel à travers objet
            // dans AutoMapperProfiles : =>src.DateOfBirth.CalcAge() --- src pointe sur User
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            // si l'année de naissance + age > date actuelle anniversaire pas encore arrivé on decrémente
            if (theDateTime.AddYears(age) > DateTime.Today)
                age--;
            return age;
        }
    }
}



  