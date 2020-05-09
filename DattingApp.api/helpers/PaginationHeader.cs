namespace DattingApp.api.helpers
{
    // classe d'éléments nécéssaires pour le header de la requête http
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int ItemPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

        public PaginationHeader(int current, int item, int totItems, int totPages)
        {
            CurrentPage = current;
            ItemPerPage = item;
            TotalItems = totItems;
            TotalPages = totPages;
        }
    }
}