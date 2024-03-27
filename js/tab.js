// <!-- DELETE TAB -->
function removeDummy(el) {
    // index elem
    let elem = parseInt(el.parentNode.id.match(/\d+/));


    let tabElem = document.getElementById('tab' + elem)
    let liElem = document.getElementById('li-tab' + elem)

    tabElem.parentNode.removeChild(tabElem);
    liElem.parentNode.removeChild(liElem);

    // var elem = document.getElementById('home');
    // elem.parentNode.removeChild(elem);
    // var elem = document.getElementById('l1');
    // elem.parentNode.removeChild(elem);
}

// RENAME TAB
function renameTab(ident) {
    let newId = parseInt(ident.id.match(/\d+/))
    let iTabs = document.getElementById('li-tab'+newId)
    if (ident.value == "" || ident.value == " ") {
        iTabs.querySelector('a').textContent = 'Вкладка '+newId
    }
    else {
        iTabs.querySelector('a').textContent = ident.value
    }

}

// <!-- CREATE TAB -->
function createTab() {

    let countTabs = countTab()
    let indexNewTab = lastTab()


    // copy li-tab1
    let liTab1 = document.querySelector("li#li-tab1");
    let newLiTab1 = liTab1.cloneNode(true);
    newLiTab1.className = ''
    newLiTab1.id = 'li-tab' + indexNewTab
    newLiTab1.querySelector('a').href = "#tab" + indexNewTab
    newLiTab1.querySelector('a').textContent = 'Вкладка ' + indexNewTab
    let navTab = document.querySelector('ul.nav-tabs');
    // past li-tab1
    navTab.insertBefore(newLiTab1,navTab.children[countTabs])



    // copy tab1
    let tabDiv = document.querySelector("div#tab1");
    let newTabDiv = tabDiv.cloneNode(true);
    newTabDiv.className='tab-pane fade'
    newTabDiv.id = 'tab' + indexNewTab
    let tapContentDiv = document.querySelector('div.tab-content')

    // change name of all input
    let nStud = newTabDiv.querySelector('#nStud1')
    nStud.id = 'nStud' + indexNewTab
    let sFind = newTabDiv.querySelector('#sFind1')
    sFind.id = 'sFind' + indexNewTab
    // let purpose = newTabDiv.querySelector("#purpose1")
    // purpose.id = 'purpose' + indexNewTab
    let entryVisa = newTabDiv.querySelector("#entryVisa1")
    entryVisa.id = 'entryVisa' +  + indexNewTab
    let typeVisa = newTabDiv.querySelector("#typeVisa1")
    typeVisa.id = 'typeVisa' + indexNewTab
    let lastNameRu = newTabDiv.querySelector("#lastNameRu1")
    lastNameRu.id = 'lastNameRu' + indexNewTab
    let lastNameEn = newTabDiv.querySelector("#lastNameEn1")
    lastNameEn.id = 'lastNameEn' + indexNewTab
    let firstNameRu = newTabDiv.querySelector("#firstNameRu1")
    firstNameRu.id = 'firstNameRu' + indexNewTab
    let firstNameEn = newTabDiv.querySelector("#firstNameEn1")
    firstNameEn.id = 'firstNameEn' + indexNewTab
    let gender = newTabDiv.querySelector("#gender1")
    gender.id = 'gender' + indexNewTab
    let dateOfBirth = newTabDiv.querySelector("#dateOfBirth1")
    dateOfBirth.id = 'dateOfBirth' + indexNewTab
    // let series = newTabDiv.querySelector("#series1")
    // series.id = 'series' + indexNewTab
    let idPassport = newTabDiv.querySelector("#idPassport1")
    idPassport.id = 'idPassport' + indexNewTab
    let dateOfIssue = newTabDiv.querySelector("#dateOfIssue1")
    dateOfIssue.id = 'dateOfIssue' + indexNewTab
    let validUntil = newTabDiv.querySelector("#validUntil1")
    validUntil.id = 'validUntil' + indexNewTab
    let issuedBy = newTabDiv.querySelector("#issuedBy1")
    issuedBy.id = 'issuedBy' + indexNewTab
    let stateBirth = newTabDiv.querySelector("#stateBirth1")
    stateBirth.id = 'stateBirth' + indexNewTab
    let placeStateBirth = newTabDiv.querySelector("#placeStateBirth1")
    placeStateBirth.id = 'placeStateBirth' + indexNewTab
    let otherStateBirth = newTabDiv.querySelector("#otherStateBirth1")
    otherStateBirth.id = 'otherStateBirth' + indexNewTab
    let placeStateGetVisa = newTabDiv.querySelector("#placeStateGetVisa1")
    placeStateGetVisa.id = 'placeStateGetVisa' + indexNewTab
    let placeCityGetVisa = newTabDiv.querySelector("#placeCityGetVisa1")
    placeCityGetVisa.id = 'placeCityGetVisa' + indexNewTab
    let otherStateGetVisa = newTabDiv.querySelector("#otherStateGetVisa1")
    otherStateGetVisa.id = 'otherStateGetVisa' + indexNewTab
    let otherCityGetVisa = newTabDiv.querySelector("#otherCityGetVisa1")
    otherCityGetVisa.id = 'otherCityGetVisa' + indexNewTab
    let homeAddress = newTabDiv.querySelector("#homeAddress1")
    homeAddress.id = 'homeAddress' + indexNewTab
    let levelEducation = newTabDiv.querySelector("#levelEducation1")
    levelEducation.id = 'levelEducation' + indexNewTab
    let faculty = newTabDiv.querySelector("#faculty1")
    faculty.id = 'faculty' + indexNewTab
    let course = newTabDiv.querySelector("#course1")
    course.id = 'course' + indexNewTab
    let deleteButton = newTabDiv.querySelector("#deleteButton1")
    deleteButton.id = 'deleteButton' + indexNewTab


    let aInput = [nStud	,
        // purpose,
        // entryVisa,
        // typeVisa,
        lastNameRu,
        lastNameEn,
        firstNameRu,
        firstNameEn,
        // gender,
        dateOfBirth,
        // series,
        idPassport,
        dateOfIssue,
        validUntil,
        issuedBy,
        // stateBirth,
        placeStateBirth,
        otherStateBirth,
        // placeStateGetVisa,
        // placeCityGetVisa,
        otherStateGetVisa,
        otherCityGetVisa,
        homeAddress,
        // levelEducation,
        // faculty,
        // course,
        // deleteButton
    ]

    for (let i of aInput) {
        i.value = ""
        // console.log(i.value)
    }

    //past tab1
    tapContentDiv.append(newTabDiv)

    //filling Select
    fillingSelect(selCourse, course.id)
    fillingSelect(selPlaceStateGetVisa, placeStateGetVisa.id)
    fillingSelect(selPlaceCityGetVisaOther, placeCityGetVisa.id)
    fillingSelect(selStateBirth,stateBirth.id)


    fillingTypeVisa() //!!!

    fillingLevelEducation(selLevelEducation, levelEducation.id)
    fillingGender(selGender, gender.id)
    fillingFaculty(selFaculty, faculty.id)
}

