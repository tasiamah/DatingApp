using System;
using API.Extensions;
using Xunit;
using Xunit.Abstractions;

namespace DatingUnitTests.Extensions
{
    public class DateTimeTests
    {
        [Fact]
        public void DateTimeExtensionCalculatesAgeCorrectly()
        {
            var myDateOfBirth = new DateTime(1995, 07, 06);
            var result = DateTimeExtensions.CalculateAge(myDateOfBirth);
            const int expected = 26;
            Assert.Equal(result, expected);
        }
        
        [Fact]
        public void InvalidDateOfBirthThrowsException()
        {
            var myDateOfBirth = new DateTime(2099, 07, 06);
            Assert.Throws<InvalidOperationException>(() => DateTimeExtensions.CalculateAge(myDateOfBirth));
        }
    }
}