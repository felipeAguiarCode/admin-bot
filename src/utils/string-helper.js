module.exports = {

    async textOnlyNumbers(value){
        const regexNumbersExpression = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
        value = value.match(regexNumbersExpression)
        return value
    },
    
    async textFirstNumbers(value){
        const regexNumbersExpression = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
        value = value.match(regexNumbersExpression)[0]
        return value
    },
    
    async textAfterDelimiter(value, delimiter, offset){
        const result = value.substr(value.indexOf(delimiter) + offset,value.length).trim()
        return result
    },
    
    async textBeforeDelimiter(value, delimiter, offset){
        const result = value.substr(0, value.lastIndexOf(delimiter) - offset).trim()
        return result
    },
    
    async textBettewenDelimiters(value, delimiterStart, delimiterEnd, offset){
        const result = value.substr( 
                                value.indexOf(delimiterStart) + 1, 
                                value.lastIndexOf(delimiterEnd)
                            ).trim()
        return result
    }
}