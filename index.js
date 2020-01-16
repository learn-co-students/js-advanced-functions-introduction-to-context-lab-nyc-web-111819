// Your code here

let createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrayOfArray) {
    return arrayOfArray.map(function(array) {
       return createEmployeeRecord(array)
    })
}

let createTimeInEvent = function(record, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return record
}

let createTimeOutEvent = function(record, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return record
}

let hoursWorkedOnDate = function(record, dateStamp) {
    let timeOut = record.timeOutEvents.find(function(time) {
        return time.date === dateStamp
    })
    let timeIn = record.timeInEvents.find(function(time) {
        return time.date === dateStamp
    })
    return (timeOut.hour - timeIn.hour)/100
}

let wagesEarnedOnDate = function(record, dateStamp) {
   let hours = hoursWorkedOnDate(record, dateStamp)
   return hours * record.payPerHour
}

let allWagesFor = function(record) {
    let dates = record.timeInEvents.map(function(e){
        return e.date
    })

    let payable = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(record, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(array, name) {
    return array.find(function(record) {
        return record.firstName === name
    })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}