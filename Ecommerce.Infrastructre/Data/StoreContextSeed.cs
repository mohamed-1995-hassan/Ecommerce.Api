using Ecommerce.Core.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Ecommerce.Infrastructre.Data
{
    public class StoreContextSeed
    {
        public static void SeedData(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                //List<ProductBrand> productBrands = SeedBrands(context, "brands.json");
                //List<Product> products = SeedProducts(context, "products.json");
                //List<ProductType> productTypes = SeedTypes(context, "types.json");
            }
            catch (Exception ex) 
            {
                loggerFactory.CreateLogger<StoreContextSeed>().LogError(ex, "error occured");
            }
            
        }
        //private static List<Product> SeedProducts(StoreContext context, string path)
        //{
        //    var productBrand = File.ReadAllText($"../Ecommerce.Infrastructre/Data/SeedData/{path}");
        //    var brands = JsonSerializer.Deserialize<List<Product>>(productBrand);
        //}
        //private static List<ProductBrand> SeedBrands(StoreContext context, string path)
        //{
        //    var productBrand = File.ReadAllText($"../Ecommerce.Infrastructre/Data/SeedData/{path}");
        //    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(productBrand);
        //}
        //private static List<ProductType> SeedTypes(StoreContext context, string path)
        //{
        //    var productBrand = File.ReadAllText($"../Ecommerce.Infrastructre/Data/SeedData/{path}");
        //    var brands = JsonSerializer.Deserialize<List<ProductType>>(productBrand);
        //}
    }

}
