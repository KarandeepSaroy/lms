import fs from 'fs'

const uploadDir = './uploads'
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}