// last exist index+1
function lastTab() {
    let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
    let lastElem = tabs[tabs.length-2]
    // let lastIndexTab = Number(lastElem.id[lastElem.id.length-1])
    let lastIndexTab = parseInt(lastElem.id.match(/\d+/))
    return lastIndexTab+1
}

// count tabs
function countTab() {
    let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
    let lastElem = tabs.length-1
    return lastElem
}




// SELECT
// let selRegistrationOn = []
// let selGrazd = ["","Китай", "Вьетнам", "Туркменистан", "Монголия", "Тайвань (Китай)", "Другое"]
// let selAcademicYear = ["","2022-2023","2023-2024","2024-2025","2025-2026","2026-2027"]
// let selPurpose = ["Учеба", "Краткосрочная учеба", "Научно-технически связи (нтс)", "Трудовая деятельность"]

// let selEntryVisa = ["Однократная","Двукратная","Многократная"]

let selTypeVisaUch = ["Учебная"]
let selTypeVisaRab = ["Рабочая"]
let selTypeVisaGum = ["Гуманитарная"]

let selGender = ["","Мужской","Женский"]
let selStateBirth = ["","Китай", "Вьетнам", "Туркменистан", "Монголия", "Тайвань (Китай)", "Другое"] //не указано
let selPlaceStateGetVisa = ["", "Китай", "Турция","Туркменистан", "Другое"]
let selPlaceCityGetVisaChina = ["","Пекин","Шанхай","Шэньян", "Гуанчжоу", "Харбин", "Другое"]
let selPlaceCityGetVisaTurkey = ["","Анкара","Стамбул","Анталья", "Трабзон", "Другое"]
let selPlaceCityGetVisaTurkmen = ["","Ашхабад","Туркменбаши","Другое"]
let selPlaceCityGetVisaOther = ["","Другое"]
let selLevelEducation = [" ","Подфак", "Бакалавриат","Магистратура", "Аспирантура", "Стажировка", "Стажировка(межвуз)"]
let selFaculty = [" ",
    "(ИСГО) Институт социально-гуманитарного образования",
    "(Музфак) Институт изящных искусств: Музыкальный факультет",
    "(Худграф) Институт изящных искусств: Художественно-графический факультет",
    "(ИФ) Институт филологии",
    "(ИПП) Институт педагогики и психологии",
    "(ИИЯ) Институт иностранных языков",
    "(ИЖКиМ) Институт журналистики, коммуникаций и медиаобразования",
    "(ИБХ) Институт биологии и химии",
    "(Геофак) Географический факультет",
    "(ИИП) Институт истории и политики",
    "(ИФТИС) Институт физики, технологии и информационных систем",
    "(ФНО) Институт детства: Факультет начального образования",
    "(Деф) Институт детства: Дефектологический факультет",
    "(ИФКСиЗ) Институт физической культуры, спорта и здоровья",
    "(ИМиИ) Институт математики и информатики",
    "(Дошфак) Факультет дошкольной педагогики и психологии",
    "(ИМО) Институт международного образования",
    "(ИРЦО) Институт развития цифрового образования",
    "Покровский филиал МПГУ"]



