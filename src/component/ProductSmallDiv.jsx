export const ProductDiv = (props) => {
  return(
    <div className="flex items-center gap-5 bg-[#E8E8E84D] p-3 mt-5">
      <img src="/assets/img/image31.png" alt="product image" className="w-40 h-40"/>
        <div className="flex flex-col gap-3 items-left">
          <span className="bg-red-600 px-3 rounded-xl w-25 text-white">Flash Sale</span>
          <h3>Hazelnut Latte</h3>
          <p>2pcs   |   Regular   |   Ice   |   Dine In</p>
          <div className="flex gap-2">
            <span className="text-red-400"><del>IDR 20.000</del></span>
            <span>IDR10.000</span>
          </div>
        </div>
      {props.children}
    </div>
  )
}