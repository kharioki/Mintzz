export function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-8 md:h-16 border-t">
      <a
        className="flex items-center justify-center text-sm"
        href="https://kharioki.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Built by{' '}
        <span className="font-bold ml-2 text-gray-300 hover:text-primary">@kharioki</span>
      </a>
    </footer>
  )
}
