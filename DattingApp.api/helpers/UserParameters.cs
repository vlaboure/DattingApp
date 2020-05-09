namespace DattingApp.api.helpers
{
    public class UserParameters
    {
        public int PageNumber { get; set; }=1;
        private int maxPageSize = 50;
        
        private int pageSize = 10;

        public int PageSize
        {
            get {return pageSize;}
            set {pageSize = (value > maxPageSize)? maxPageSize : value; }
        }

    }
}