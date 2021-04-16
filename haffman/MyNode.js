export function MyNode(name, frequency, code, left = undefined, right = undefined) {
    this.name = name
    this.frequency = frequency
    this.code = code
    this.left = left
    this.right = right
}