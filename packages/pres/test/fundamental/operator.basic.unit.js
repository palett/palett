const iterations = 1e9
let startTime, endTime

// Test alpha
startTime = Date.now()
for (let i = 0; i < iterations; i++) {
  const result = (i * 512) / 6
}
endTime = Date.now()
console.log(`Alpha took ${endTime - startTime} ms`)

// Test beta
startTime = Date.now()
for (let i = 0; i < iterations; i++) {
  const result = (i << 9) / 6
}
endTime = Date.now()
console.log(`Beta took ${endTime - startTime} ms`)

// Test gamma
startTime = Date.now()
for (let i = 0; i < iterations; i++) {
  const result = i * 85.33333333333333
}
endTime = Date.now()
console.log(`Gamma took ${endTime - startTime} ms`)