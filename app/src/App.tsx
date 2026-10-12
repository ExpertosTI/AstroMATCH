import { useEffect, useRef, useState, type ReactNode } from "react"
import { SharpImage } from "./SharpImage"
import { edition, news } from "./content"
import { loadSharp } from "./sharpen"
import "./index.css"

type Provider = "google" | "apple" | "whatsapp"
type Screen = "entrada" | "whatsapp" | "home" | "evento" | "noticias" | "match"

const LABEL: Record<Provider, string> = {
  google: "Google",
  apple: "Apple",
  whatsapp: "WhatsApp",
}

const SESSION_KEY = "astro-session"

function readSession(): Provider | null {
  const saved = sessionStorage.getItem(SESSION_KEY)
  if (saved === "google" || saved === "apple" || saved === "whatsapp") return saved
  return null
}

function IconGoogle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.74-.07-1.45-.19-2.14H12v4.05h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 3-4.33 3-7.43Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.41 13.9A6 6 0 0 1 6.1 12c0-.66.11-1.3.31-1.9V7.52H3.07A10 10 0 0 0 2 12c0 1.61.39 3.14 1.07 4.48l3.34-2.58Z" />
      <path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.96 9.96 0 0 0 12 2 10 10 0 0 0 3.07 7.52l3.34 2.58C7.2 7.74 9.4 5.98 12 5.98Z" />
    </svg>
  )
}

function IconApple() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.64c.03 2.5 2.2 3.33 2.23 3.34-.02.06-.35 1.2-1.15 2.37-.69 1.02-1.41 2.03-2.54 2.05-1.11.02-1.47-.66-2.74-.66s-1.67.64-2.72.68c-1.09.04-1.92-1.1-2.62-2.11-1.43-2.07-2.52-5.85-1.05-8.4.73-1.26 2.03-2.06 3.44-2.08 1.07-.02 2.09.72 2.74.72.65 0 1.86-.89 3.14-.76.53.02 2.03.22 2.99 1.63-.08.05-1.79 1.04-1.77 3.22ZM14.7 6.3c.58-.7.97-1.68.86-2.65-.83.03-1.84.55-2.44 1.25-.54.62-1.01 1.62-.88 2.57.93.07 1.88-.47 2.46-1.17Z" />
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 3.5A8.2 8.2 0 0 0 5.1 15.9L4 20.1l4.3-1.13a8.2 8.2 0 0 0 3.74.9h.01a8.2 8.2 0 0 0 0-16.37Zm4.78 11.58c-.2.57-1.17 1.04-1.64 1.1-.42.06-.96.08-1.55-.1-.36-.1-.82-.26-1.41-.51-2.48-1.07-4.1-3.57-4.22-3.74-.12-.16-1-1.33-1-2.54s.63-1.8.86-2.05c.22-.24.49-.3.65-.3h.47c.15 0 .35-.06.55.42.2.5.69 1.72.75 1.84.06.13.1.27.02.44-.08.16-.12.27-.24.41-.12.14-.25.32-.36.43-.12.12-.24.24-.1.47.14.24.62 1.02 1.33 1.66.92.82 1.69 1.07 1.93 1.2.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.15Z" />
    </svg>
  )
}

function IconBack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

function useSharp(src: string, priority: number) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    let alive = true
    loadSharp(src, () => {
      if (alive) setOn(true)
    }, priority)
    return () => {
      alive = false
    }
  }, [src, priority])
  return on
}

function Atmosphere({ children }: { children: ReactNode }) {
  const bg = useSharp("/brand/sharp/bg.webp", 0)
  const grain = useSharp("/brand/sharp/grano.webp", 4)
  const glowV = useSharp("/brand/sharp/glow-violet.webp", 4)
  const glowE = useSharp("/brand/sharp/glow-ember.webp", 4)

  return (
    <main className="stage-root">
      <div className={`phone${bg ? " is-bg" : ""}`}>
        <div className="void-flash" />
        <div className="void-sharp" />
        <div className={`glow glow-violet${glowV ? " is-on" : ""}`} />
        <div className={`glow glow-ember${glowE ? " is-on" : ""}`} />
        <div className={`grain${grain ? " is-on" : ""}`} />
        {children}
      </div>
    </main>
  )
}

