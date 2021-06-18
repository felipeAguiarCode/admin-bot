const text = require("./string-helper")
const prepare = require("./prepare-content")

const fsp = require("fs").promises
const fs = require("fs")
const path = require("path")
let filePath = ""
let filePathJSON = ""
const delimiter = ":"
let lastRow = 0

async function create(){
    filePath = path.resolve(__dirname,"../../tmp/curso.txt")
    filePathJSON = path.resolve(__dirname,"../tmp/curso.json")

     let lastRow = await getLastRow()
     let jsonObject = {}

      jsonObject.course ={
          name: await loadCourse( {contentFilter: "Nome do curso:"}),
          workload: await loadCourse( {contentFilter: "Carga horária:"}),
          author: await loadCourse( {contentFilter: "Autor:"})
      }

      jsonObject.lessons = await loadLessons()

     await loadContents(jsonObject.lessons, lastRow)
     await writeFile(jsonObject)
     return jsonObject
}

async function loadCourse({contentFilter}){
    try {
        let result = undefined
        contentFilter = contentFilter.toLowerCase()
        const data = await fsp.readFile(filePath,'UTF-8')
        const lines = data.split(/\r?\n/)

        lines.forEach((line) => {
            if(line.toLowerCase().includes(contentFilter)){
                result =  text.textAfterDelimiter(line, delimiter, 2)
                return result
            }
        });

        return result

    } catch (error) {
        console.log(error)
    }
}

async function loadLessons(){
    let lessonArray = []
    try {
        const data = await fsp.readFile(filePath,'UTF-8')
        const lines = data.split(/\r?\n/)
        lastRow = lines.length
        
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const lineText = lines[lineIndex];

            if(lineText.toLowerCase().startsWith("aula")){
                lessonArray.push(await prepare.lesson(lineText, lineIndex, delimiter))
            }
        }

    } catch (error) {
        console.log(error)
    }

    return lessonArray
}

async function loadContents(jsonLessons, lastRow){
     let startRange = 0 
     let endRange = 0
     let lessonsWithContents = []

     for (let index = 0; index < jsonLessons.length; index++) {
         const lesson = jsonLessons[index]
         
         startRange = lesson.lessonRow
         endRange = lastRow

        if(index !== (jsonLessons.length -1)){
            endRange = jsonLessons[index + 1].lessonRow 
        }

        lesson.contents = await loadRange(startRange, endRange)
        lessonsWithContents.push(lesson)
     }

     console.log(lessonsWithContents)
     return lessonsWithContents
}

async function loadRange(initRow, endRow){
    let cleanLines = []
    let lineText = ""
    let lineObj = {}
    initRow += 1
    endRow -= 1
    
    try {
        const data = await fsp.readFile(filePath,'UTF-8')
        const lines = data.split(/\r?\n/)
        
        for (let lineIndex = initRow; lineIndex <= endRow; lineIndex++) {
            lineText = lines[lineIndex]
            lineObj = await prepare.content(lineText)
            cleanLines.push(lineObj)
        }

    } catch (error) {
        console.log(error)
    }

    return cleanLines
}

async function getLastRow(){
    try {
        const data = await fsp.readFile(filePath,'UTF-8')
        const lines = data.split(/\r?\n/);

        return lines.length

    } catch (error) {
        console.log(error)
    }    
}

async function writeFile(jsonObject){
    fs.writeFileSync(filePathJSON,JSON.stringify(jsonObject))
}

module.exports.create = create()