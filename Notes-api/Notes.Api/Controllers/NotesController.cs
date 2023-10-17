using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes.Api.Data;
using Notes.Api.Models.Entities;

namespace Notes.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        private readonly NotesDbContext _notesDbContext;

        public NotesController(NotesDbContext notesDbContext)
        {
            _notesDbContext = notesDbContext;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetAllNotes()
        //{
        //    //Get the notes from th database
        //     return Ok(await _notesDbContext.Notes.ToListAsync());

        //}

        [HttpGet]
        public async Task<IActionResult> GetAllNotes()
        {
            var notes = await _notesDbContext.Notes.ToListAsync();
            return Ok(notes);

        }

        [HttpGet]
        [Route("{id:Guid}")]
        [ActionName("GetNoteById")]
        public async Task<IActionResult> GetNoteById([FromRoute] Guid id)
        {
            //await _notesDbContext.Notes.FirstOrDefaultAsync(x => x.Id == id);
           
           var note = await _notesDbContext.Notes.FindAsync(id);
            if(note == null)
            {
                return NotFound();
            }
            return Ok(note);
        }


        [HttpPost]
        public async Task<IActionResult> AddNote(Note note)
        {
            note.Id = Guid.NewGuid();
            await _notesDbContext.Notes.AddAsync(note);
            await _notesDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetNoteById),new {id =note.Id},note);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateNote([FromRoute] Guid id, [FromBody] Note updatedNote)
        {
            var existingNote = await _notesDbContext.Notes.FindAsync(id);
            if(existingNote == null)
            {
                return NotFound();
            }
            existingNote.Title = updatedNote.Title;
            existingNote.Description = updatedNote.Description;
            existingNote.IsVisible = updatedNote.IsVisible;

            await _notesDbContext.SaveChangesAsync();
            return Ok(existingNote);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var existingNote = await _notesDbContext.Notes.FindAsync(id);
            if(existingNote == null)
            {
                return NotFound();
            }
            _notesDbContext.Notes.Remove(existingNote);
            await _notesDbContext.SaveChangesAsync();
            return Ok();
        }


    }
}