function Topbar({ onBack }: { onBack?: () => void }) {
  return (
    <header className="topbar">
      {onBack ? (
        <button className="back" type="button" onClick={onBack} aria-label="Volver">
          <IconBack />
        </button>
      ) : (
        <span />
      )}
      <SharpImage
        className="logo-sm"
        flash="/brand/flash/logo.webp"
        src="/brand/sharp/logo.webp"
        alt="ASTRO SDQ"
        priority={1}
      />
      <SharpImage
        className="pluma-pin"
        flash="/brand/flash/pluma.webp"
        src="/brand/sharp/pluma.webp"
        alt=""
        priority={3}
      />
    </header>
  )
}

function WhatsAppCode({ onDone }: { onDone: () => void }) {
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [sent, setSent] = useState(false)
  const inputs = useRef<Array<HTMLInputElement | null>>([])
  const digits = phone.replace(/\D/g, "")
  const ready = digits.length >= 10
  const filled = code.every((item) => item.length === 1)

  function applyCode(raw: string, from: number) {
    const incoming = raw.replace(/\D/g, "").slice(0, 6 - from)
    if (!incoming) return
    const next = [...code]
    incoming.split("").forEach((digit, offset) => {
      next[from + offset] = digit
    })
    setCode(next)
    const focusAt = Math.min(from + incoming.length, 5)
    inputs.current[focusAt]?.focus()
  }

  function onDigit(index: number, value: string) {
    if (value.length > 1) {
      applyCode(value, index)
      return
    }
    const digit = value.replace(/\D/g, "").slice(-1)
    const next = [...code]
    next[index] = digit
    setCode(next)
    if (digit && index < 5) inputs.current[index + 1]?.focus()
  }

  function onKey(index: number, key: string) {
    if (key === "Backspace" && !code[index] && index > 0) {
      const next = [...code]
      next[index - 1] = ""
      setCode(next)
      inputs.current[index - 1]?.focus()
    }
    if (key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus()
    if (key === "ArrowRight" && index < 5) inputs.current[index + 1]?.focus()
  }

  return (
    <div className="wa-box">
      <div className="field">
        <label htmlFor="whatsapp">TU WHATSAPP</label>
        <input
          id="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+1 809 555 0142"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>
      <button
        className="btn btn-brasa"
        type="button"
        disabled={!ready || sent}
        onClick={() => {
          setSent(true)
          window.setTimeout(() => inputs.current[0]?.focus(), 40)
        }}
      >
        {sent ? "Código enviado" : "Enviar código"}
      </button>
      {sent && (
        <div className="otp">
          <span className="otp-label">CÓDIGO DE 6 DÍGITOS</span>
          <div className="otp-row">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  inputs.current[index] = node
                }}
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={index === 0 ? 6 : 1}
                aria-label={`Dígito ${index + 1}`}
                value={digit}
                onChange={(event) => onDigit(index, event.target.value)}
                onKeyDown={(event) => onKey(index, event.key)}
              />
            ))}
          </div>
          <button className="btn btn-brasa" type="button" disabled={!filled} onClick={onDone}>
            Entrar
          </button>
        </div>
      )}
      <p className="note">
        <IconWhatsApp />
        <span>La misma cuenta entra o se crea. En esta versión cualquier código de 6 dígitos abre la puerta.</span>
      </p>
    </div>
  )
}

