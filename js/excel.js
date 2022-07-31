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


    // document.getElementById('find1').addEventListener('click',()=> {
        if (selectedFile && nStud.value!=0){
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(selectedFile);
            fileReader.onload = (event)=>{
                let data = event.target.result;
                let workbook = XLSX.read(data,{type:"binary"});

                let sheet = Object.keys(workbook.Sheets)[0]
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

                        gender.value = totalInfo[i]['Пол / Sex']

                        dateEnd.setDate(dateStart.getDate()+totalInfo[i]['Год рождения / Date of birth '])
                        dateOfBirth.value = dateEnd.toLocaleDateString()
                        dateEnd = new Date(dateStart)

                        //series.value = totalInfo[i]['']
                        idPassport.value = totalInfo[i]['№ паспорта / Passport №']

                        dateEnd.setDate(dateStart.getDate()+totalInfo[i]['Дата выдачи / Date of issue'])
                        dateOfIssue.value = dateEnd.toLocaleDateString()
                        dateEnd = new Date(dateStart)

                        dateEnd.setDate(dateStart.getDate()+totalInfo[i]['Срок действия паспорта / Date of expiry'])
                        validUntil.value = dateEnd.toLocaleDateString()
                        dateEnd = new Date(dateStart)


                        issuedBy.value = totalInfo[i]['Кем выдан документ/ Authority']

                        stateBirth.value = totalInfo[i]['Государство рождения / Country of birth']
                        if (stateBirth.value == '' || stateBirth.value == undefined || stateBirth.value == " ") {
                            stateBirth.value = 'Другое'
                            otherStateBirth.value = totalInfo[i]['Государство рождения / Country of birth']
                        }
                        else {otherStateBirth.value = ""}
                        placeStateBirth.value = totalInfo[i]['Место рождения (из паспорта) / Place of birth']



                        placeStateGetVisa.value = totalInfo[i]['Государство  постоянного проживания / Permanent Residency']
                        if (placeStateGetVisa.value == '' || placeStateGetVisa.value == undefined || placeStateGetVisa.value == " ") {
                            placeStateGetVisa.value = 'Другое'
                            chPlaceStateGetVisa(placeStateGetVisa)
                            otherStateGetVisa.value = totalInfo[i]['Государство  постоянного проживания / Permanent Residency']
                        }
                        else {
                            otherStateGetVisa.value = ""
                            chPlaceStateGetVisa(placeStateGetVisa)
                        }



                        placeCityGetVisa.value = totalInfo[i]['Место получения визы / Visa Application Center']
                        if (placeCityGetVisa.value == '' || placeCityGetVisa.value == undefined || placeCityGetVisa.value == " ") {
                            placeCityGetVisa.value = 'Другое'
                            otherCityGetVisa.value = totalInfo[i]['Место получения визы / Visa Application Center']
                        }
                        else {otherCityGetVisa.value = ""}







                        homeAddress.value = totalInfo[i]['Cтрана / Country']
                            if (totalInfo[i]['Провинция / Province'] != undefined) {
                                homeAddress.value = homeAddress.value + ', пров.' + totalInfo[i]['Провинция / Province']
                            }
                            if (totalInfo[i]['Город / City']  != undefined) {
                                homeAddress.value = homeAddress.value + ', г.' + totalInfo[i]['Город / City']
                            }
                            if (totalInfo[i]['Улица / Street'] != undefined) {
                                homeAddress.value = homeAddress.value + ', ул.' +totalInfo[i]['Улица / Street']
                            }
                            if (totalInfo[i]['№ дома / building №. '] != undefined) {
                                homeAddress.value = homeAddress.value + ', д.' + totalInfo[i]['№ дома / building №. ']
                            }
                            if (totalInfo[i]['Квартира / Apt №'] != undefined) {
                                homeAddress.value = homeAddress.value + ', кв.' + totalInfo[i]['Квартира / Apt №']
                            }





                        levelEducation.value = totalInfo[i]['УРОВЕНЬ ОБРАЗОВАНИЯ/ LEVEL OF EDUCATION']
                        faculty.value = totalInfo[i]['Институт & Факультет (не заполняется, если цель поездки: ТРУДОВАЯ ДЕЯТЕЛЬНОСТЬ) / Institute & Faculty (Do not fill in if the purpose of visit is "WORK")']
                        course.value = totalInfo[i]['КУРС ОБУЧЕНИЯ/YEAR OF STUDYING']
                    }
                }
                if (personFinded == 0) {
                    alert('Студент с номером '+nStud.value+ ' не найден')
                }

            }
        }

    // });
}





