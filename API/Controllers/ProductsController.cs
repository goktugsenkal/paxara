using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;
        public ProductsController(IGenericRepository<Product> productRepo,
        IGenericRepository<ProductBrand> productBrandRepo,
        IGenericRepository<ProductType> productTypeRepo,
        IMapper mapper)
        {
            _productRepo = productRepo;
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();

            var products = await _productRepo.ListAsync(spec);

            var productsToReturn = products.Select(product => _mapper.Map<Product, ProductToReturnDto>(product));
            return Ok(productsToReturn);
        }


        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product = await _productRepo.GetEntityWithSpec(spec);

            return _mapper.Map<Product?, ProductToReturnDto>(product);
        }

        [HttpGet]
        [Route("brands")]
        public async Task<IActionResult> GetProductBrands()
        {
            var productBrands = await _productBrandRepo.ListAllAsync();

            return Ok(productBrands);
        }
        [HttpGet]
        [Route("types")]
        public async Task<IActionResult> GetProductTypes()
        {
            var productTypes = await _productTypeRepo.ListAllAsync();

            return Ok(productTypes);
        }
    }
}
