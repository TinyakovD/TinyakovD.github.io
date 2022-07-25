let cDate = document.getElementById('cDate')
let isEndDateIncluded = document.getElementById('isEndDateIncluded')
let totalDays = document.getElementById('totalDays')
let totalWorkDays = document.getElementById('totalWorkDays')
let poDate = document.getElementById('poDate')

let isHoliday = ["01.01.2022",
    "02.01.2022",
    "03.01.2022",
    "04.01.2022",
    "05.01.2022",
    "06.01.2022",
    "07.01.2022",
    "08.01.2022",
    "23.02.2022",
    "08.03.2022",
    "01.05.2022",
    "09.05.2022",
    "12.06.2022",
    "04.11.2022",
    "01.01.2023",
    "02.01.2023",
    "03.01.2023",
    "04.01.2023",
    "05.01.2023",
    "06.01.2023",
    "07.01.2023",
    "08.01.2023",
    "23.02.2023",
    "08.03.2023",
    "01.05.2023",
    "09.05.2023",
    "12.06.2023",
    "04.11.2023",
    "01.01.2024",
    "02.01.2024",
    "03.01.2024",
    "04.01.2024",
    "05.01.2024",
    "06.01.2024",
    "07.01.2024",
    "08.01.2024",
    "23.02.2024",
    "08.03.2024",
    "01.05.2024",
    "09.05.2024",
    "12.06.2024",
    "04.11.2024",
    "01.01.2025",
    "02.01.2025",
    "03.01.2025",
    "04.01.2025",
    "05.01.2025",
    "06.01.2025",
    "07.01.2025",
    "08.01.2025",
    "23.02.2025",
    "08.03.2025",
    "01.05.2025",
    "09.05.2025",
    "12.06.2025",
    "04.11.2025",
    "01.01.2026",
    "02.01.2026",
    "03.01.2026",
    "04.01.2026",
    "05.01.2026",
    "06.01.2026",
    "07.01.2026",
    "08.01.2026",
    "23.02.2026",
    "08.03.2026",
    "01.05.2026",
    "09.05.2026",
    "12.06.2026",
    "04.11.2026",
    "01.01.2027",
    "02.01.2027",
    "03.01.2027",
    "04.01.2027",
    "05.01.2027",
    "06.01.2027",
    "07.01.2027",
    "08.01.2027",
    "23.02.2027",
    "08.03.2027",
    "01.05.2027",
    "09.05.2027",
    "12.06.2027",
    "04.11.2027"
]

// test

//



// default value
cDate.valueAsDate = new Date()

let poStartDate = new Date(cDate.valueAsDate)
poStartDate.setDate(poStartDate.getDate() + totalDays.valueAsNumber)
poDate.valueAsDate = poStartDate

totalWorkDays.valueAsNumber = calcWorkDays(cDate.valueAsDate, poDate.valueAsDate)
//


// value on change
cDate.onchange = function () {
    calcPoDate(cDate.valueAsDate, totalDays.valueAsNumber)
}

poDate.onchange = function () {
    totalDays.valueAsNumber = calcTotalDays(cDate.valueAsDate, poDate.valueAsDate)
    totalWorkDays.valueAsNumber = calcWorkDays(cDate.valueAsDate, poDate.valueAsDate)
}
totalDays.onchange = function () {
    calcPoDate(cDate.valueAsDate, totalDays.valueAsNumber)
    totalWorkDays.valueAsNumber = calcWorkDays(cDate.valueAsDate, poDate.valueAsDate)
}

totalWorkDays.onchange = function () {
    poDate.valueAsDate = new Date(calcPoWorkDate(cDate.valueAsDate, totalWorkDays.valueAsNumber))
    totalDays.valueAsNumber = calcTotalDays(cDate.valueAsDate, poDate.valueAsDate)
}

isEndDateIncluded.onchange = function () {
    totalDays.valueAsNumber = calcTotalDays(cDate.valueAsDate, poDate.valueAsDate)
    totalWorkDays.valueAsNumber = calcWorkDays(cDate.valueAsDate, poDate.valueAsDate)
}

//


//function for calc

function calcPoDate(data, days) {
    let newData = new Date(data)
    newData.setDate(newData.getDate() + days)
    poDate.valueAsDate = newData
}

