using Ecommerce.Core.Interfaces;
using Ecommerce.Infrastructre.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder
       .Services
       .AddDbContext<StoreContext>
       (opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider;
    var logger = service.GetRequiredService<ILoggerFactory>();
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
        await context.Database.MigrateAsync();
        StoreContextSeed.SeedData(context, logger);
        context.SaveChanges();
    }
    catch(Exception ex)
    {
        var loggerFactory = logger.CreateLogger<Program>();
        loggerFactory.LogError(ex, "an error occured");
    }
    
}

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
