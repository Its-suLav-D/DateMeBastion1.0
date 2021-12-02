using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob)
        {

            int age = 0;
            age = DateTime.Now.AddYears(-dob.Year).Year;
            return age;

        }
    }
}