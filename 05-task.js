// const {compose,curry}=require('folktale/core/lambda')
const{fs}=require('fs')
const { task } = require('folktale/concurrency/task') 
const {split,find}=require('lodash/fp')
function readFile(filename) { return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => { 
    if (err) resolver.reject(err) 
    resolver.resolve(data) })
 }) 
}
    // 调用 run 执行 
    readFile('package.json').map(split('\n'))
        .map(find(x => x.includes('version')))
        .run()
        .listen({ onRejected: err => { console.log(err) },onResolved: value => { console.log(value) } })