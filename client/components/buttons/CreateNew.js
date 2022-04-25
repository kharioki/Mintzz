export function CreateNew({ handleShow }) {
  return (
    <button
      className="text-white bg-primary hover:bg-white hover:text-primary focus:outline-none font-medium rounded-full text-xs sm:text:sm px-3 py-3 text-center flex inline-flex items-center shadow-md"
      onClick={() => handleShow()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
      </svg>
      <span className="ml-2 hidden sm:block text-xs sm:text-sm font-mono">Create New</span>
    </button>
  )
}
