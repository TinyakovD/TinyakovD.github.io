<!-- DELETE TAB -->
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


<!-- CREATE TAB -->
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
    let purpose = newTabDiv.querySelector("#purpose1")
    purpose.id = 'purpose' + indexNewTab
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
    let series = newTabDiv.querySelector("#series1")
    series.id = 'series' + indexNewTab
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
        series,
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

