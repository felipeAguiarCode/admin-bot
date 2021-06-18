text = require("./string-helper")

module.exports = {

    async lesson(lineValue, line, delimiter){
        let lessonRow = line
        let lessonName = await text.textAfterDelimiter(lineValue, delimiter, 2)
            lessonName = await text.textBeforeDelimiter(lessonName, "//#", 2)
        let lessonTime = await text.textAfterDelimiter(lineValue, "//#", 3)
        let lessonOrder = await text.textFirstNumbers(lineValue)
        
        return {
            original: lineValue,
            lessonRow: lessonRow,
            lessonName: lessonName,
            lessonTime: lessonTime,
            lessonOrder: lessonOrder,
            contents: []
        }
    },

    async content(value){
        const obj = {
                 name: await text.textAfterDelimiter(value, ":", 1),
                 order: await text.textFirstNumbers(value),
                 type: await this.getFormat(value.slice(0,1))
        }

        return obj
    },

    async getFormat(value){
        const formats ={
                a:"audio",
                v:"video",
                t:"text",
                p:"pdf",
                q:"quiz",
                y:"youtube",
                g:"github"
        }

        return formats[value]
    }
}