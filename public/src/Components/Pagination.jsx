

function Pagination({ itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => paginate(number)} className='bg-white hover:bg-greenP hover:text-white border border-greenP bg-opacity-50 backdrop-blur-sm rounded-lg gap-5 m-1 p-2'>
          {number}
        </button>
      ))}
    </div>
  );
}

export default Pagination;