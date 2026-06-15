'use client'

import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
} from 'react'
import { ImagePlus, X } from 'lucide-react'

/** Max logo bounds after optimisation (keeps placeholders readable in cards). */
const MAX_LOGO_W = 140
const MAX_LOGO_H = 40

export async function optimizeLogoImageFile(file) {
  if (!file.type.startsWith('image/')) return null
  try {
    const bmp = await createImageBitmap(file)
    const scale = Math.min(MAX_LOGO_W / bmp.width, MAX_LOGO_H / bmp.height, 1)
    const w = Math.max(1, Math.round(bmp.width * scale))
    const h = Math.max(1, Math.round(bmp.height * scale))
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      bmp.close()
      return null
    }
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)
    ctx.drawImage(bmp, 0, 0, w, h)
    bmp.close()
    return canvas.toDataURL('image/jpeg', 0.88)
  } catch {
    return null
  }
}

export const DemoBrandUpload = forwardRef(function DemoBrandUpload(
  { logoDataUrl, onLogoChange, className },
  ref,
) {
  const inputId = useId()
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    openFilePicker: () => inputRef.current?.click(),
  }))

  const onPick = useCallback(
    async (e) => {
      const file = e.target.files?.[0]
      e.target.value = ''
      if (!file) return
      const url = await optimizeLogoImageFile(file)
      if (url) onLogoChange(url)
    },
    [onLogoChange],
  )

  return (
    <div className={`${className ?? ''}`}>
      <p className="text-[11px] font-medium leading-snug text-zinc-800">
        Want to see how your brand appears to users?
      </p>
      <p className="mt-1 text-[10px] leading-snug text-zinc-500">
        Upload your logo to replace the merchant placeholder in the live demos.
      </p>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onPick}
      />

      {!logoDataUrl ? (
        <label
          htmlFor={inputId}
          className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-zinc-300 bg-white/90 px-2 py-3 text-center shadow-sm transition hover:border-zinc-400 hover:bg-white"
        >
          <ImagePlus className="size-5 text-zinc-400" strokeWidth={1.5} aria-hidden />
          <span className="text-[10px] font-semibold text-zinc-700">Upload your logo</span>
        </label>
      ) : (
        <div className="mt-2 space-y-2">
          <div className="flex min-h-[3rem] items-center justify-center rounded-lg border border-zinc-200/90 bg-white p-2 shadow-sm">
            <img
              src={logoDataUrl}
              alt="Uploaded logo preview"
              className="max-h-10 max-w-[min(100%,9rem)] object-contain"
            />
          </div>
          <div className="flex gap-1.5">
            <label
              htmlFor={inputId}
              className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border border-zinc-200/90 bg-white py-1.5 text-[10px] font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50"
            >
              Replace
            </label>
            <button
              type="button"
              onClick={() => onLogoChange(null)}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-zinc-200/90 bg-white py-1.5 text-[10px] font-semibold text-zinc-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-800"
            >
              <X className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
})
