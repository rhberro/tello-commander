const dgram = require('dgram')
const socket = require('socket.io')

const command = dgram.createSocket('udp4')
const state = dgram.createSocket('udp4')

const server = socket.listen(3001)

command.on('error', 
  error => console.log('❗️: ', error) || server.sockets.emit('command-error', error)
)
command.on('message', 
  message => console.log('✉️: ', message) || server.sockets.emit('command-message', message)
)
command.connect(8889, '192.168.10.1',
  error => console.log('[1/3] 🎮 Connecting to command...', error) || command.send('command', 0, 7,
    error => console.log('[2/3] 🚁 Initializing Tello SDK...', error) || command.send('streamon', 0, 8,
      error => console.log('[3/3] 📹 Enabling video...', error)
    )
  )
)

state.on('error', 
  error => console.log('❗️: ', error) || server.sockets.emit('state-error', error)
)
state.on('message', 
  message => console.log('✉️: ', message) || server.sockets.emit('state-message', message)
)
state.bind(8890,
  error => console.log('[1/1] 📦 Connecting to state...', error)
)

server.on('connection', 
  socket => {
    console.log('⚡️ Client connected...')

    socket.on('disconnect', 
      () => console.log('❌ Client disconnected...')
    )

    // socket.on('message', 
    //   () => console.log('❌ Client message...')
    // )

    // socket.on('disconnect', 
    //   () => console.log('❌ Client disconnected...')
    // )

    const lastValues = {
      battery: 50, // bat
      floor: 0, // tof,
      roll: 0, // roll
      pitch: 0, // pitch
      yaw: 0, // yaw
      speedx: 0, // vgx
      speedy: 0, // vgy
      speedz: 0, // vgz
      accelerationx: 0, // agx
      accelerationy: 0, // agx
      accelerationz: 0, // agx
    }

    setInterval(
      () => {
        const signal = Math.random() < 0.5 ? -1 : 1;

        const addBattery = signal * Math.floor(Math.random() * (1 + 1))
        const addFloor = signal * Math.floor(Math.random() * (30 + 1))
        const addRoll = signal * Math.floor(Math.random() * (3 + 1))
        const addPitch = signal * Math.floor(Math.random() * (3 + 1))
        const addYaw = signal * Math.floor(Math.random() * (10 + 1))
        const addSpeedX = signal * Math.floor(Math.random() * (3 + 1))
        const addSpeedY = signal * Math.floor(Math.random() * (3 + 1))
        const addSpeedZ = signal * Math.floor(Math.random() * (3 + 1))

        const newBattery = lastValues.battery + addBattery
        const newFloor = lastValues.floor + addFloor
        const newRoll = lastValues.roll + addRoll
        const newPitch = lastValues.pitch + addPitch
        const newYaw = lastValues.yaw + addYaw
        const newSpeedX = lastValues.speedx + addSpeedX
        const newSpeedY = lastValues.speedy + addSpeedY
        const newSpeedZ = lastValues.speedz + addSpeedZ

        lastValues.battery = newBattery >= 0 && newBattery <= 100 ? newBattery : lastValues.battery
        lastValues.floor = newFloor >= 0 && newFloor <= 1000 ? newFloor : lastValues.floor
        lastValues.roll = newRoll >= -180 && newRoll <= 180 ? newRoll : lastValues.roll
        lastValues.pitch = newPitch >= -90 && newPitch <= 90 ? newPitch : lastValues.pitch
        lastValues.yaw = newYaw >= -180 && newYaw <= 180 ? newYaw : lastValues.yaw
        lastValues.speedx = newSpeedX >= -100 && newSpeedX <= 100 ? newSpeedX : lastValues.speedx
        lastValues.speedy = newSpeedY >= -100 && newSpeedY <= 100 ? newSpeedY : lastValues.speedy
        lastValues.speedz = newSpeedZ >= -100 && newSpeedZ <= 100 ? newSpeedZ : lastValues.speedz

        socket.emit('state-message', lastValues)
      },
      200
    )
  }
)

// ⚠️✉️☕️🔗🌎⚡️
// 📦🚁🚫❗️❌✅

function splitState (state) {
  return state.split(':')
}

function flattenState (data = {}, state) {
  const [key, value] = state
  data[key] = value
  return data
}

function formatState (state) {
  return {
    battery: Number(state.bat),
    floor: Number(state.tof),
    height: Number(state.h),
    roll: Number(state.roll),
    pitch: Number(state.pitch),
    yaw: Number(state.yaw),
    speedx: Number(state.vgx),
    speedy: Number(state.vgy),
    speedz: Number(state.vgz),
    accelerationx: Number(state.agx),
    accelerationy: Number(state.agy),
    accelerationz: Number(state.agz),
  }
}

function parseState (state) {
  const intialState = {}
  return formatState(
    state
      .toString()
      .split(';')
      .map(splitState)
      .reduce(flattenState, intialState)
  )
}

//
// state.on('message', 
//   message => {
//     const parsedState = parseState(message)

//     if (locked) {
//       return
//     }

//     server.sockets.emit('state-message', parsedState)
//     locked = true
//   }
// )
//

//
// let locked = false

// setInterval(
//   () => {
//     locked = false
//   },
//   100
// )
//