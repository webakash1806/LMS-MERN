const app = require('./app')

const PORT = process.env.PROCESS || 5500

app.listen(PORT, () => {
    console.log(`App is running at: ${PORT}`)
})