function calcPoWorkDate(c, workDays) {
    let dateStart = new Date(c)
    let dateEnd = new Date(dateStart)
    let totalDay = 0
    let promWorkDays = workDays

    if (workDays > 0) {
        while (workDays != 0 ) {
            if (dateStart.getDay() !=0 && dateStart.getDay() != 6 && !isHoliday.includes(dateStart.toLocaleDateString())) {
                totalDay = totalDay + 1
                workDays = workDays - 1
                dateStart.setDate(dateStart.getDate()+1)
            }
            else {
                totalDay = totalDay + 1
                dateStart.setDate(dateStart.getDate()+1)
            }
        }
    }
    else if (workDays < 0) {


        while (workDays != 0 ) {
            if (dateStart.getDay() !=0 && dateStart.getDay() != 6 && !isHoliday.includes(dateStart.toLocaleDateString())) {
                totalDay = totalDay - 1
                workDays = workDays + 1
                dateStart.setDate(dateStart.getDate()-1)
            }
            else {
                totalDay = totalDay - 1
                dateStart.setDate(dateStart.getDate()-1)

            }
        }
    }

    dateEnd.setDate(dateEnd.getDate()+totalDay)



    if (dateEnd.getDay() !=0 && dateEnd.getDay() != 6
        && !isHoliday.includes(dateEnd.toLocaleDateString())
        // && isEndDateIncluded.checked
    ) {

        // test
        if (isEndDateIncluded.checked) {
            dateEnd.setDate(dateEnd.getDate()-1)
            while (dateEnd.getDay() ==0 || dateEnd.getDay() == 6
                || isHoliday.includes(dateEnd.toLocaleDateString())
                ) {
                if (promWorkDays>=0) {
                    dateEnd.valueAsDate=dateEnd.setDate(dateEnd.getDate() + 1)
                }
                else {
                    dateEnd.valueAsDate=dateEnd.setDate(dateEnd.getDate() - 1)
                }
            }
        }
        // end test

        return dateEnd.valueAsDate = dateEnd

    }
    else {
        while (dateEnd.getDay() ==0 || dateEnd.getDay() == 6
        || isHoliday.includes(dateEnd.toLocaleDateString())
            ) {
            if (promWorkDays>=0) {
                dateEnd.valueAsDate=dateEnd.setDate(dateEnd.getDate() + 1)
            }
            else {
                dateEnd.valueAsDate=dateEnd.setDate(dateEnd.getDate() - 1)
            }
        }
        // test
        if (isEndDateIncluded.checked) {
            dateEnd.setDate(dateEnd.getDate()-1)

            while (dateEnd.getDay() ==0 || dateEnd.getDay() == 6
                || isHoliday.includes(dateEnd.toLocaleDateString())
                ) {
                if (promWorkDays>=0) {
                    dateEnd.valueAsDate=dateEnd.setDate(dateEnd.getDate() - 1)
                }
                else {
                    dateEnd.valueAsDate=dateEnd.setDate(dateEnd.getDate() + 1)
                }
            }
        }
        // end test
        return dateEnd.valueAsDate = dateEnd
    }

}

function  calcTotalDays(c, po) {
    const oneDay = 1000 * 60 * 60 * 24 //in milliseconds
    let date1 = new Date(c)
    let date2 = new Date(po)
    let between = (date2 - date1)/oneDay
    if (isEndDateIncluded.checked) {
        return between+1
    }
    else {
        return between
    }
}

function calcWorkDays(c,po) {
    let workDay = 0
    let date1 = new Date(c)
    let date2 = new Date(po)

    while (date2 - date1 != 0) {
        if (date2 - date1 > 0) {
            if (date1.getDay() !=0 && date1.getDay() != 6 && !isHoliday.includes(date1.toLocaleDateString())) {
                workDay = workDay+1
                date1.setDate(date1.getDate() + 1)
            }
            else {
                date1.setDate(date1.getDate() + 1)
            }
        }
        else if (date2 - date1 < 0) {
            if (date1.getDay() !=0 && date1.getDay() != 6 && !isHoliday.includes(date1.toLocaleDateString())) {
                workDay = workDay-1
                date1.setDate(date1.getDate() - 1)
            }
            else {
                date1.setDate(date1.getDate() - 1)
            }
        }
    }
    if (date2.getDay() !=0 && date2.getDay() != 6 && !isHoliday.includes(date2.toLocaleDateString())
        && isEndDateIncluded.checked
    ) {
        return  workDay +1
    }
    else {
        return workDay
    }
}

