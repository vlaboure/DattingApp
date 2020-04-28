using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DattingApp.api.Data;
using DattingApp.api.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DattingApp.api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // propriété type interface du repository d'accès au DbContext
        public IDattingRepository _repo { get; }
        private readonly IMapper _mapper;
        public UsersController(IDattingRepository repo, IMapper mapper)
        {
            _mapper = mapper;  
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            // users avec le mapping
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            // utilisation de automapp
            var userToReturn = _mapper.Map<UserForDetailDto>(user);
            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            // vérif si le token correspond à l'id reçu dans la requête
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) 
                return Unauthorized();
            var userFromRepo = await _repo.GetUser(id);
            // map paramètre source , paramètre dest
            _mapper.Map(userForUpdateDto, userFromRepo);
            if(await _repo.SaveAll())
                return NoContent();      
            throw new Exception($"Erreur sauvegarde id {id}");        
        }

    }
}