let selCourse = [" ","1","2","3","4","5"]


// 100%
fillingSelect(selCourse,'course1')
fillingSelect(selPlaceStateGetVisa, 'placeStateGetVisa1')
fillingSelect(selPlaceCityGetVisaOther, 'placeCityGetVisa1')
fillingSelect(selStateBirth,'stateBirth1')
fillingTypeVisa()

fillingGender(selGender, 'gender1')
fillingLevelEducation(selLevelEducation, 'levelEducation1')
fillingFaculty(selFaculty, 'faculty1')

function fillingTypeVisa() {
    let chPurpose = document.getElementById('purpose')

    let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')

    if (chPurpose.value == 'Учеба' || chPurpose.value == "Краткосрочная учеба") {
        for (let i=0; i<countTab(); i++) {
            let indexTab = parseInt(tabs[i].id.match(/\d+/))
            fillingSelect(selTypeVisaUch, 'typeVisa'+indexTab)
        }
    }
    else if (chPurpose.value == "(НТС)") {
        for (let i=0; i<countTab(); i++) {
            let indexTab = parseInt(tabs[i].id.match(/\d+/))
            fillingSelect(selTypeVisaGum, 'typeVisa'+indexTab)
        }
    }
    else if (chPurpose.value == "Трудовая деятельность") {
        for (let i=0; i<countTab(); i++) {
            let indexTab = parseInt(tabs[i].id.match(/\d+/))
            fillingSelect(selTypeVisaRab, 'typeVisa'+indexTab)
        }
    }
}
function fillingSelect (nameMassiveSelect, idSelect) {
    document.getElementById(idSelect).innerHTML=''

    for (let i=0; i<nameMassiveSelect.length; i++) {
        let opt = nameMassiveSelect[i]
        let newOption = document.createElement('option')
        let chooseSelect = document.getElementById(idSelect)
        newOption.text = opt
        newOption.value = opt
        if (opt=="") {
            newOption.selected = true
            newOption.hidden = true
            newOption.disabled = true
        }
        chooseSelect.add(newOption)
    }
}
function fillingGender(nameMassiveSelect, idSelect) {
    document.getElementById(idSelect).innerHTML=''
    for (let i=0; i<nameMassiveSelect.length; i++) {
        let opt = nameMassiveSelect[i]
        let newOption = document.createElement('option')
        let chooseSelect = document.getElementById(idSelect)
        if (opt == "Мужской") {
            newOption.value = "Мужской / Male"
            newOption.text = opt
        } else if (opt == "Женский") {
            newOption.value = 'Женский / Female'
            newOption.text = opt
        }
        else if (opt=="") {
            newOption.selected = true
            newOption.hidden = true
            newOption.disabled = true
        }
        chooseSelect.add(newOption)
    }
}
function fillingLevelEducation(nameMassiveSelect, idSelect) {
    document.getElementById(idSelect).innerHTML=''
    for (let i=0; i<nameMassiveSelect.length; i++) {
        let opt = nameMassiveSelect[i]
        let newOption = document.createElement('option')
        let chooseSelect = document.getElementById(idSelect)
        if (opt == "Подфак") {
            newOption.value = "Подготовительный факультет (изучаю русский язык)/ The preparatory faculty"
            newOption.text = opt
        } else if (opt == "Бакалавриат") {
            newOption.value = 'бакалавриат/bachelor degree'
            newOption.text = opt
        }
        else if (opt == "Магистратура") {
            newOption.value = 'магистратура/master degree'
            newOption.text = opt
        }
        else if (opt == "Аспирантура") {
            newOption.value = 'аспирантура/post-graduate studies'
            newOption.text = opt
        }
        else if (opt == "Стажировка") {
            newOption.value = 'Стажировка'
            newOption.text = opt
        }
        else if (opt == "Стажировка(межвуз)") {
            newOption.value = 'Стажировка(межвуз)'
            newOption.text = opt
        }

        else if (opt=="") {
            newOption.selected = true
            newOption.hidden = true
            newOption.disabled = true
        }
        chooseSelect.add(newOption)
    }
}
function fillingFaculty(nameMassiveSelect, idSelect) {
    document.getElementById(idSelect).innerHTML=''
    for (let i=0; i<nameMassiveSelect.length; i++) {
        let opt = nameMassiveSelect[i]
        let newOption = document.createElement('option')
        let chooseSelect = document.getElementById(idSelect)


        if (opt == "(ИСГО) Институт социально-гуманитарного образования") {
            newOption.value = "🤝Институт социально-гуманитарного образования / The Institute of Social Studies and Humanities"
            newOption.text = opt
        }

        else if (opt == "(Музфак) Институт изящных искусств: Музыкальный факультет") {
            newOption.value = '🎵Институт изящных искусств: Факультет музыкального искусства  / The Musical Arts Institute'
            newOption.text = opt
        }
        else if (opt == "(Худграф) Институт изящных искусств: Художественно-графический факультет") {
            newOption.value = '🎨Институт изящных искусств: Художественно-графический факультет/ The Institute of Fine Arts'
            newOption.text = opt
        }
        else if (opt == "(ФНО) Институт детства: Факультет начального образования") {
            newOption.value = '🏫Институт детства: Факультет начального образования/ The Institute of Childhood: Pre-school Education'
            newOption.text = opt
        }
        else if (opt == "(Деф) Институт детства: Дефектологический факультет") {
            newOption.value = '🗣️Институт детства: Дефектологический факультет/ The Institute of Childhood: Defectology'
            newOption.text = opt
        }
        else if (opt == "(ИФТИС) Институт физики, технологии и информационных систем") {
            newOption.value = '⚛️Институт физики, технологии и информационных систем   / The Institute of Physics, Technology, and Informational Systems'
            newOption.text = opt
        }
        else if (opt == "(ИРЦО) Институт развития цифрового образования") {
            newOption.value = '🖥️Институт развития цифрового образования / The Institute of Digital Education Development'
            newOption.text = opt
        }

        else if (opt == "(ИФ) Институт филологии") {
            newOption.value = '📖Институт филологии / The Institute of Philology'
            newOption.text = opt
        }
        else if (opt == "(ИПП) Институт педагогики и психологии") {
            newOption.value = '👩‍🏫Институт педагогики и психологии  / The Institute of Pedagogy and Psychology'
            newOption.text = opt
        }
        else if (opt == "(ИИЯ) Институт иностранных языков") {
            newOption.value = '🔤Институт иностранных языков / The Institute of Foreign Languages'
            newOption.text = opt
        }
        else if (opt == "(ИЖКиМ) Институт журналистики, коммуникаций и медиаобразования") {
            newOption.value = '📰Институт журналистики, коммуникаций и медиаобразования  / The Institute of Journalism, Communications and Media Education'
            newOption.text = opt
        }
        else if (opt == "(ИБХ) Институт биологии и химии") {
            newOption.value = '🧬Институт биологии и химии / The Institute of Biology and Chemistry'
            newOption.text = opt
        }
        else if (opt == "(Геофак) Географический факультет") {
            newOption.value = '🌎Географический факультет / The Institute of Geography'
            newOption.text = opt
        }
        else if (opt == "(ИИП) Институт истории и политики") {
            newOption.value = '🏛️Институт истории и политики / The Institute of History and Politics'
            newOption.text = opt
        }
        else if (opt == "(ИФКСиЗ) Институт физической культуры, спорта и здоровья") {
            newOption.value = '⚽️Институт физической культуры, спорта и здоровья  /The Institute of Physical Education, Sports and Health'
            newOption.text = opt
        }
        else if (opt == "(ИМиИ) Институт математики и информатики") {
            newOption.value = '➗Институт математики и информатики / The Institute of Mathematics and Informatics'
            newOption.text = opt
        }
        else if (opt == "(Дошфак) Факультет дошкольной педагогики и психологии") {
            newOption.value = '🍼Факультет дошкольной педагогики и психологии / The Institute of Pre-School Pedagogy and Psychology'
            newOption.text = opt
        }
        else if (opt == "(ИМО) Институт международного образования") {
            newOption.value = '🌐 Институт международного образования  / The Institute of International Education'
            newOption.text = opt
        }
        else if (opt == 'Покровский филиал МПГУ') {
            newOption.value = 'ПОКРОВСКИЙ ФИЛИАЛ МПГУ / POKHROVSKY BRANCH'
            newOption.text = opt
        }
        else if (opt==" ") {
            // newOption.selected = true
            // newOption.hidden = true
            // newOption.disabled = true
            newOption.value = opt
            newOption.text = opt
            newOption.selected = true
        }
        else {
            newOption.value = opt
            newOption.text = opt
            
        }
        chooseSelect.add(newOption)
    }
}

