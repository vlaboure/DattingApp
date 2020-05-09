using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.api.helpers
{
    public class PagedList<T> : List<T>
    {
        // liste des photos avec nombre de photos par page
        //...
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        
        // méthode pour renseigner les propriétés et ajouter une item à la classe 
        public PagedList(List<T>items, int current, int size, int count)
        {
            CurrentPage = current;
            TotalPages = (int)Math.Ceiling(Count/(double)size);
            PageSize = size;
            TotalCount = count;
            this.AddRange(items);
        }

        // methode pour retourner un objet de type PagedList
        // IQueryable pour le linq dans l'objet passé dans source 
        // taille page et page courrante 
        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source,
                     int pageSize, int page)
        {
            // nombre d'éléments
            var count = await source.CountAsync();
            // Skip (depart).Take(nombre d'éléments)
            var items = await source.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            // retour de l'objet
            return new PagedList<T>(items, page, pageSize, count);
        }
    }
}