namespace DatingApp.API.Helper
{
    public class PaginationHeader
    {
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public int TotalPages { get; set; }

        public PaginationHeader(int totalCount,int pageSize,int pageNumber,int totalPages )
        {
            this.TotalCount = totalCount;
            this.PageSize = pageSize;
            this.PageNumber = pageNumber;
            this.TotalPages = totalPages;
        }
    }
}