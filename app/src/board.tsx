import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { SharpImage } from "./SharpImage"
import "./board.css"

export const BOARD = [
  { id: "s01", n: "01", name: "Portada" },
  { id: "s02", n: "02", name: "Entra a ASTRO" },
  { id: "s03", n: "03", name: "Inicio" },
  { id: "s04", n: "04", name: "Maya R." },
  { id: "s05", n: "05", name: "Lienzo" },
  { id: "s06", n: "06", name: "Filtros" },
  { id: "s07", n: "07", name: "Contactar a Maya" },
  { id: "s08", n: "08", name: "Banco" },
  { id: "s09", n: "09", name: "Sé parte" },
  { id: "s10", n: "10", name: "Tu cuenta · datos" },
  { id: "s11", n: "11", name: "Tu cuenta · rol" },
  { id: "s12", n: "12", name: "Tu cuenta · estilos" },
  { id: "s13", n: "13", name: "Tu cuenta · zona" },
  { id: "s14", n: "14", name: "Tu cuenta · fotos" },
  { id: "s15", n: "15", name: "En revisión" },
  { id: "s16", n: "16", name: "Pase" },
  { id: "s17", n: "17", name: "Cómo te describes" },
  { id: "s18", n: "18", name: "Solicitudes" },
  { id: "s19", n: "19", name: "Ficha" },
  { id: "s20", n: "20", name: "Agenda" },
  { id: "s21", n: "21", name: "Pase QR" },
  { id: "s22", n: "22", name: "Perfil" },
  { id: "s23", n: "23", name: "Chat" },
  { id: "s24", n: "24", name: "Mensajes" },
  { id: "s25", n: "25", name: "Propuesta" },
  { id: "s26", n: "26", name: "Hilo" },
  { id: "s27", n: "27", name: "Portafolio" },
  { id: "s28", n: "28", name: "Está acordado" },
  { id: "s29", n: "29", name: "Sesión" },
  { id: "s30", n: "30", name: "Lista" },
  { id: "s31", n: "31", name: "Escribir" },
  { id: "s32", n: "32", name: "Reporte" },
  { id: "s33", n: "33", name: "Proceso de validación" },
  { id: "s34", n: "34", name: "Iconografía" },
] as const

export type ScreenId = (typeof BOARD)[number]["id"]

const PEOPLE = [
  { name: "Maya R.", role: "Lienzo · Santo Domingo", initials: "MR" },
  { name: "Diego L.", role: "Artista · blackwork", initials: "DL" },
  { name: "Ana V.", role: "Lienzo · color", initials: "AV" },
  { name: "Luis M.", role: "Artista · lettering", initials: "LM" },
]

const STYLES = ["Blackwork", "Fineline", "Color", "Lettering", "Realismo", "Ornamental"]
const ZONES = ["Brazo", "Antebrazo", "Espalda", "Pecho", "Pierna", "Costilla"]

type Go = (id: ScreenId) => void

const OpenMap = createContext<() => void>(() => {})

function daysLeft() {
  const open = new Date("2027-04-30T00:00:00-04:00").getTime()
  return Math.max(0, Math.ceil((open - Date.now()) / 86400000))
}

function Dock({ current, onGo }: { current: ScreenId; onGo: Go }) {
  const items: Array<[ScreenId, string]> = [
    ["s03", "Inicio"],
    ["s08", "Banco"],
    ["s20", "Agenda"],
    ["s23", "Chat"],
    ["s22", "Perfil"],
  ]
  return (
    <nav className="dock" aria-label="App">
      {items.map(([id, label]) => (
        <button key={id} className={current === id ? "on" : ""} type="button" onClick={() => onGo(id)}>
          {label}
        </button>
      ))}
    </nav>
  )
}

