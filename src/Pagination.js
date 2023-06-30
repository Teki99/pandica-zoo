const Pagination = ({postsPerPage,totalPosts,paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++)
    {
        pageNumbers.push(i);
    }
    return ( 
        <nav>
            <div className="pagination-ul">
                <ul className="pagination">
                    {pageNumbers.map(number =>(
                        <li key={number} className="page-item">
                            <button onClick={() => paginate(number)} className="pagination-button">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
           
        </nav>
    );
}
 
export default Pagination;