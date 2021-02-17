using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleWare
    {
        private RequestDelegate _next;
        private ILogger<ExceptionMiddleWare> _logger;
        private IHostEnvironment _env;

        public ExceptionMiddleWare(RequestDelegate next, 
            ILogger<ExceptionMiddleWare> logger,
            IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }


        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
                Console.WriteLine(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                    ? new ApiExceptions(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new ApiExceptions(context.Response.StatusCode, "Internal Service Error");

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };
                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
    
    
}