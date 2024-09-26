using Ecommerce.Core.Entities.Identity;

namespace Ecommerce.Api.Dtos
{
	public class AddressDto
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Street { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public string ZipCode { get; set; }
		public string AppUserId { get; set; }
		public AppUser AppUser { get; set; }
	}
}
