

export const Pagination = ({currentPage, totalPages, setCurrentPage}) => {
  
  const pages = [...Array(totalPages)].map((_, i) => i + 1)

  return (
    <div className="flex gap-3">
      {pages.map(page => (
        <div
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`rounded-full w-6 flex justify-center cursor-pointer ${currentPage === page ? "bg-[#FF8906] text-white" : "bg-[#E8E8E8] text-[#A0A3BD]"}`}
        >
          {page}
        </div>
      ))}

      {currentPage < totalPages && (
        <div
        onClick={() => setCurrentPage(currentPage + 1)} 
        className="bg-[#FF8906] text-white rounded-full w-6 flex justify-center cursor-pointer"
        >
          &#8594;
        </div>
      )}
    </div>
  )
}
