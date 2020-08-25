class QueueP {
  constructor(compare) {
    this.data = []
    this.compare = compare
  }

  add(value) {
    if(this.length() > 0) {
      
      let addIndex = 0
      while(this.compare(this.data[addIndex], value) && addIndex < this.length()) {
        addIndex++
      }

      const old = [...this.data]
      
      const start = this.data.splice(0, addIndex)
      
      this.data = [...start, value, ...this.data]
    } else this.data = [value]

    return this
  }

  pop() {
    const value = this.data[0]
    this.data.splice(0, 1)
    return value
  }

  length() {
    return this.data.length
  }

}

class Tree {
  constructor(value, left, right) {
    this.value = value
    this.left = left
    this.right = right
  }

  find(value) {
    if(this.value === value) return this.value
    
    const leftReturn = this.left && this.left.find(value)
    const rigthReturn = this.right && this.right.find(value)

    if(leftReturn) return leftReturn
    if(rigthReturn) return rigthReturn
  }

  setLeft(node) {
    this.left = node
  }

  setRight(node) {
    this.right = node
  }

}

class HaffmanCode {
  constructor(simbol, frequency, code = "") {
    this.simbol = simbol
    this.code = code
    this.frequency = frequency
  }

  toString() {
    return `${this.simbol} ${this.code} ${this.frequency}`
  }
}

class Haffman {

  static getCodes(str) {
    const simbols = {}

    for(let i = 0; i < str.length; i++) {
      const simbol = str[i]
      if(!simbols[simbol]) simbols[simbol] = new HaffmanCode(simbol, 1)
      else simbols[simbol].frequency++
    }

    const frequencyQueue = new QueueP((a, b) => a.frequency < b.frequency)

    for (const simbol in simbols) {
      if (simbols.hasOwnProperty(simbol)) {
        frequencyQueue.add(new Tree(simbols[simbol]))
      }
    }

    while(frequencyQueue.length() > 1) {

      const right = frequencyQueue.pop()
      const left = frequencyQueue.pop()

      const head = new Tree(
        new HaffmanCode("", right.value.frequency + left.value.frequency),
        left, right
      )

      frequencyQueue.add(head)
    }
    
    const tree = frequencyQueue.pop()

    if(!tree.left && !tree.right) tree.value.code = "1"

    const treeNodes = new QueueP(() => true)
    treeNodes.add(tree)

    const symbolTable = {}

    while(treeNodes.length() > 0) {
      const node = treeNodes.pop()
      if(node.value.code && node.value.simbol) symbolTable[node.value.simbol] = node.value.code
      if(node.left) {
        node.left.value.code = node.value.code + "0" 
        treeNodes.add(node.left) 
      }
      if(node.right) {
        node.right.value.code = node.value.code + "1"
        treeNodes.add(node.right)
      }
    }

    return symbolTable
  }

  static encode(str) {
    const symbolTable = Haffman.getCodes(str)

    let bitstr = ""
    for(let i = 0; i < str.length; i++) bitstr += symbolTable[str[i]]
    return bitstr
  }

  static decode(bitstr, codes) {
    let str = ''
    const inverseCodes = {}
    for (const symbol in codes) {
      if (codes.hasOwnProperty(symbol)) {
        const code = codes[symbol];
        inverseCodes[code] = symbol
      }
    }

    while(bitstr.length > 0) {
      let next = bitstr[0]
      bitstr = bitstr.slice(1)
      while(!inverseCodes[next]) {
        if(bitstr.length === 0) throw new Error('Haffman decode error!')
        next += bitstr[0]
        bitstr = bitstr.slice(1)
      }
      str += inverseCodes[next]
    }
    
    return str
  }

}

module.exports = {
  QueueP,
  Tree,
  Haffman
}