import { formatRp } from "../utils/helpers";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex items-start justify-between px-4 py-3 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <span className="text-xl">{item.emoji}</span>
        <div>
          <p className="text-sm font-semibold text-gray-700">{item.name}</p>
          <p className="text-xs text-gray-400">{formatRp(item.price)} / pcs</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <p className="text-sm font-bold text-blue-600">{formatRp(item.price * item.qty)}</p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDecrease(item.id)}
            className="w-6 h-6 rounded-md border border-gray-200 text-gray-500 text-sm hover:bg-gray-100 transition flex items-center justify-center"
          >−</button>
          <span className="w-5 text-center text-sm font-semibold text-gray-700">{item.qty}</span>
          <button
            onClick={() => onIncrease(item.id)}
            className="w-6 h-6 rounded-md border border-gray-200 text-gray-500 text-sm hover:bg-gray-100 transition flex items-center justify-center"
          >+</button>
          <button
            onClick={() => onRemove(item.id)}
            className="w-6 h-6 rounded-md bg-red-50 text-red-400 text-xs hover:bg-red-100 transition flex items-center justify-center ml-1"
          >✕</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;