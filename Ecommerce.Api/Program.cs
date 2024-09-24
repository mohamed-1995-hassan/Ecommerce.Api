using Ecommerce.Api.Extentions;
using Ecommerce.Api.Middlewares;
using Ecommerce.Core.Interfaces;
using Ecommerce.Infrastructre.Data;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
	builder.AllowAnyOrigin()
		   .AllowAnyMethod()
		   .AllowAnyHeader();
}));

builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder
       .Services
       .AddDbContext<StoreContext>
       (opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddApplicationServices();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IConnectionMultiplexer, ConnectionMultiplexer>(opt =>
{
	var configuration = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"), true);
	return ConnectionMultiplexer.Connect(configuration);
});


var app = builder.Build();

app.UseStatusCodePagesWithReExecute("/errors/{0}");
app.UseMiddleware<ExceptionMiddleware>();
app.UseStaticFiles();


using (var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider;
    var logger = service.GetRequiredService<ILoggerFactory>();
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
        await context.Database.MigrateAsync();
    }
    catch(Exception ex)
    {
        var loggerFactory = logger.CreateLogger<Program>();
        loggerFactory.LogError(ex, "an error occured");
    }
    
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("MyPolicy");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