// on change select
// Purpose
let chPurpose = document.getElementById('purpose')
chPurpose.onchange = function () {
    let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')

    if (chPurpose.value == 'Учеба' || chPurpose.value == "Краткосрочная учеба") {
        for (let i=0; i<countTab(); i++) {
            let indexTab = parseInt(tabs[i].id.match(/\d+/))
            fillingSelect(selTypeVisaUch, 'typeVisa'+indexTab)
        }
    }
    else if (chPurpose.value == "(НТС)") {
        for (let i=0; i<countTab(); i++) {
            let indexTab = parseInt(tabs[i].id.match(/\d+/))
            fillingSelect(selTypeVisaGum, 'typeVisa'+indexTab)
        }
    }
    else if (chPurpose.value == "Трудовая деятельность") {
        for (let i=0; i<countTab(); i++) {
            let indexTab = parseInt(tabs[i].id.match(/\d+/))
            fillingSelect(selTypeVisaRab, 'typeVisa'+indexTab)
        }
    }
}

// placeStateGetVisa
function chPlaceStateGetVisa(ident) {
    let indexTab = parseInt(ident.id.match(/\d+/))
    if (ident.value == 'Китай') {
        fillingSelect(selPlaceCityGetVisaChina, 'placeCityGetVisa'+ indexTab)
    }
    else if (ident.value == 'Турция') {
        fillingSelect(selPlaceCityGetVisaTurkey, 'placeCityGetVisa'+ indexTab)
    }
    else if (ident.value == 'Туркменистан') {
        fillingSelect(selPlaceCityGetVisaTurkmen, 'placeCityGetVisa'+ indexTab)
    }
    else if (ident.value == 'Другое') {
        fillingSelect(selPlaceCityGetVisaOther, 'placeCityGetVisa'+ indexTab)
    }
}