function Entrada({ onEnter }: { onEnter: (provider: Provider) => void }) {
  return (
    <section className="screen screen-in">
      <SharpImage
        className="logo"
        flash="/brand/flash/logo.webp"
        src="/brand/sharp/logo.webp"
        alt="ASTRO SDQ"
        priority={1}
      />
      <div className="stage">
        <SharpImage
          className="geo"
          flash="/brand/flash/orbital.webp"
          src="/brand/sharp/orbital.webp"
          alt=""
          priority={3}
        />
        <SharpImage
          className="machine machine-bobina"
          flash="/brand/flash/bobina.webp"
          src="/brand/sharp/bobina.webp"
          alt=""
          priority={3}
        />
        <SharpImage
          className="machine machine-rotativa"
          flash="/brand/flash/rotativa.webp"
          src="/brand/sharp/rotativa.webp"
          alt=""
          priority={2}
        />
        <SharpImage
          className="machine machine-pluma"
          flash="/brand/flash/pluma.webp"
          src="/brand/sharp/pluma.webp"
          alt=""
          priority={3}
        />
      </div>
      <SharpImage
        className="lockup"
        flash="/brand/flash/lockup.webp"
        src="/brand/sharp/lockup.webp"
        alt="ASTRO 5TO Tattoo Convention, Santo Domingo 2027"
        priority={1}
      />
      <p className="kicker">EL QUINTO ELEMENTO</p>
      <p className="entrada">Un toque entra o crea tu cuenta.</p>
      <div className="actions">
        <button className="btn btn-google" type="button" onClick={() => onEnter("google")}>
          <IconGoogle />
          Continuar con Google
        </button>
        <button className="btn btn-apple" type="button" onClick={() => onEnter("apple")}>
          <IconApple />
          Continuar con Apple
        </button>
        <button className="btn btn-wa" type="button" onClick={() => onEnter("whatsapp")}>
          <IconWhatsApp />
          Continuar con WhatsApp
        </button>
      </div>
      <p className="fechas">30 ABR · 1-2 MAY 2027 · SAMBIL · SANTO DOMINGO</p>
    </section>
  )
}

