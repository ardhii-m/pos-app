import { formatRp } from "../utils/helpers";

function ProductCard({ product, onAdd }) {
  return (
    <button onClick={() => onAdd(product)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-blue-200 transition text-center w-full">
      <span className="text-3xl">{product.emoji}</span>
      <span className="text-sm font-semibold text-gray-700">{product.name}</span>
      <span className="text-sm text-blue-600 font-semibold">{formatRp(product.price)}</span>
    </button>
  );
}

export default ProductCard;