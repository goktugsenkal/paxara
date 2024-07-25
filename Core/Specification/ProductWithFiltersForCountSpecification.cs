using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParameters parameters)
            : base(x =>
                (string.IsNullOrEmpty(parameters.Search) || x.Name.ToLower().Contains(parameters.Search)) &&
                (!parameters.BrandId.HasValue || x.ProductBrandId == parameters.BrandId) &&
                (!parameters.TypeId.HasValue || x.ProductTypeId == parameters.TypeId)
            )
        {
        }
    }
}