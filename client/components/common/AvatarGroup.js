export function AvatarGroup() {
  return (
    <div className="flex">
      <img
        src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
        className="w-8 h-8 rounded-xl border border-gray-100"
      />
      <img
        src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
        className="w-8 h-8 rounded-xl border border-gray-100 -ml-3"
      />
      <img
        src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
        className="w-8 h-8 rounded-xl border border-gray-100 -ml-3"
      />
      <span
        className="flex items-center justify-center font-semibold text-gray-600 text-xs w-8 h-8 rounded-full bg-gray-200 border-2 border-white -ml-3"
      >
        +3
      </span>
    </div>
  )
}
