using DattingApp.api.Models;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext>options): base(options) {}
        public DbSet<Value> Values { get; set; }//values == table name
        public DbSet<User> Users  { get; set; }
        public DbSet <Photo> Photos { get; set; }
    }
}