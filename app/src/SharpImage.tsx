import { useEffect, useState } from "react"
import { loadSharp } from "./sharpen"

type Props = {
  flash: string
  src: string
  alt: string
  className?: string
  priority?: number
}

export function SharpImage({ flash, src, alt, className, priority = 5 }: Props) {
  const [sharp, setSharp] = useState(false)

  useEffect(() => {
    let alive = true
    loadSharp(src, () => {
      if (alive) setSharp(true)
    }, priority)
    return () => {
      alive = false
    }
  }, [src, priority])

  return (
    <span
      className={`sharp${sharp ? " is-sharp" : ""}${className ? ` ${className}` : ""}`}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
    >
      <img className="sharp-flash" src={flash} alt="" decoding="async" />
      {sharp ? <img className="sharp-full" src={src} alt="" decoding="async" /> : null}
    </span>
  )
}
