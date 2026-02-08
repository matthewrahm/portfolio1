export default function BrowserMockup({ url, children }) {
  return (
    <div className="rounded-lg overflow-hidden browser-mockup-glow">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a24] border-b border-white/5">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        </div>
        {url && (
          <div className="flex-1 ml-2">
            <div className="surface-inset rounded-md px-3 py-1 text-xs text-[#666] truncate max-w-[280px]">
              {url}
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="bg-[#0a0a0f]">
        {children}
      </div>
    </div>
  );
}
