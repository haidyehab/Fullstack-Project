using Microsoft.EntityFrameworkCore;
using Notes.Api.Models.Entities;

namespace Notes.Api.Data
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions options) : base(options)
        {
        }

        //public NotesDbContext(DbContextOptions<NotesDbContext> dbContext):base(dbContext)
        //{

        //}
        public DbSet<Note> Notes { get; set; }
    }
}
