import fs from 'fs'
import {fileURLToPath} from 'url'
import path from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const UPLOAD_DIR = path.join(__dirname,'../uploads')
const MAX_AGE_MS = 24 * 60 * 60 * 1000

export function clearOldFiles(){
    fs.readdir(UPLOAD_DIR, (err,files)=>{
        if(err){
console.error("Erro ao lear o duretorio upload")
        }

        const now  = new Date()

        files.forEach(file =>{
            const filePath  = path.join(UPLOAD_DIR. file)
            fs.stat(filePath,(err, stats)=>{
                if(err){
                    console.error(`Erro ao obert asta ${file}:` ,err)
                    return
                }

                const age = now - stats.mtime

               if(age > MAX_AGE_MS){
                fs.unlink(filePath,(err,stats)=>{
                    if(err){
                        console.error(`Erro ao deletar arwquivo ${file}`,err)
                    }else{
                        console.log(`Arquivo antigo deletado ${file}`)
                    }
                })
               }
            })
        })
    })
}