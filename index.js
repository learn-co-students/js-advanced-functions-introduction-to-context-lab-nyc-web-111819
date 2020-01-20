function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(array) {
    let employeesArray = []
    array.forEach(array => {
        employeesArray.push(createEmployeeRecord(array)) 
    });
    return employeesArray
}

function createTimeInEvent(employee, dateStamp){

    let splitDateStamp = dateStamp.split(" ")

    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(splitDateStamp[1]),
        date: splitDateStamp[0]
    }
    employee.timeInEvents.push(timeInEvent)
    return employee
}

function createTimeOutEvent(employee, dateStamp) {

    let splitDateStamp = dateStamp.split(" ")

    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(splitDateStamp[1]),
        date: splitDateStamp[0]
    }
    employee.timeOutEvents.push(timeOutEvent)
    return employee
}

function hoursWorkedOnDate(employee, date) {
   
    let timeOut = employee.timeOutEvents.find(element => element.date === date)
    let timeIn = employee.timeInEvents.find(element => element.date === date)
    
    let hoursWorked = (timeOut.hour - timeIn.hour)/100

    return hoursWorked
}

function wagesEarnedOnDate(employee, date) {
    let payOwed = parseInt(hoursWorkedOnDate(employee, date) * employee.payPerHour)
    return payOwed
}

function allWagesFor(employee) {

    let datesWorked = employee.timeOutEvents.map(day => day.date)

    let allTimePayOwed = datesWorked.reduce(
        (accumulator, date) => accumulator + wagesEarnedOnDate(employee, date),
        0)
    
    // datesWorked.forEach(date => {
    //     allTimePayOwed += wagesEarnedOnDate(employee, date)
    // })

    return allTimePayOwed
}

function findEmployeeByFirstName(srcArray, firstName) {

    let soughtEmployee = srcArray.find(element => element.firstName === firstName)
    return soughtEmployee
}


function calculatePayroll(array) {
    let allMoneyOwed = array.reduce(function (accumulator, employee) {
        return accumulator + allWagesFor(employee)
    }, 0)

    return allMoneyOwed
}

