import { useForm } from '../../hooks';

export function BidModal({ current, itemId, handleClose, create }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    price: current,
  });

  const handleSubmit = () => {
    // console.log("inputs", inputs);
    const vals = {
      ...inputs,
      itemId
    }

    // handle create
    create(vals);

    // close modal
    handleClose();

    // clear form
    resetForm();
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

            <div className="mt-3 ml-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="flex flex-row items-center justify-between w-full border-b">
                <p className="text-sm text-primary leading-5">
                  Add a Bid.
                </p>
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-1 mb-2 rounded-md hover:border-2 hover:border-primary text-gray-400 hover:text-primary focus:outline focus:text-gray-500 transition duration-150 ease-in-out"
                  onClick={() => handleClose()}
                  aria-label="Close"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className='flex flex-col'>
                <div className="mt-2 sm:mt-0">
                  <form>
                    <label htmlFor="current-price" className="formLabel">Current Price</label>
                    <input
                      className="formInput"
                      id="current-price"
                      name="current-price"
                      type="number"
                      value={current}
                      disabled
                    />
                    <label htmlFor="price" className="formLabel">Bid Price</label>
                    <input
                      className="formInput"
                      id="price"
                      name="price"
                      step="0.01"
                      min={current}
                      type="number"
                      value={inputs.price}
                      onChange={handleChange}
                      required
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="px-2 py-3 sm:px-4 flex">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-xs font-medium text-white hover:bg-primary sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => handleSubmit()}
              >
                Add Bid
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-red-500 shadow-sm px-4 py-2 bg-white text-xs ml-2 font-medium text-red-500 hover:bg-gray-100 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => clearForm()}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
