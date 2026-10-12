type Job = { src: string; done: () => void; priority: number }

const queue: Job[] = []
const ready = new Set<string>()
let active = 0

function pump() {
  while (active < 2 && queue.length > 0) {
    const job = queue.shift()
    if (!job) return
    if (ready.has(job.src)) {
      job.done()
      continue
    }
    active += 1
    const img = new Image()
    const finish = () => {
      ready.add(job.src)
      job.done()
      active -= 1
      pump()
    }
    img.onload = finish
    img.onerror = finish
    img.src = job.src
  }
}

export function loadSharp(src: string, done: () => void, priority = 5) {
  if (ready.has(src)) {
    done()
    return
  }
  queue.push({ src, done, priority })
  queue.sort((a, b) => a.priority - b.priority)
  pump()
}
