const EventEmitter = require('events')
const log = {
    info: console.log,
    error: console.error,
}

class TaskProcessor extends EventEmitter {
    run(task) {
        log.info('Before task execution.')
        console.time('execute')
        this.emit('begin')
        console.timeEnd('execute')
        task()
        this.emit('end')
        log.info('After task execution.')
    }
}

// Create instance
const taskProcessor = new TaskProcessor()

// Add listeners
taskProcessor.addListener('begin', () => {
    for (let i = 0; i < 999999999; i++) {}
    log.info('Starting execution (from listener).')
})
taskProcessor.addListener('end', () => log.info('Execution completed (from listener).'))
taskProcessor.on('begin', () => log.info('Starting execution (from listener registered with on).'))

const customListener = () => log.info('From custom listener.')
taskProcessor.on('begin', customListener)
taskProcessor.removeListener('begin', customListener)


// Execute
taskProcessor.run(() => log.info('Executing task 1.'))
taskProcessor.run(() => log.info('Executing task 2.'))