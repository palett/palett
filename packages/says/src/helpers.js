export const toTab = ind => ' '.repeat(ind << 1)

export const logger = (message, { title, indent, keywords }) => {
  if (message.includes('\n')) {
    // if (message[0] === '[' || message[0] === '{')
    message = '\n' + message
    return `${indent |> toTab}[${title}] ${message.replace(/\n/g, '\n' + (++indent |> toTab))}` |> console.log
  }
  return `${indent |> toTab}[${title}] ${message}` |> console.log
}

