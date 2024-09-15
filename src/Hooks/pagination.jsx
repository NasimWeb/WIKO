import  { useState } from 'react';

const Pagination = ({
  totalItems,
  itemsPerPage,
  pagesPerGroup,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage); // محاسبه تعداد کل صفحات
  const [currentGroup, setCurrentGroup] = useState(0); // گروه فعلی صفحات

  // محاسبه صفحات فعلی که باید نمایش داده شوند
  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const handlePrevGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='flex'>
      <button
        onClick={handlePrevGroup}
        disabled={currentGroup === 0}
        className=" px-4 py-2 text-white mx-1 justify-center"
        style={{ color : '#fff' ,
          background : "var(--color-primary)" , border: '1px solid #eef0f6', borderRadius : '5px' ,     height: '50px',
          width: '50px'}}
      >
       <i className="fa-solid fa-angles-left text-white"></i>
      </button>

      {/* نمایش صفحات از startPage تا endPage */}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`relative pagination justify-center z-10 inline-flex items-center px-4 py-2 text-sm font-semibold mx-1 ${
            currentPage === page ? 'active  text-white bg-main'  : ''
          }`}
          style={{border: '1px solid #eef0f6' ,borderRadius : '5px' , height: '50px',
            width: '50px'}}
        >
          {page}
          
        </button>
      ))}

      <button
        onClick={handleNextGroup}
        disabled={endPage === totalPages}
        className=" px-4 py-2 text-white mx-1 justify-center"
        style={{ color : 'white' ,
          backgroundColor: 'var(--color-primary)', border: '1px solid #eef0f6', borderRadius : '5px' , height: '50px',
          width: '50px'}}
      >
         <i className="fa-solid fa-angles-right text-white"></i>
      </button>
    </div>
  );
};

export default Pagination;