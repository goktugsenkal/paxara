using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            using var transaction = await context.Database.BeginTransactionAsync();

            try
            {
                if (!context.Products.Any())
                {
                    var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                    if (products != null)
                    {
                        // Insert ProductBrands first to avoid foreign key constraint issues
                        if (!context.ProductBrands.Any())
                        {
                            var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                            var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                            if (brands != null)
                            {
                                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT paxara.dbo.ProductBrands ON");
                                context.ProductBrands.AddRange(brands);
                                await context.SaveChangesAsync();
                                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT paxara.dbo.ProductBrands OFF");
                            }
                        }

                        // Insert ProductTypes next
                        if (!context.ProductTypes.Any())
                        {
                            var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                            var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                            if (types != null)
                            {
                                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT paxara.dbo.ProductTypes ON");
                                context.ProductTypes.AddRange(types);
                                await context.SaveChangesAsync();
                                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT paxara.dbo.ProductTypes OFF");
                            }
                        }

                        // Finally, insert Products
                        context.Products.AddRange(products);
                        await context.SaveChangesAsync();
                    }
                }

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

    }
}