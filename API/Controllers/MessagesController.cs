using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IMessageRepository _messageRepository;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MessagesController(IMessageRepository messageRepository, DataContext context, IMapper mapper)
        {
            this._mapper = mapper;
            this._context = context;
            this._messageRepository = messageRepository;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var userId = User.GetUserId();

            if (userId == null) return NotFound();

            var sender = await _context.Users
                            .Include(p => p.Photos)
                            .SingleOrDefaultAsync(x => x.Id == userId);

            if (sender.UserName == createMessageDto.RecipientUsername.ToLower())
            {
                return BadRequest("You cannot send message to yourself!!!");
            }


            var recipient = await _context.Users
                                .Include(p => p.Photos)
                                .SingleOrDefaultAsync(x => x.UserName == createMessageDto.RecipientUsername);



            if (recipient == null) return NotFound();


            var message = new Message
            {
                Sender = sender,
                Recipeint = recipient,
                SenderUserName = sender.UserName,
                RecipeintUserName = recipient.UserName,
                Content = createMessageDto.Content
            };

            _messageRepository.addMessage(message);

            if (await _messageRepository.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));

            return BadRequest("Failed to send the Message!!");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();

            var messages = await _messageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);

            return messages;

            // Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalPages);
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetUsername();

            return Ok(await _messageRepository.GetMessageThread(currentUsername, username));
        }

    }
}