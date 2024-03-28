export function hyphenToCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (match, letter) => {
    return letter.toUpperCase()
  })
}