function Frame({
  id,
  title,
  onBack,
  onGo,
  dock,
  cta,
  onCta,
  children,
}: {
  id: ScreenId
  title: string
  onBack?: () => void
  onGo: Go
  dock?: boolean
  cta?: string
  onCta?: () => void
  children: ReactNode
}) {
  const n = BOARD.find((item) => item.id === id)?.n
  const onMap = useContext(OpenMap)
  return (
    <section className="screen screen-in board">
      <header className="board-top">
        {onBack ? (
          <button className="back" type="button" onClick={onBack} aria-label="Volver">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        ) : (
          <button className="ghost" type="button" onClick={onMap} aria-label="Todas las pantallas">
            {n}
          </button>
        )}
        <p>{title}</p>
        <button className="ghost" type="button" onClick={onMap} aria-label="Mapa de pantallas">
          {n}
        </button>
      </header>
      <div className="board-body">{children}</div>
      <div className="spacer" />
      {cta && (
        <button className="btn btn-brasa" type="button" onClick={onCta}>
          {cta}
        </button>
      )}
      {dock && <Dock current={id} onGo={onGo} />}
    </section>
  )
}

function PersonRow({ person, onOpen }: { person: (typeof PEOPLE)[number]; onOpen: () => void }) {
  return (
    <button className="person" type="button" onClick={onOpen}>
      <span className="avatar">{person.initials}</span>
      <span>
        <strong>{person.name}</strong>
        <em>{person.role}</em>
      </span>
      <em>→</em>
    </button>
  )
}

function Portada({ onGo }: { onGo: Go }) {
  return (
    <section className="screen screen-in">
      <SharpImage className="logo" flash="/brand/flash/logo.webp" src="/brand/sharp/logo.webp" alt="ASTRO SDQ" priority={1} />
      <div className="stage">
        <SharpImage className="geo" flash="/brand/flash/orbital.webp" src="/brand/sharp/orbital.webp" alt="" priority={3} />
        <SharpImage className="machine machine-bobina" flash="/brand/flash/bobina.webp" src="/brand/sharp/bobina.webp" alt="" priority={3} />
        <SharpImage className="machine machine-rotativa" flash="/brand/flash/rotativa.webp" src="/brand/sharp/rotativa.webp" alt="" priority={2} />
        <SharpImage className="machine machine-pluma" flash="/brand/flash/pluma.webp" src="/brand/sharp/pluma.webp" alt="" priority={3} />
      </div>
      <SharpImage className="lockup" flash="/brand/flash/lockup.webp" src="/brand/sharp/lockup.webp" alt="ASTRO 5TO" priority={1} />
      <p className="kicker">EL QUINTO ELEMENTO</p>
      <div className="actions">
        <button className="btn btn-brasa" type="button" onClick={() => onGo("s02")}>
          Entrar con ASTRO
        </button>
      </div>
      <p className="fechas">01 · PORTADA</p>
    </section>
  )
}

function Login({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s02" title="Entra a ASTRO"  onGo={onGo}>
      <p className="copy">Un toque entra o crea tu cuenta. La misma cuenta sigue en toda la app.</p>
      <div className="actions">
        <button className="btn btn-google" type="button" onClick={() => onGo("s03")}>Continuar con Google</button>
        <button className="btn btn-apple" type="button" onClick={() => onGo("s03")}>Continuar con Apple</button>
        <button className="btn btn-wa" type="button" onClick={() => onGo("s03")}>Continuar con WhatsApp</button>
      </div>
      <button className="btn btn-void" type="button" onClick={() => onGo("s09")}>Sé parte de ASTRO 5TO</button>
    </Frame>
  )
}

function Inicio({ onGo }: { onGo: Go }) {
  const days = useMemo(daysLeft, [])
  return (
    <Frame id="s03" title="Inicio"  onGo={onGo} dock cta="Ver el banco" onCta={() => onGo("s04")}>
      <p className="count">{days}</p>
      <p className="count-label">Días para el 5to</p>
      <PersonRow person={PEOPLE[0]} onOpen={() => onGo("s04")} />
      <PersonRow person={PEOPLE[1]} onOpen={() => onGo("s19")} />
    </Frame>
  )
}

