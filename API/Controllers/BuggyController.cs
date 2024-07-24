using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;

        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("notfound")]
        public IActionResult GetNotFoundRequest()
        {
            var thing = _context.Products.Find(42);
            if (thing is null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok();
        }
        [HttpGet]
        [Route("server")]
        public IActionResult GetServerError()
        {
            var thing = _context.Products.Find(244);
            var thingToReturn = thing.ToString();
            return Ok();
        }
        [HttpGet]
        [Route("badrequest")]
        public IActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }
        [HttpGet]
        [Route("badrequest/{id}")]
        public IActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}