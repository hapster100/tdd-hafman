const { QueueP, Tree, Haffman } = require('./haffman')

expect.extend({
  toBeFunction: obj => ({pass: typeof obj === 'function'}) 
})

describe("QueueP",() => {
  
  let queue = null

  beforeEach(() => {
    queue = new QueueP((a, b) => a > b)
  })

  it("is class", () => {
    expect(QueueP).toBeFunction()
  })

  it("has methods: add, pop, length", () => {
    expect(queue.add).toBeFunction()
    expect(queue.pop).toBeFunction()
    expect(queue.length).toBeFunction()
  })

  it("return value after add", () => {
    const valueToAdd = 0
    queue.add(valueToAdd)
    const valueFromPop = queue.pop()

    expect(valueFromPop).toBe(valueToAdd)
  })

  it("return right length", () => {
    const startLength = queue.length()

    queue.add(10)
    queue.add(4)

    const afterAddLength = queue.length()
    
    expect(startLength).toBe(0)
    expect(afterAddLength).toBe(2)
  })

  it("return undefined if is empty", () => {
    expect(queue.pop()).toBeUndefined()
  })

  it("return most priority value", () => {
    const addedValues = [10,3,2,1,4,7,6,5,9,8]

    addedValues.forEach(value => {
      queue.add(value)
    })

    const returnedValues = []
    for(let i = 0; i < addedValues.length; i++)
      returnedValues.push(queue.pop())
    
    expect(returnedValues).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
  })

})

describe("Tree", () => {
  let tree = null

  beforeEach(() => {
    tree = new Tree()
  })

  it("is class", () => {
    expect(Tree).toBeFunction()
  })

  it("has methods: find, setLeft, setRight", () => {
    expect(tree.find).toBeFunction()
  })

  it("find return value if it in tree", () => {
    tree = new Tree(0,
      new Tree(1, new Tree(4)),
      new Tree(5)
    )
    
    const values = [0, 1, 4, 5] 
    
    expect(tree.find(0)).toBe(0)
    expect(tree.find(1)).toBe(1)
    expect(tree.find(4)).toBe(4)
    expect(tree.find(5)).toBe(5)

  })

  it("find return undefined if no passed value in tree", () => {
    tree = new Tree(0,
      new Tree(1, new Tree(4)),
      new Tree(5)
    )

    expect(tree.find(2)).toBeUndefined()
    expect(tree.find(3)).toBeUndefined()
  })



})

describe("Haffman", () => {
    
  const testStrings = [
    "asdgbdfgwd",
    "asfegd3453asc",
    "tyjthgfnfg"
  ]

  it('has decode, encode and getCodes methods', () => {
    expect(Haffman.getCodes).toBeFunction()
    expect(Haffman.encode).toBeFunction()
    expect(Haffman.decode).toBeFunction()
  })

  it('encode string contain only 1 and 0', () => {
    
    const containOnlyBitNumbers = str => {
      const bitNumbers = ['1', '0']
      for(let i = 0; i < str.length; i++) {
        if(!bitNumbers.includes(str[i])) return false
      }
      return true
    }

    const results = testStrings
      .map(Haffman.encode)
      .map(containOnlyBitNumbers)

    const correct = new Array(testStrings.length).fill(true)

    expect(results).toEqual(correct)
  })

  it('decode string correctly', () => {
    const decoded = testStrings.map(str => ({
      encode: Haffman.encode(str),
      codes: Haffman.getCodes(str)
    })).map(({encode, codes}) => Haffman.decode(encode, codes))

    expect(decoded).toEqual(testStrings)
  })

})