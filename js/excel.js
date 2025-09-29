let selectedFile;
let totalInfo = []; // file contents EXCEL
let nStud = document.getElementById('nStud1')

// console.log(window.XLSX)


document.getElementById('excel').addEventListener("change",(event)=>{
    selectedFile = event.target.files[0];
})

function findInfo(id) {

    let personFinded = 0

    id = parseInt(id.match(/\d+/)) // if id="find1" => id=1
    let nStud = document.querySelector('#nStud'+id)
    let purpose = document.querySelector("#purpose")
    let entryVisa = document.querySelector("#entryVisa"+id)
    let typeVisa = document.querySelector("#typeVisa"+id)
    let lastNameRu = document.querySelector("#lastNameRu"+id)
    let lastNameEn = document.querySelector("#lastNameEn"+id)
    let firstNameRu = document.querySelector("#firstNameRu"+id)
    let firstNameEn = document.querySelector("#firstNameEn"+id)
    let gender = document.querySelector("#gender"+id)
    let dateOfBirth = document.querySelector("#dateOfBirth"+id)
    // let series = document.querySelector("#series"+id)
    let idPassport = document.querySelector("#idPassport"+id)
    let dateOfIssue = document.querySelector("#dateOfIssue"+id)
    let validUntil = document.querySelector("#validUntil"+id)
    let issuedBy = document.querySelector("#issuedBy"+id)
    let stateBirth = document.querySelector("#stateBirth"+id)
    let placeStateBirth = document.querySelector("#placeStateBirth"+id)
    let otherStateBirth = document.querySelector("#otherStateBirth"+id)
    let placeStateGetVisa = document.querySelector("#placeStateGetVisa"+id)
    let placeCityGetVisa = document.querySelector("#placeCityGetVisa"+id)
    let otherStateGetVisa = document.querySelector("#otherStateGetVisa"+id)
    let otherCityGetVisa = document.querySelector("#otherCityGetVisa"+id)
    let homeAddress = document.querySelector("#homeAddress"+id)
    let levelEducation = document.querySelector("#levelEducation"+id)
    let faculty = document.querySelector("#faculty"+id)
    let course = document.querySelector("#course"+id)
    let deleteButton = document.querySelector("#deleteButton"+id)

    let workAddress = document.querySelector('#workAddress'+id)


    // document.getElementById('find1').addEventListener('click',()=> {
        if (selectedFile && nStud.value!=0){
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(selectedFile);
            fileReader.onload = (event)=>{
                let data = event.target.result;
                let workbook = XLSX.read(data,{type:"binary"});

                let indSheet = Object.keys(workbook.Sheets).indexOf('ПРИГЛАШЕНИЯ 25.09.2025 - 2026') 

                let sheet = Object.keys(workbook.Sheets)[indSheet]
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                totalInfo = JSON.stringify(rowObject, undefined, 1)

                totalInfo = JSON.parse(totalInfo)

                // console.log(totalInfo)
                for (let i = 0; i<totalInfo.length; i++) {
                    if (totalInfo[i]['ПОРЯДКОВЫЙ НОМЕР'] == nStud.value) {

                        personFinded = 1 // for print error

                        let dateStart = new Date(1900,0,-1)
                        let dateEnd = new Date(dateStart)

                        //purpose.value = totalInfo[i]['Цель поездки / PURPOSE OF VISIT']
                        // entryVisa.value = totalInfo[i]['']
                        // typeVisa.value = totalInfo[i]['']

                        lastNameRu.value = totalInfo[i]['ФАМИЛИЯ (На русском языке) /SECOND NAME (in Russian)']
                        lastNameEn.value = totalInfo[i]['ФАМИЛИЯ (На английском языке)/ SECOND NAME (in English)']
                        firstNameRu.value = totalInfo[i]['ИМЯ  (На русском языке) / FIRST NAME (in Russian)']
                        firstNameEn.value = totalInfo[i]['ИМЯ  (На английском языке) / FIRST NAME (in English)']

                        gender.value = totalInfo[i]['ПОЛ / SEX']

                        dateEnd.setDate(dateStart.getDate()+totalInfo[i]['ГОД РОЖДЕНИЯ / DATE OF BIRTH'])
                        dateOfBirth.value = dateEnd.toLocaleDateString()
                        dateEnd = new Date(dateStart)

                        //series.value = totalInfo[i]['']
                        idPassport.value = totalInfo[i]['№ ПАСПОРТА / PASSPORT №']

                        dateEnd.setDate(dateStart.getDate()+totalInfo[i]['ДАТА ВЫДАЧИ / DATE OF ISSUE'])
                        dateOfIssue.value = dateEnd.toLocaleDateString()
                        dateEnd = new Date(dateStart)

                        dateEnd.setDate(dateStart.getDate()+totalInfo[i]['СРОК ДЕЙСТВИЯ ПАСПОРТА / DATE OF EXPIRY'])
                        validUntil.value = dateEnd.toLocaleDateString()
                        dateEnd = new Date(dateStart)


                        issuedBy.value = totalInfo[i]['КЕМ ВЫДАН ДОКУМЕНТ/ AUTHORITY']

                        stateBirth.value = totalInfo[i]['ГОСУДАРСТВО РОЖДЕНИЯ / COUNTRY OF BIRTH']
                        if (stateBirth.value == '' || stateBirth.value == undefined || stateBirth.value == " ") {
                            stateBirth.value = 'Другое'
                            otherStateBirth.value = totalInfo[i]['ГОСУДАРСТВО РОЖДЕНИЯ / COUNTRY OF BIRTH']
                        }
                        else {otherStateBirth.value = ""}
                        placeStateBirth.value = totalInfo[i]['МЕСТО РОЖДЕНИЯ (ИЗ ПАСПОРТА) / PLACE OF BIRTH']



                        placeStateGetVisa.value = totalInfo[i]['ГОСУДАРСТВО  ПОСТОЯННОГО ПРОЖИВАНИЯ / PERMANENT RESIDENCE']
                        if (placeStateGetVisa.value == '' || placeStateGetVisa.value == undefined || placeStateGetVisa.value == " ") {
                            placeStateGetVisa.value = 'Другое'
                            chPlaceStateGetVisa(placeStateGetVisa)
                            otherStateGetVisa.value = totalInfo[i]['ГОСУДАРСТВО  ПОСТОЯННОГО ПРОЖИВАНИЯ / PERMANENT RESIDENCE']
                        }
                        else {
                            otherStateGetVisa.value = ""
                            chPlaceStateGetVisa(placeStateGetVisa)
                        }



                        placeCityGetVisa.value = totalInfo[i]['МЕСТО ПОЛУЧЕНИЯ ВИЗЫ / VISA APPLICATION CENTER']
                        if (placeCityGetVisa.value == '' || placeCityGetVisa.value == undefined || placeCityGetVisa.value == " ") {
                            placeCityGetVisa.value = 'Другое'
                            otherCityGetVisa.value = totalInfo[i]['МЕСТО ПОЛУЧЕНИЯ ВИЗЫ / VISA APPLICATION CENTER']
                        }
                        else {otherCityGetVisa.value = ""}







                        homeAddress.value = totalInfo[i]['CТРАНА / COUNTRY']
                            if (totalInfo[i]['ПРОВИНЦИЯ ИЛИ ОБЛАСТЬ / PROVINCE OR REGION'] != undefined) {
                                homeAddress.value = homeAddress.value + ', пров.' + totalInfo[i]['ПРОВИНЦИЯ ИЛИ ОБЛАСТЬ / PROVINCE OR REGION']
                            }
                            if (totalInfo[i]['ГОРОД / CITY']  != undefined) {
                                homeAddress.value = homeAddress.value + ', г.' + totalInfo[i]['ГОРОД / CITY']
                            }
                            if (totalInfo[i]['УЛИЦА / STREET'] != undefined) {
                                homeAddress.value = homeAddress.value + ', ул.' +totalInfo[i]['УЛИЦА / STREET']
                            }
                            if (totalInfo[i]['№ ДОМА / BUILDING №'] != undefined) {
                                homeAddress.value = homeAddress.value + ', д.' + totalInfo[i]['№ ДОМА / BUILDING №']
                            }
                            if (totalInfo[i]['КВАРТИРА / APT №'] != undefined) {
                                homeAddress.value = homeAddress.value + ', кв.' + totalInfo[i]['КВАРТИРА / APT №']
                            }

                        workAddress.value = totalInfo[i]['АДРЕС МЕСТА РАБОТЫ ИЛИ УЧЕБЫ / STUDY OR WORK PLACE (ADDRESS)'] ? totalInfo[i]['АДРЕС МЕСТА РАБОТЫ ИЛИ УЧЕБЫ / STUDY OR WORK PLACE (ADDRESS)'] : ''
                        if (workAddress.value == undefined || workAddress.value == ' ' || workAddress.value == '') {
                            workAddress.text = ''
                            workAddress.value = ' '
                        }



                        levelEducation.value = totalInfo[i]['УРОВЕНЬ ОБРАЗОВАНИЯ/ LEVEL OF EDUCATION']
                        faculty.value = totalInfo[i]['ИНСТИТУТ & ФАКУЛЬТЕТ (не заполняется, если цель поездки: ТРУДОВАЯ ДЕЯТЕЛЬНОСТЬ) / INSTITUTE & FACULTY (Do not fill in if the purpose of visit is "WORK")']
                        course.value = totalInfo[i]['КУРС ОБУЧЕНИЯ/YEAR OF STUDYING']


                        if (levelEducation.value == undefined|| levelEducation.value == '' || levelEducation.value == ' ') {
                            levelEducation.value = ' '
                            levelEducation.text = ''
                            levelEducation.selected = true
                        }
                        if (faculty.value == undefined || faculty.value == '' || faculty.value == ' ') {
                            faculty.value = ' '
                            faculty.text = ''
                            faculty.selected = true

                        }
                        if (course.value == undefined|| course.value == '' || course.value == ' ') {
                            course.value = ' '
                            course.text = ''
                            course.selected = true
                        }
                    }
                }
                if (personFinded == 0) {
                    alert('Студент с номером '+nStud.value+ ' не найден')
                }

            }
        }

    // });
}




function updateNameDisplay() {
    var input = document.querySelector('#excel');
    var preview = document.querySelector('.preview');
    var fileTypes = [
        'application/excel',
        'application/vnd.ms-excel',
        'application/x-excel',
        'application/x-msexcel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    var curFiles = input.files;


    while(preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    if(curFiles.length === 0) {
        var para = document.createElement('p');
        para.textContent = 'Вы не выбрали файл';
        preview.appendChild(para);
    } else {

        var para = document.createElement('p');
        if(validFileType(curFiles[0])) {
            para.textContent = 'File name ' + curFiles[0].name;
            var image = document.createElement('img');
            image.className = 'iconFile'
            image.src = '../excel.png';

            preview.appendChild(image);
            preview.appendChild(para);

        } else {
            para.textContent = 'Файл ' + curFiles[0].name + ' имеет неверный формат.';
            preview.appendChild(para);
        }

        // list.appendChild(preview);

    }



    function validFileType(file) {
        for(var i = 0; i < fileTypes.length; i++) {
            if(file.type === fileTypes[i]) {
                return true;
            }
        }

        return false;
    }

}






