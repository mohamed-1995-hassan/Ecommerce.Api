﻿
using AutoMapper;
using Ecommerce.Api.Dtos;
using Ecommerce.Core.Entities;
using Ecommerce.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
	public class BasketController : BaseController
	{
		private readonly IBasketRepository _basketRepository;
		private readonly IMapper _mapper;
        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
			_basketRepository = basketRepository;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
		{
			var basket = await _basketRepository.GetBasketAsync(id);
			return Ok(basket ?? new CustomerBasket(id));
		}

		[HttpPost]
		public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
		{
			var customerBasket = _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);
			var updatedBasket = await _basketRepository.UpdateBasketAsync(customerBasket);
			return Ok(updatedBasket);
		}

		[HttpDelete]
		public async Task DeleteBasket(string id)
		{
			var deletedBasket = await _basketRepository.DeleteBasketAsync(id);
		}
	}
}
