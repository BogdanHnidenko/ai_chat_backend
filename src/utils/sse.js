export function initSSE(res) {
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")
}

export function sendSSEEvent({ res, event, data }) {
  const eventMes = event ? `event: ${event}\n` : ""
  const dataMes = data ? `data: ${JSON.stringify(data)}\n` : ""
  res.write(`${eventMes}${dataMes}\n`)
}
