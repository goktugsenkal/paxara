using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        public IDatabase _database { get; }

        public BasketRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();

        }

        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await _database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var data = await _database.StringGetAsync(basketId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var created = await _database
            .StringSetAsync(basket.Id, JsonSerializer.Serialize(basket), TimeSpan.FromHours(2));

            if (!created) return null;

            return await GetBasketAsync(basket.Id);
        }
    }
}