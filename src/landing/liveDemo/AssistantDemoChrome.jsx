'use client'

export function AssistantDemoChrome({ children, composer, hideFooter, messagesScrollRef }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#f4f4f5]">
      <div
        ref={messagesScrollRef}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain px-3 py-3 sm:px-4 sm:py-4"
      >
        {children}
      </div>

      {!hideFooter ? (
        <div className="shrink-0 border-t border-zinc-200/80 bg-white px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4 sm:pt-3">
          <div className="relative mx-auto max-w-2xl">
            {composer ? (
              <div className="flex items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50/90 py-1.5 pl-4 pr-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                <span className="min-w-0 flex-1 truncate text-left text-[13px] text-zinc-800 sm:text-[14px]">
                  {composer.value}
                </span>
                <button
                  type="button"
                  onClick={composer.onSend}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-200/90 text-zinc-800 transition hover:bg-zinc-300/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  aria-label="Send message"
                >
                  ↑
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50/90 py-1.5 pl-4 pr-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                <span className="min-w-0 flex-1 truncate text-[13px] text-zinc-400">
                  Type your message here…
                </span>
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-200/90 text-zinc-700"
                  aria-hidden
                >
                  ↑
                </span>
              </div>
            )}
            <p className="mt-2 text-center text-[10px] leading-snug text-zinc-500 sm:text-[11px]">
              The assistant may make mistakes. Always verify details before you pay.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