function Maya({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s04" title="Maya R." onBack={() => onGo("s08")}  onGo={onGo} cta="Contactar" onCta={() => onGo("s07")}>
      <div className="card-block">
        <strong>Maya R.</strong>
        <em>Lienzo · Santo Domingo</em>
        <p className="quiet">Busca blackwork en el brazo. Disponible el 1 de mayo en Sambil.</p>
      </div>
      <div className="duo">
        <button className="btn btn-void" type="button" onClick={() => onGo("s05")}>Lienzo</button>
        <button className="btn btn-void" type="button" onClick={() => onGo("s06")}>Filtros</button>
      </div>
    </Frame>
  )
}

function Lienzo({ onGo }: { onGo: Go }) {
  const [zone, setZone] = useState("Brazo")
  return (
    <Frame id="s05" title="Lienzo" onBack={() => onGo("s04")}  onGo={onGo} cta="Contactar" onCta={() => onGo("s07")}>
      <div className="body-map">
        <svg viewBox="0 0 80 160" aria-hidden="true">
          <circle cx="40" cy="18" r="12" fill="none" stroke="#EAE0CE" strokeWidth="2" />
          <path d="M28 34h24l8 28-10 8v48l-8 28h-4l-6-28V70l-6 28h-4l-8-28 8-8-10-28 16-4Z" fill="none" stroke="#F4572E" strokeWidth="2" />
        </svg>
        <div className="chips">
          {ZONES.map((item) => (
            <button key={item} className={item === zone ? "chip on" : "chip"} type="button" onClick={() => setZone(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="quiet">Zona marcada: {zone}.</p>
    </Frame>
  )
}

function Filtros({ onGo }: { onGo: Go }) {
  const [on, setOn] = useState<string[]>(["Blackwork"])
  function toggle(item: string) {
    setOn((prev) => (prev.includes(item) ? prev.filter((name) => name !== item) : [...prev, item]))
  }
  return (
    <Frame id="s06" title="Filtros" onBack={() => onGo("s04")}  onGo={onGo} cta="Aplicar" onCta={() => onGo("s08")}>
      <p className="section-label">Estilo</p>
      <div className="chips">
        {STYLES.map((item) => (
          <button key={item} className={on.includes(item) ? "chip on" : "chip"} type="button" onClick={() => toggle(item)}>
            {item}
          </button>
        ))}
      </div>
      <p className="section-label">Rol</p>
      <div className="chips">
        <button className="chip on" type="button">Lienzo</button>
        <button className="chip" type="button">Artista</button>
      </div>
    </Frame>
  )
}

function Contactar({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s07" title="Contactar a Maya" onBack={() => onGo("s04")}  onGo={onGo} cta="Enviar solicitud" onCta={() => onGo("s23")}>
      <div className="field">
        <label htmlFor="nota">Tu nota</label>
        <textarea id="nota" defaultValue="Hola Maya, quiero ver el brazo en blackwork el 1 de mayo." />
      </div>
      <div className="card-block">
        <strong>Maya R.</strong>
        <em>Responde dentro de la app. El número no se comparte.</em>
      </div>
    </Frame>
  )
}

function Banco({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s08" title="Banco"  onGo={onGo} dock>
      {PEOPLE.map((person) => (
        <PersonRow key={person.name} person={person} onOpen={() => onGo(person.name === "Diego L." ? "s19" : "s04")} />
      ))}
    </Frame>
  )
}

function SepParte({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s09" title="Sé parte" onBack={() => onGo("s02")}  onGo={onGo} cta="Empezar tu cuenta" onCta={() => onGo("s10")}>
      <SharpImage className="logo" flash="/brand/flash/logo.webp" src="/brand/sharp/logo.webp" alt="" priority={2} />
      <h1 className="title wrap">Sé parte de ASTRO 5TO</h1>
      <p className="copy">Artistas y lienzos se registran, pasan revisión y entran al banco antes del evento.</p>
    </Frame>
  )
}

function Datos({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s10" title="Tu cuenta" onBack={() => onGo("s09")}  onGo={onGo} cta="Continuar" onCta={() => onGo("s11")}>
      <div className="field">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" defaultValue="Diego L." />
      </div>
      <div className="field">
        <label htmlFor="ciudad">Ciudad</label>
        <input id="ciudad" defaultValue="Santo Domingo" />
      </div>
      <div className="field">
        <label htmlFor="whats">WhatsApp</label>
        <input id="whats" defaultValue="+1 809 555 0142" />
      </div>
    </Frame>
  )
}

function Rol({ onGo }: { onGo: Go }) {
  const [role, setRole] = useState("Artista")
  return (
    <Frame id="s11" title="Tu cuenta" onBack={() => onGo("s10")}  onGo={onGo} cta="Continuar" onCta={() => onGo("s12")}>
      <p className="quiet">Elige cómo entras al banco.</p>
      <div className="chips">
        {["Artista", "Lienzo"].map((item) => (
          <button key={item} className={role === item ? "chip on" : "chip"} type="button" onClick={() => setRole(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="body-map">
        <svg viewBox="0 0 80 160" aria-hidden="true">
          <circle cx="40" cy="18" r="12" fill="#F4572E" />
          <rect x="28" y="34" width="24" height="70" fill="#952C91" />
        </svg>
        <p className="quiet">Rol marcado: {role}.</p>
      </div>
    </Frame>
  )
}

function Estilos({ onGo }: { onGo: Go }) {
  const [on, setOn] = useState<string[]>(["Blackwork", "Fineline"])
  return (
    <Frame id="s12" title="Tu cuenta" onBack={() => onGo("s11")}  onGo={onGo} cta="Continuar" onCta={() => onGo("s13")}>
      <p className="section-label">Estilos</p>
      <div className="chips">
        {STYLES.map((item) => (
          <button
            key={item}
            className={on.includes(item) ? "chip on" : "chip"}
            type="button"
            onClick={() => setOn((prev) => (prev.includes(item) ? prev.filter((name) => name !== item) : [...prev, item]))}
          >
            {item}
          </button>
        ))}
      </div>
    </Frame>
  )
}

function Zona({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s13" title="Tu cuenta" onBack={() => onGo("s12")}  onGo={onGo} cta="Continuar" onCta={() => onGo("s14")}>
      <p className="section-label">Zona del cuerpo</p>
      <div className="chips">
        {ZONES.map((item, index) => (
          <button key={item} className={index < 2 ? "chip on" : "chip"} type="button">{item}</button>
        ))}
      </div>
      <div className="field">
        <label htmlFor="medida">Medida aproximada</label>
        <input id="medida" defaultValue="12 cm" />
      </div>
    </Frame>
  )
}

function Fotos({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s14" title="Tu cuenta" onBack={() => onGo("s13")}  onGo={onGo} cta="Enviar a revisión" onCta={() => onGo("s15")}>
      <p className="quiet">Tres referencias. En esta versión son casillas de la muestra.</p>
      <div className="photos">
        <span>01</span>
        <span>02</span>
        <span>03</span>
      </div>
    </Frame>
  )
}

function Revision({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s15" title="En revisión"  onGo={onGo} cta="Ver el pase" onCta={() => onGo("s16")}>
      <div className="review-ring">5TO</div>
      <h1 className="title wrap">En revisión</h1>
      <p className="copy">El equipo mira tu cuenta. Cuando esté lista, el pase se abre.</p>
    </Frame>
  )
}

function Pase({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s16" title="Tu pase" onBack={() => onGo("s15")}  onGo={onGo} cta="Completar perfil" onCta={() => onGo("s17")}>
      <div className="card-block">
        <strong>Diego L.</strong>
        <em>Artista · confirmado para muestra</em>
      </div>
      <div className="pass-stats">
        <div><strong>3</strong><em>días</em></div>
        <div><strong>01</strong><em>mayo</em></div>
        <div><strong>A5</strong><em>pase</em></div>
      </div>
    </Frame>
  )
}

function Bio({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s17" title="Cómo te describes" onBack={() => onGo("s16")}  onGo={onGo} cta="Entrar al banco" onCta={() => onGo("s03")}>
      <div className="field">
        <label htmlFor="bio">Tu texto</label>
        <textarea id="bio" defaultValue="Línea cerrada, negro sólido y sesiones cortas durante la convención." />
      </div>
    </Frame>
  )
}

function Solicitudes({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s18" title="Solicitudes"  onGo={onGo} dock>
      {PEOPLE.slice(0, 3).map((person) => (
        <div key={person.name} className="card-block">
          <strong>{person.name}</strong>
          <em>{person.role}</em>
          <div className="duo" style={{ marginTop: 10 }}>
            <button className="btn btn-brasa" type="button" onClick={() => onGo("s19")}>Aceptar</button>
            <button className="btn btn-void" type="button">Pasar</button>
          </div>
        </div>
      ))}
    </Frame>
  )
}

function Ficha({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s19" title="Diego L." onBack={() => onGo("s08")}  onGo={onGo} cta="Contactar" onCta={() => onGo("s23")}>
      <div className="card-block">
        <strong>Diego L.</strong>
        <em>Artista · blackwork · Santo Domingo</em>
        <p className="quiet">Sesiones de línea cerrada. Disponible 1 y 2 de mayo.</p>
      </div>
      <button className="btn btn-void" type="button" onClick={() => onGo("s27")}>Ver portafolio</button>
    </Frame>
  )
}

function Agenda({ onGo }: { onGo: Go }) {
  const slots = [
    ["30 ABR", "Maya R. · brazo"],
    ["1 MAY", "Diego L. · blackwork"],
    ["2 MAY", "Libre"],
  ]
  return (
    <Frame id="s20" title="Agenda"  onGo={onGo} dock>
      {slots.map(([day, who]) => (
        <button key={day} className="person" type="button" onClick={() => onGo("s29")}>
          <span className="avatar">{day.slice(0, 2)}</span>
          <span>
            <strong>{day}</strong>
            <em>{who}</em>
          </span>
        </button>
      ))}
    </Frame>
  )
}

function QrPass({ onGo }: { onGo: Go }) {
  const cells = [
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1,
  ]
  return (
    <Frame id="s21" title="Pase" onBack={() => onGo("s22")}  onGo={onGo} cta="Ver perfil" onCta={() => onGo("s22")}>
      <div className="card-block" style={{ textAlign: "center" }}>
        <strong>Diego L.</strong>
        <em>ASTRO 5TO · Sambil</em>
        <div className="qr" aria-hidden="true">
          {cells.map((on, index) => (
            <i key={index} className={on ? "" : "off"} />
          ))}
        </div>
      </div>
    </Frame>
  )
}

function Perfil({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s22" title="Perfil"  onGo={onGo} dock cta="Abrir pase" onCta={() => onGo("s21")}>
      <div className="card-block">
        <strong>Diego L.</strong>
        <em>Artista</em>
      </div>
      <div className="photos">
        {["01", "02", "03", "04", "05", "06"].map((slot) => (
          <button key={slot} className="photo-slot" type="button" onClick={() => onGo("s27")}>{slot}</button>
        ))}
      </div>
    </Frame>
  )
}

function Chat({ onGo, thread }: { onGo: Go; thread?: boolean }) {
  return (
    <Frame
      id={thread ? "s26" : "s23"}
      title="Diego L."
      onBack={() => onGo("s24")}
      onGo={onGo}
      cta={thread ? "Ver el acuerdo" : "Hacer una propuesta"}
      onCta={() => onGo(thread ? "s28" : "s25")}
    >
      <div className="chat">
        <div className="bubble them">¿Seguimos con el brazo el 1 de mayo?</div>
        <div className="bubble me">Sí. Línea cerrada, sesión de la tarde.</div>
        {thread && <div className="bubble them">Quedó anotado en la agenda.</div>}
      </div>
    </Frame>
  )
}

function Mensajes({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s24" title="Mensajes"  onGo={onGo} dock>
      <PersonRow person={PEOPLE[1]} onOpen={() => onGo("s23")} />
      <PersonRow person={PEOPLE[0]} onOpen={() => onGo("s23")} />
      <button className="btn btn-void" type="button" onClick={() => onGo("s18")}>Solicitudes</button>
    </Frame>
  )
}

function Propuesta({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s25" title="Propuesta" onBack={() => onGo("s23")}  onGo={onGo} cta="Enviar propuesta" onCta={() => onGo("s26")}>
      <div className="field">
        <label htmlFor="dia">Día</label>
        <input id="dia" defaultValue="1 de mayo" />
      </div>
      <div className="field">
        <label htmlFor="zona">Zona</label>
        <input id="zona" defaultValue="Brazo · blackwork" />
      </div>
      <div className="field">
        <label htmlFor="hora">Hora</label>
        <input id="hora" defaultValue="15:00" />
      </div>
    </Frame>
  )
}

function Portafolio({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s27" title="Diego L." onBack={() => onGo("s22")}  onGo={onGo} cta="Contactar" onCta={() => onGo("s31")}>
      <div className="photos">
        {["A", "B", "C", "D", "E", "F"].map((slot) => (
          <span key={slot}>{slot}</span>
        ))}
      </div>
      <p className="quiet">Blackwork y fineline. Muestra del tablero, sin obras reales todavía.</p>
    </Frame>
  )
}

function Acordado({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s28" title="Acuerdo"  onGo={onGo} cta="Ver la sesión" onCta={() => onGo("s29")}>
      <div className="review-ring">OK</div>
      <h1 className="title wrap">Está acordado</h1>
      <p className="copy">Diego L. y Maya R. · 1 de mayo · 15:00 · brazo.</p>
    </Frame>
  )
}

function Sesion({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s29" title="Sesión" onBack={() => onGo("s20")}  onGo={onGo} cta="Abrir el pase" onCta={() => onGo("s21")}>
      <div className="card-block">
        <strong>1 de mayo · 15:00</strong>
        <em>Sambil · Santo Domingo</em>
        <p className="quiet">Diego L. · blackwork en el brazo. Duración de muestra: 2 horas.</p>
      </div>
      <button className="btn btn-void" type="button" onClick={() => onGo("s32")}>Cambiar o reportar</button>
    </Frame>
  )
}

function Lista({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s30" title="Día 1" onBack={() => onGo("s20")}  onGo={onGo} dock>
      {PEOPLE.map((person) => (
        <PersonRow key={person.name} person={person} onOpen={() => onGo("s19")} />
      ))}
    </Frame>
  )
}

function Escribir({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s31" title="Escribir" onBack={() => onGo("s27")}  onGo={onGo} cta="Enviar" onCta={() => onGo("s23")}>
      <div className="field">
        <label htmlFor="msg">Mensaje</label>
        <textarea id="msg" defaultValue="Vi el portafolio. ¿El 1 de mayo a las 15:00 te sirve?" />
      </div>
    </Frame>
  )
}

function Reporte({ onGo }: { onGo: Go }) {
  return (
    <Frame id="s32" title="Reporte" onBack={() => onGo("s29")}  onGo={onGo}>
      <p className="quiet">La sesión del 1 de mayo con Diego L.</p>
      <div className="actions">
        <button className="btn btn-brasa" type="button" onClick={() => onGo("s28")}>Aceptar</button>
        <button className="btn btn-void" type="button" onClick={() => onGo("s18")}>Declinar</button>
      </div>
    </Frame>
  )
}

function Validacion({ onGo }: { onGo: Go }) {
  const steps: Array<[ScreenId, string, string]> = [
    ["s09", "01", "Sé parte"],
    ["s10", "02", "Datos"],
    ["s11", "03", "Rol"],
    ["s12", "04", "Estilos"],
    ["s13", "05", "Zona"],
    ["s14", "06", "Fotos"],
    ["s15", "07", "Revisión"],
    ["s16", "08", "Pase"],
  ]
  return (
    <Frame id="s33" title="Validación" onBack={() => onGo("s03")}  onGo={onGo}>
      <p className="quiet">S01 · proceso de validación. Cada paso abre su pantalla.</p>
      <div className="steps">
        {steps.map(([id, n, name]) => (
          <button key={id} type="button" onClick={() => onGo(id)}>
            <b>{n}</b>
            <span>{name}</span>
          </button>
        ))}
      </div>
    </Frame>
  )
}

function Iconos({ onGo }: { onGo: Go }) {
  const icons = ["Inicio", "Banco", "Agenda", "Chat", "Perfil", "Pase", "Filtro", "Acuerdo", "Cerrar"]
  return (
    <Frame id="s34" title="Iconografía" onBack={() => onGo("s03")}  onGo={onGo}>
      <div className="icons">
        {icons.map((name) => (
          <div key={name}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 6h14M5 12h14M5 18h10" stroke="#EAE0CE" strokeWidth="1.6" />
            </svg>
            {name}
          </div>
        ))}
      </div>
      <p className="quiet">Rejilla 24. Trazo hueso, acento brasa, esquinas cortadas. El diseñador sustituye estos signos.</p>
    </Frame>
  )
}

function Map({ onGo, onClose }: { onGo: Go; onClose: () => void }) {
  return (
    <div className="map">
      <h2>34 pantallas</h2>
      <div className="map-grid">
        {BOARD.map((item) => (
          <button key={item.id} type="button" onClick={() => onGo(item.id)}>
            <b>{item.n}</b>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <div className="actions">
        <button className="btn btn-void" type="button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}

export function BoardApp() {
  const [screen, setScreen] = useState<ScreenId>("s01")
  const [map, setMap] = useState(false)
  const go: Go = (id) => {
    setMap(false)
    setScreen(id)
  }

  return (
    <OpenMap.Provider value={() => setMap(true)}>
    <main className="stage-root">
      <div className="phone is-bg">
        <div className="void-flash" />
        <div className="void-sharp" />
        <div className="glow glow-violet is-on" />
        <div className="glow glow-ember is-on" />
        <div className="grain is-on" />
        {screen === "s01" && <Portada onGo={go} />}
        {screen === "s02" && <Login onGo={go} />}
        {screen === "s03" && <Inicio onGo={go} />}
        {screen === "s04" && <Maya onGo={go} />}
        {screen === "s05" && <Lienzo onGo={go} />}
        {screen === "s06" && <Filtros onGo={go} />}
        {screen === "s07" && <Contactar onGo={go} />}
        {screen === "s08" && <Banco onGo={go} />}
        {screen === "s09" && <SepParte onGo={go} />}
        {screen === "s10" && <Datos onGo={go} />}
        {screen === "s11" && <Rol onGo={go} />}
        {screen === "s12" && <Estilos onGo={go} />}
        {screen === "s13" && <Zona onGo={go} />}
        {screen === "s14" && <Fotos onGo={go} />}
        {screen === "s15" && <Revision onGo={go} />}
        {screen === "s16" && <Pase onGo={go} />}
        {screen === "s17" && <Bio onGo={go} />}
        {screen === "s18" && <Solicitudes onGo={go} />}
        {screen === "s19" && <Ficha onGo={go} />}
        {screen === "s20" && <Agenda onGo={go} />}
        {screen === "s21" && <QrPass onGo={go} />}
        {screen === "s22" && <Perfil onGo={go} />}
        {screen === "s23" && <Chat onGo={go} />}
        {screen === "s24" && <Mensajes onGo={go} />}
        {screen === "s25" && <Propuesta onGo={go} />}
        {screen === "s26" && <Chat onGo={go} thread />}
        {screen === "s27" && <Portafolio onGo={go} />}
        {screen === "s28" && <Acordado onGo={go} />}
        {screen === "s29" && <Sesion onGo={go} />}
        {screen === "s30" && <Lista onGo={go} />}
        {screen === "s31" && <Escribir onGo={go} />}
        {screen === "s32" && <Reporte onGo={go} />}
        {screen === "s33" && <Validacion onGo={go} />}
        {screen === "s34" && <Iconos onGo={go} />}
        {map && <Map onGo={go} onClose={() => setMap(false)} />}
        {screen !== "s01" && !map && (
          <button className="ghost" type="button" onClick={() => setMap(true)} style={{ position: "absolute", left: 8, bottom: 8, zIndex: 2 }} aria-label="Abrir las 34 pantallas">
            34
          </button>
        )}
      </div>
    </main>
    </OpenMap.Provider>
  )
}