function WhatsAppScreen({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  return (
    <section className="screen screen-in">
      <Topbar onBack={onBack} />
      <h1 className="title">WHATSAPP</h1>
      <p className="subtitle">Te escribimos un código a este número.</p>
      <WhatsAppCode onDone={onDone} />
      <div className="spacer" />
      <p className="fechas">30 ABR · 1-2 MAY 2027 · SAMBIL</p>
    </section>
  )
}

function Home({
  provider,
  onOpen,
  onLeave,
}: {
  provider: Provider
  onOpen: (screen: Screen) => void
  onLeave: () => void
}) {
  return (
    <section className="screen screen-in">
      <Topbar />
      <p className="kicker left">5TA EDICIÓN · 2027</p>
      <h1 className="title wrap">ASTRO vive aquí.</h1>
      <p className="copy">
        Conecta con la comunidad, descubre lo nuevo y prepárate para la próxima edición.
      </p>
      <button className="match-card" type="button" onClick={() => onOpen("match")}>
        <span className="eyebrow">Módulo principal</span>
        <strong>ASTRO Match</strong>
        <em>Encuentra tu próxima conexión.</em>
        <span>Descubre perfiles · Haz match · Coordina sesiones</span>
      </button>
      <div className="module-row">
        <button type="button" onClick={() => onOpen("noticias")}>
          <span>01</span>
          <strong>Noticias</strong>
          <em>Artistas y comunidad</em>
        </button>
        <button type="button" onClick={() => onOpen("evento")}>
          <span>02</span>
          <strong>Evento</strong>
          <em>{edition.datesShort}</em>
        </button>
      </div>
      <p className="section-label">Al día</p>
      <ul className="feed">
        {news.slice(0, 2).map((item) => (
          <li key={item.id}>
            <button type="button" onClick={() => onOpen(item.id === "astro-match" ? "match" : "noticias")}>
              <span>{item.eyebrow}</span>
              <strong>{item.title}</strong>
              <em>{item.summary}</em>
            </button>
          </li>
        ))}
      </ul>
      <div className="actions">
        <button className="btn btn-void" type="button" onClick={onLeave}>
          Cerrar sesión · {LABEL[provider]}
        </button>
      </div>
    </section>
  )
}

function Evento({ onBack }: { onBack: () => void }) {
  return (
    <section className="screen screen-in">
      <Topbar onBack={onBack} />
      <p className="kicker left">5TA EDICIÓN</p>
      <h1 className="title wrap">{edition.datesShort}</h1>
      <p className="copy">{edition.venue}</p>
      <p className="meta">{edition.address}</p>
      <p className="meta">{edition.coordinates}</p>
      <article className="story">
        <p>{edition.paragraph1}</p>
        <p>{edition.paragraph2}</p>
      </article>
      <p className="section-label">Stands</p>
      <ul className="stands">
        {edition.stands.map((stand) => (
          <li key={stand.label}>
            <div>
              <strong>{stand.label}</strong>
              <em>{stand.detail}</em>
            </div>
            <b>{stand.price}</b>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Noticias({ onBack }: { onBack: () => void }) {
  return (
    <section className="screen screen-in">
      <Topbar onBack={onBack} />
      <p className="kicker left">Señal abierta</p>
      <h1 className="title wrap">Lo que está pasando.</h1>
      <ul className="feed">
        {news.map((item, index) => (
          <li key={item.id}>
            <article>
              <span>{String(index + 1).padStart(2, "0")} · {item.eyebrow}</span>
              <strong>{item.title}</strong>
              <em>{item.summary}</em>
              <p>{item.detail}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Match({ provider, onBack }: { provider: Provider; onBack: () => void }) {
  const match = news.find((item) => item.id === "astro-match")
  return (
    <section className="screen screen-in">
      <Topbar onBack={onBack} />
      <p className="kicker left">Módulo principal</p>
      <h1 className="title wrap">ASTRO Match</h1>
      <p className="copy">Encuentra tu próxima conexión. Artistas y lienzos se encuentran antes del evento.</p>
      <ul className="lienzo-list">
        <li>
          <span>01</span>
          <div>
            <strong>Descubre</strong>
            <em>Perfiles de la comunidad ASTRO</em>
          </div>
        </li>
        <li>
          <span>02</span>
          <div>
            <strong>Match</strong>
            <em>Conecta intereses</em>
          </div>
        </li>
        <li>
          <span>03</span>
          <div>
            <strong>Coordina</strong>
            <em>Sesiones dentro de la convención</em>
          </div>
        </li>
      </ul>
      <article className="story">
        <p>{match?.detail}</p>
        <p>Entras con {LABEL[provider]}. La misma cuenta abre Match.</p>
      </article>
    </section>
  )
}

export default function App() {
  const [session, setSession] = useState<Provider | null>(null)
  const [screen, setScreen] = useState<Screen>("entrada")

  useEffect(() => {
    const saved = readSession()
    if (!saved) return
    setSession(saved)
    setScreen("home")
  }, [])

  function enter(provider: Provider) {
    if (provider === "whatsapp") {
      setScreen("whatsapp")
      return
    }
    sessionStorage.setItem(SESSION_KEY, provider)
    setSession(provider)
    setScreen("home")
  }

  function finishWhatsapp() {
    sessionStorage.setItem(SESSION_KEY, "whatsapp")
    setSession("whatsapp")
    setScreen("home")
  }

  function leave() {
    sessionStorage.removeItem(SESSION_KEY)
    setSession(null)
    setScreen("entrada")
  }

  return (
    <Atmosphere>
      {screen === "entrada" && <Entrada onEnter={enter} />}
      {screen === "whatsapp" && <WhatsAppScreen onBack={() => setScreen("entrada")} onDone={finishWhatsapp} />}
      {screen === "home" && session && (
        <Home provider={session} onOpen={setScreen} onLeave={leave} />
      )}
      {screen === "evento" && <Evento onBack={() => setScreen("home")} />}
      {screen === "noticias" && <Noticias onBack={() => setScreen("home")} />}
      {screen === "match" && session && <Match provider={session} onBack={() => setScreen("home")} />}
    </Atmosphere>
  )
}
