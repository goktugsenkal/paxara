using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly StoreContext _context;
        public GenericRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<T?> GetByIdAsync(int id) // null dönebilir, sunumda kontrol sağla
        {
            return await _context.Set<T>().FindAsync(id);
        }


        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T?> GetEntityWithSpec(ISpecification<T> specification)
        {
            return await ApplySpecififation(specification).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> specification)
        {
            return await ApplySpecififation(specification).ToListAsync();
        }

        private IQueryable<T> ApplySpecififation(ISpecification<T> specification)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), specification);
        }
    }
}