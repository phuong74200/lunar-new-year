const fs = require('fs')

async function ls(path) {
    const dir = await fs.promises.opendir(path)
    for await (const dirent of dir) {
        fs.renameSync(dirent.name, dirent.name.replace('-min', ''))
    }
}

ls('.').catch(console.error)