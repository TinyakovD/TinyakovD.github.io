function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

// path = ('../Templates/1.docx')
// window.generate = function generate() {
//     loadFile(
//         path,
//         function (error, content) {
//             if (error) {
//                 throw error;
//             }
//             var zip = new PizZip(content);
//             var doc = new window.docxtemplater(zip, {
//                 paragraphLoop: true,
//                 linebreaks: true,
//             });
//
//             // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
//             doc.render({
//                 firstname: document.getElementById('lastNameRu1').value,
//                 last_name: "Doe",
//                 phone: "0652455478",
//                 description: "New Website",
//             });
//
//             var out = doc.getZip().generate({
//                 type: "blob",
//                 mimeType:
//                     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//                 // compression: DEFLATE adds a compression step.
//                 // For a 50MB output document, expect 500ms additional CPU time
//                 compression: "DEFLATE",
//             });
//             // Output the document using Data-URI
//             saveAs(out, "output.docx");
//         }
//     );
// };

// Гарантийное письмо
window.generateGuarLetter = function generate() {
    path = ('../Templates/1.docx')
    for (let i =0; i<countTab();i++) {
        let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
        let elem = tabs[i]
        let indexTab = parseInt(elem.id.match(/\d+/))


        loadFile(
            path,
            function (error, content) {
                if (error) {
                    throw error;
                }
                var zip = new PizZip(content);
                var doc = new window.docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                // gender
                let gEgom = ''
                let gEmug = ''
                let gGog = ""
                let gInag = ""
                let gEeg = ""
                let gen = ''
                if (document.getElementById('gender'+indexTab).value == 'Мужской / Male') {
                    gEgom = 'его'
                    gEmug = 'ему'
                    gGog = 'ого'
                    gInag = 'ина'
                    gEeg = 'ему'
                    gen = '(М)'
                }
                else {
                    gEgom = 'ее'
                    gEmug = 'ей'
                    gGog = 'ой'
                    gInag = 'ки'
                    gEeg = 'ею'
                    gen = '(Ж)'
                }
                // grazd
                let grazdSklon = ""
                switch (document.getElementById('grazd').value) {
                    case 'Китай':
                        grazdSklon = "Китая";
                        break
                    case 'Вьетнам':
                        grazdSklon = 'Вьетнама'
                        break
                    case 'Туркменистан':
                        grazdSklon = 'Туркменистана'
                        break
                    case 'Монголия':
                        grazdSklon = 'Монголии'
                        break
                    case 'Тайвань (Китай)':
                        grazdSklon = 'Тайваня (Китай)'
                        break
                    case 'Другое':
                        grazdSklon = document.getElementById('otherGrazd').value
                        break
                }
                // regisration on
                let registrSklon = ''
                switch (document.getElementById('registrationOn').value) {
                    case "Круглов":
                        registrSklon = 'Начальник УМС                                                                                          В.В. Круглов'
                        break
                    case "Морозова":
                        registrSklon = "Заместитель начальника УМС                                                                О.А. Морозова"
                        break
                }
                //
                // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
                doc.render({

                    firstNameRu: document.getElementById('firstNameRu'+indexTab).value.toUpperCase(),
                    lastNameRu: document.getElementById('lastNameRu'+indexTab).value.toUpperCase(),
                    gEgo: gEgom,
                    gEmu: gEmug,
                    gGo: gGog,
                    gIna: gInag,
                    gEe: gEeg,
                    grazd: grazdSklon,
                    cDate: new Date(document.getElementById('cDate').value).toLocaleDateString(),
                    dateOfBirth: document.getElementById('dateOfBirth'+indexTab).value,
                    nStud: document.getElementById('nStud'+indexTab).value,
                    idPassport: document.getElementById('idPassport'+indexTab).value,
                    registrationOn: registrSklon
                });

                var out = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    // compression: DEFLATE adds a compression step.
                    // For a 50MB output document, expect 500ms additional CPU time
                    compression: "DEFLATE",
                });

                // Output the document using Data-URI
                saveAs(out, "Гарантийное письмо - " + document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + " " +
                    document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + gen +
                    " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + ".docx"
                );
            }
        );
    }

};

//Письмо поддержки
window.generateSupportLetter = function generate() {
    path = ('../Templates/2.docx')
    for (let i =0; i<countTab();i++) {
        let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
        let elem = tabs[i]
        let indexTab = parseInt(elem.id.match(/\d+/))


        loadFile(
            path,
            function (error, content) {
                if (error) {
                    throw error;
                }
                var zip = new PizZip(content);
                var doc = new window.docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                // gender
                let gInag = ""
                let gen = ''
                if (document.getElementById('gender'+indexTab).value == 'Мужской / Male') {
                    gInag = 'ина'
                    gen = '(М)'
                }
                else {
                    gInag = 'ки'
                    gen = '(Ж)'
                }
                // grazd
                let grazdSklon = ""
                switch (document.getElementById('grazd').value) {
                    case 'Китай':
                        grazdSklon = "Китая";
                        break
                    case 'Вьетнам':
                        grazdSklon = 'Вьетнама'
                        break
                    case 'Туркменистан':
                        grazdSklon = 'Туркменистана'
                        break
                    case 'Монголия':
                        grazdSklon = 'Монголии'
                        break
                    case 'Тайвань (Китай)':
                        grazdSklon = 'Тайваня (Китай)'
                        break
                    case 'Другое':
                        grazdSklon = document.getElementById('otherGrazd').value
                        break
                }
                // regisration on
                let registrSklon = ''
                switch (document.getElementById('registrationOn').value) {
                    case "Круглов":
                        registrSklon = 'Начальник УМС                                                                                          В.В. Круглов'
                        break
                    case "Морозова":
                        registrSklon = "Заместитель начальника УМС                                                                О.А. Морозова"
                        break
                }
                // faculty
                let facultySklon = ''
                switch (document.getElementById('faculty'+indexTab).options[document.getElementById('faculty'+indexTab).selectedIndex].text) {
                    case "(ИСГО) Институт социально-гуманитарного образования":
                        facultySklon = 'Института социально-гуманитарного образования'
                        break
                    case "(Музфак) Институт изящных искусств: Музыкальный факультет":
                        facultySklon = 'Института изящных искусств: Музыкального факультета'
                        break
                    case "(Худграф) Институт изящных искусств: Художественно-графический факультет":
                        facultySklon = 'Института изящных искусств: Художественно-графического факультета'
                        break
                    case "(ИФ) Институт филологии":
                        facultySklon = 'Института филологии'
                        break
                    case "(ИПП) Институт педагогики и психологии":
                        facultySklon = 'Института педагогики и психологии'
                        break
                    case "(ИИЯ) Институт иностранных языков":
                        facultySklon = 'Института иностранных языков'
                        break
                    case "(ИЖКиМ) Институт журналистики, коммуникаций и медиаобразования":
                        facultySklon = 'Института журналистики, коммуникаций и медиаобразования'
                        break
                    case "(ИБХ) Институт биологии и химии":
                        facultySklon = 'Института биологии и химии'
                        break
                    case "(Геофак) Географический факультет":
                        facultySklon = 'Географического факультета'
                        break
                    case "(ИИП) Институт истории и политики":
                        facultySklon = 'Института истории и политики'
                        break
                    case "(ИФТИС) Институт физики, технологии и информационных систем":
                        facultySklon = 'Института физики, технологии и информационных систем'
                        break
                    case "(ИД) Институт детства":
                        facultySklon = 'Института детства'
                        break
                    case "(ИФКСиЗ) Институт физической культуры, спорта и здоровья":
                        facultySklon = 'Института физической культуры, спорта и здоровья'
                        break
                    case "(ИМиИ) Институт математики и информатики":
                        facultySklon = 'Института математики и информатики'
                        break
                    case "(Дошфак) Факультет дошкольной педагогики и психологии":
                        facultySklon = 'Факультета дошкольной педагогики и психологии'
                        break
                    case "(ИМО) Институт международного образования":
                        facultySklon = 'Института международного образования'
                        break
                    case "(ИРЦО) Институт развития цифрового образования":
                        facultySklon = 'Института развития цифрового образования'
                        break
                }
                // course
                let courseSklon = ""
                switch (document.getElementById('course'+indexTab).value) {
                    case "1":
                        courseSklon = '1 курса'
                        break
                    case "2":
                        courseSklon = '2 курса'
                        break
                    case "3":
                        courseSklon = '3 курса'
                        break
                    case "4":
                        courseSklon = '4 курса'
                        break
                    case "5":
                        courseSklon = '5 курса'
                        break
                }
                // level Education
                let levelEducSklon = ''
                switch (document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text) {
                    case "Подфак":
                        levelEducSklon = 'подготовительного факультета'
                        break
                    case "Бакалавриат":
                        levelEducSklon = 'бакалавриата'
                        break
                    case "Магистратура":
                        levelEducSklon = 'магистратуры'
                        break
                    case "Аспирантура":
                        levelEducSklon = 'аспирантуры'
                        break
                    case "Стажировка":
                        levelEducSklon = 'в число стажирующихся студентов'
                        break
                    case "Стажировка(межвуз)":
                        levelEducSklon = 'в число стажирующихся студентов университета'
                        break
                }

                // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
                doc.render({

                    firstNameRu: document.getElementById('firstNameRu'+indexTab).value.toUpperCase(),
                    lastNameRu: document.getElementById('lastNameRu'+indexTab).value.toUpperCase(),
                    gIna: gInag,
                    grazd: grazdSklon,
                    cDate: new Date(document.getElementById('cDate').value).toLocaleDateString(),
                    dateOfBirth: document.getElementById('dateOfBirth'+indexTab).value,
                    nStud: document.getElementById('nStud'+indexTab).value,
                    idPassport: document.getElementById('idPassport'+indexTab).value,
                    registrationOn: registrSklon,

                    course: courseSklon,
                    faculty: facultySklon,
                    levelEducation: levelEducSklon,
                });

                var out = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    // compression: DEFLATE adds a compression step.
                    // For a 50MB output document, expect 500ms additional CPU time
                    compression: "DEFLATE",
                });
                // Output the document using Data-URI
                saveAs(out, "Письмо поддержки - " + document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + " " +
                    document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + gen +
                    " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + ".docx"
                );
            }
        );
    }

};

// Ходатайство
window.generateSolicitation = function generate() {
    path = ('../Templates/3.docx')
    for (let i =0; i<countTab();i++) {
        let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
        let elem = tabs[i]
        let indexTab = parseInt(elem.id.match(/\d+/))


        loadFile(
            path,
            function (error, content) {
                if (error) {
                    throw error;
                }
                var zip = new PizZip(content);
                var doc = new window.docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });



                // regisration on
                let registrSklon = ''
                switch (document.getElementById('registrationOn').value) {
                    case "Круглов":
                        registrSklon = 'В.В. Круглов'
                        break
                    case "Морозова":
                        registrSklon = "О.А. Морозова"
                        break
                }

                // grazd
                let grazdSklon = document.getElementById('grazd').options[document.getElementById('grazd').selectedIndex].text
                switch (document.getElementById('grazd').options[document.getElementById('grazd').selectedIndex].text) {
                    case 'Другое':
                        grazdSklon = document.getElementById('otherGrazd').value
                        break
                }
                // gender
                let genSklonM = "□"
                let genSklonW = "□"
                let gen = ''
                if (document.getElementById('gender'+indexTab).value == 'Мужской / Male') {
                    genSklonM = '☒'
                    gen = '(М)'
                }
                else {
                    genSklonW = '☒'
                    gen = '(Ж)'
                }
                // entry Visa
                let entryVisaSklonO = '□'
                let entryVisaSklonD = '□'
                let entryVisaSklonM = '□'
                switch (document.getElementById('entryVisa'+indexTab).options[document.getElementById('entryVisa'+indexTab).selectedIndex].text) {
                    case "Однократная":
                        entryVisaSklonO = '☒'
                        break
                    case "Двукратная":
                        entryVisaSklonD = '☒'
                        break
                    case "Многократная":
                        entryVisaSklonM = '☒'
                        break

                }
                // typeVisa
                let typeVisaSklonU = '□'
                let typeVisaSklonR = '□'
                let typeVisaSklonG = '□'
                switch (document.getElementById('typeVisa'+indexTab).options[document.getElementById('typeVisa'+indexTab).selectedIndex].text) {
                    case 'Учебная':
                        typeVisaSklonU = '☒'
                        break
                    case 'Рабочая':
                        typeVisaSklonR = '☒'
                        break
                    case 'Гуманитарная':
                        typeVisaSklonG = '☒'
                        break

                }
                // stateBirth
                let stateBirthSklon = document.getElementById('stateBirth'+indexTab).options[document.getElementById('stateBirth'+indexTab).selectedIndex].text
                switch (document.getElementById('stateBirth'+indexTab).options[document.getElementById('stateBirth'+indexTab).selectedIndex].text) {
                    case "Другое":
                        stateBirthSklon = document.getElementById('otherStateBirth'+indexTab).value
                        break
                }
                // place State Get Visa
                let placeStateGetVisaSklon = document.getElementById('placeStateGetVisa'+indexTab).options[document.getElementById('placeStateGetVisa'+indexTab).selectedIndex].text
                switch (document.getElementById('placeStateGetVisa'+indexTab).options[document.getElementById('placeStateGetVisa'+indexTab).selectedIndex].text) {
                    case "Другое":
                        placeStateGetVisaSklon = document.getElementById('otherStateGetVisa'+indexTab).value
                        break
                }
                // place City Get Visa
                let placeCityGetVisaSklon = document.getElementById('placeCityGetVisa'+indexTab).options[document.getElementById('placeCityGetVisa'+indexTab).selectedIndex].text
                switch (document.getElementById('placeCityGetVisa'+indexTab).options[document.getElementById('placeCityGetVisa'+indexTab).selectedIndex].text) {
                    case "Другое":
                        placeCityGetVisaSklon = document.getElementById('otherCityGetVisa'+indexTab).value
                        break
                }

                // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
                doc.render({

                    cDate: new Date(document.getElementById('cDate').value).toLocaleDateString(),
                    purpose: document.getElementById('purpose').options[document.getElementById('purpose').selectedIndex].text.toUpperCase(),
                    poDateDays: document.getElementById('poDateDays').value,
                    poDate: new Date(document.getElementById('poDate').value).toLocaleDateString(),
                    thirdPoDate: new Date(document.getElementById('thirdPoDate').value).toLocaleDateString(),
                    entryVisaO: entryVisaSklonO,
                    entryVisaD: entryVisaSklonD,
                    entryVisaM: entryVisaSklonM,
                    typeVisaU: typeVisaSklonU,
                    typeVisaR: typeVisaSklonR,
                    typeVisaG: typeVisaSklonG,
                    firstNameRu: document.getElementById('firstNameRu'+indexTab).value.toUpperCase(),
                    lastNameRu: document.getElementById('lastNameRu'+indexTab).value.toUpperCase(),
                    firstNameEn: document.getElementById('firstNameEn'+indexTab).value.toUpperCase(),
                    lastNameEn: document.getElementById('lastNameEn'+indexTab).value.toUpperCase(),
                    genM: genSklonM,
                    genW: genSklonW,
                    dateOfBirth: document.getElementById('dateOfBirth'+indexTab).value,
                    stateBirth: stateBirthSklon.toUpperCase(),
                    placeStateBirth: document.getElementById('placeStateBirth' + indexTab).value.toUpperCase(),
                    grazd: grazdSklon.toUpperCase(),
                    placeStateGetVisa: placeStateGetVisaSklon.toUpperCase(),
                    placeCityGetVisa: placeCityGetVisaSklon.toUpperCase(),
                    homeAddress: document.getElementById('homeAddress'+indexTab).value.toUpperCase(),
                    idPassport: document.getElementById('idPassport'+indexTab).value.toUpperCase(),
                    issuedBy: document.getElementById('issuedBy'+indexTab).value.toUpperCase(),
                    dateOfIssue: document.getElementById('dateOfIssue'+indexTab).value.toUpperCase(),
                    validUntil: document.getElementById('validUntil'+indexTab).value.toUpperCase(),
                    registrationOn: registrSklon,
                });

                var out = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    // compression: DEFLATE adds a compression step.
                    // For a 50MB output document, expect 500ms additional CPU time
                    compression: "DEFLATE",
                });
                // Output the document using Data-URI
                saveAs(out, "ХОДАТАЙСТВО - " + document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + " " +
                    document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + gen +
                    " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + ".docx"
                );
            }
        );
    }

};



// Письмо обоснование
window.generateJustification = function generate() {
    path = ('../Templates/4.docx')
    // for (let i =0; i<countTab();i++) {
    //     let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
    //     let elem = tabs[i]
    //     let indexTab = parseInt(elem.id.match(/\d+/))
    //
    //
    //     loadFile(
    //         path,
    //         function (error, content) {
    //             if (error) {
    //                 throw error;
    //             }
    //             var zip = new PizZip(content);
    //             var doc = new window.docxtemplater(zip, {
    //                 paragraphLoop: true,
    //                 linebreaks: true,
    //             });
    //
    //
    //
    //             // regisration on
    //             let registrSklon = ''
    //             switch (document.getElementById('registrationOn').value) {
    //                 case "Круглов":
    //                     registrSklon = 'В.В. Круглов'
    //                     break
    //                 case "Морозова":
    //                     registrSklon = "О.А. Морозова"
    //                     break
    //             }
    //
    //             // grazd
    //             let grazdSklon = document.getElementById('grazd').options[document.getElementById('grazd').selectedIndex].text
    //             switch (document.getElementById('grazd').options[document.getElementById('grazd').selectedIndex].text) {
    //                 case 'Другое':
    //                     grazdSklon = document.getElementById('otherGrazd').value
    //                     break
    //             }
    //             // gender
    //             let genSklonM = "□"
    //             let genSklonW = "□"
    //             let gen = ''
    //             if (document.getElementById('gender'+indexTab).value == 'Мужской / Male') {
    //                 genSklonM = '☒'
    //                 gen = '(М)'
    //             }
    //             else {
    //                 genSklonW = '☒'
    //                 gen = '(Ж)'
    //             }
    //             // entry Visa
    //             let entryVisaSklonO = '□'
    //             let entryVisaSklonD = '□'
    //             let entryVisaSklonM = '□'
    //             switch (document.getElementById('entryVisa'+indexTab).options[document.getElementById('entryVisa'+indexTab).selectedIndex].text) {
    //                 case "Однократная":
    //                     entryVisaSklonO = '☒'
    //                     break
    //                 case "Двукратная":
    //                     entryVisaSklonD = '☒'
    //                     break
    //                 case "Многократная":
    //                     entryVisaSklonM = '☒'
    //                     break
    //
    //             }
    //             // typeVisa
    //             let typeVisaSklonU = '□'
    //             let typeVisaSklonR = '□'
    //             let typeVisaSklonG = '□'
    //             switch (document.getElementById('typeVisa'+indexTab).options[document.getElementById('typeVisa'+indexTab).selectedIndex].text) {
    //                 case 'Учебная':
    //                     typeVisaSklonU = '☒'
    //                     break
    //                 case 'Рабочая':
    //                     typeVisaSklonR = '☒'
    //                     break
    //                 case 'Гуманитарная':
    //                     typeVisaSklonG = '☒'
    //                     break
    //
    //             }
    //             // stateBirth
    //             let stateBirthSklon = document.getElementById('stateBirth'+indexTab).options[document.getElementById('stateBirth'+indexTab).selectedIndex].text
    //             switch (document.getElementById('stateBirth'+indexTab).options[document.getElementById('stateBirth'+indexTab).selectedIndex].text) {
    //                 case "Другое":
    //                     stateBirthSklon = document.getElementById('otherStateBirth'+indexTab).value
    //                     break
    //             }
    //             // place State Get Visa
    //             let placeStateGetVisaSklon = document.getElementById('placeStateGetVisa'+indexTab).options[document.getElementById('placeStateGetVisa'+indexTab).selectedIndex].text
    //             switch (document.getElementById('placeStateGetVisa'+indexTab).options[document.getElementById('placeStateGetVisa'+indexTab).selectedIndex].text) {
    //                 case "Другое":
    //                     placeStateGetVisaSklon = document.getElementById('otherStateGetVisa'+indexTab).value
    //                     break
    //             }
    //             // place City Get Visa
    //             let placeCityGetVisaSklon = document.getElementById('placeCityGetVisa'+indexTab).options[document.getElementById('placeCityGetVisa'+indexTab).selectedIndex].text
    //             switch (document.getElementById('placeCityGetVisa'+indexTab).options[document.getElementById('placeCityGetVisa'+indexTab).selectedIndex].text) {
    //                 case "Другое":
    //                     placeCityGetVisaSklon = document.getElementById('otherCityGetVisa'+indexTab).value
    //                     break
    //             }
    //
    //             // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    //             doc.render({
    //
    //                 cDate: new Date(document.getElementById('cDate').value).toLocaleDateString(),
    //                 purpose: document.getElementById('purpose').options[document.getElementById('purpose').selectedIndex].text.toUpperCase(),
    //                 poDateDays: document.getElementById('poDateDays').value,
    //                 poDate: new Date(document.getElementById('poDate').value).toLocaleDateString(),
    //                 thirdPoDate: new Date(document.getElementById('thirdPoDate').value).toLocaleDateString(),
    //                 entryVisaO: entryVisaSklonO,
    //                 entryVisaD: entryVisaSklonD,
    //                 entryVisaM: entryVisaSklonM,
    //                 typeVisaU: typeVisaSklonU,
    //                 typeVisaR: typeVisaSklonR,
    //                 typeVisaG: typeVisaSklonG,
    //                 firstNameRu: document.getElementById('firstNameRu'+indexTab).value.toUpperCase(),
    //                 lastNameRu: document.getElementById('lastNameRu'+indexTab).value.toUpperCase(),
    //                 firstNameEn: document.getElementById('firstNameEn'+indexTab).value.toUpperCase(),
    //                 lastNameEn: document.getElementById('lastNameEn'+indexTab).value.toUpperCase(),
    //                 genM: genSklonM,
    //                 genW: genSklonW,
    //                 dateOfBirth: document.getElementById('dateOfBirth'+indexTab).value,
    //                 stateBirth: stateBirthSklon.toUpperCase(),
    //                 placeStateBirth: document.getElementById('placeStateBirth' + indexTab).value.toUpperCase(),
    //                 grazd: grazdSklon.toUpperCase(),
    //                 placeStateGetVisa: placeStateGetVisaSklon.toUpperCase(),
    //                 placeCityGetVisa: placeCityGetVisaSklon.toUpperCase(),
    //                 homeAddress: document.getElementById('homeAddress'+indexTab).value.toUpperCase(),
    //                 idPassport: document.getElementById('idPassport'+indexTab).value.toUpperCase(),
    //                 issuedBy: document.getElementById('issuedBy'+indexTab).value.toUpperCase(),
    //                 dateOfIssue: document.getElementById('dateOfIssue'+indexTab).value.toUpperCase(),
    //                 validUntil: document.getElementById('validUntil'+indexTab).value.toUpperCase(),
    //                 registrationOn: registrSklon,
    //             });
    //
    //             var out = doc.getZip().generate({
    //                 type: "blob",
    //                 mimeType:
    //                     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //                 // compression: DEFLATE adds a compression step.
    //                 // For a 50MB output document, expect 500ms additional CPU time
    //                 compression: "DEFLATE",
    //             });
    //             // Output the document using Data-URI
    //             saveAs(out, "ХОДАТАЙСТВО - " + document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + " " +
    //                 document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + gen +
    //                 " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + ".docx"
    //             );
    //         }
    //     );
    // }

    let students = []
    let facultys = []
    let levelEducations = []
    let courses = []
    let nStudent = []

    // regisration on
    let registrSklon = ''
    switch (document.getElementById('registrationOn').value) {
        case "Круглов":
            registrSklon = 'Начальник УМС                                                                                          В.В. Круглов'
            break
        case "Морозова":
            registrSklon = "Заместитель начальника УМС                                                                О.А. Морозова"
            break
    }

    //grazd
    let grazdSklon = ""
    switch (document.getElementById('grazd').value) {
        case 'Китай':
            grazdSklon = "Китая";
            break
        case 'Вьетнам':
            grazdSklon = 'Вьетнама'
            break
        case 'Туркменистан':
            grazdSklon = 'Туркменистана'
            break
        case 'Монголия':
            grazdSklon = 'Монголии'
            break
        case 'Тайвань (Китай)':
            grazdSklon = 'Тайваня (Китай)'
            break
        case 'Другое':
            grazdSklon = document.getElementById('otherGrazd').value
            break
    }



    for (let i =0; i<countTab();i++) {
        let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
        let elem = tabs[i]
        let indexTab = parseInt(elem.id.match(/\d+/))


        //students
        students.push({
            firstNameRu: document.getElementById('firstNameRu'+indexTab).value.toUpperCase(),
            lastNameRu: document.getElementById('lastNameRu' + indexTab).value.toUpperCase(),
            zap: ', '
        })
        // nStudent
        nStudent.push({nSt: document.getElementById('nStud' + indexTab).value, zap: ', '})

        // levelEducations
        switch (document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text) {
            case "Подфак" :
                if (!levelEducations.some(el => el.nameText === 'Подфак')){
                    levelEducations.push({nameText: 'Подфак', levelEducSklon: 'подготовительного факультета', zap: ', '})}
                break
            case "Бакалавриат":
                if (!levelEducations.some(el => el.nameText === 'Бакалавриат')) {
                    levelEducations.push({nameText: 'Бакалавриат', levelEducSklon: 'бакалавриата', zap: ', '})}
                break
            case "Магистратура":
                if (!levelEducations.some(el => el.nameText === 'Магистратура')) {
                    levelEducations.push({nameText: 'Магистратура', levelEducSklon: 'магистратуры', zap: ', '})}
                break
            case "Аспирантура":
                if (!levelEducations.some(el => el.nameText === 'Аспирантура')) {
                    levelEducations.push({nameText: 'Аспирантура', levelEducSklon: 'аспирантуры', zap: ', '})}
                break
            case "Стажировка":
                if (!levelEducations.some(el => el.nameText === 'Стажировка')) {
                    levelEducations.push({nameText: 'Стажировка', levelEducSklon: 'в число стажирующихся студентов', zap: ', '})}
                break
            case "Стажировка(межвуз)":
                if (!levelEducations.some(el => el.nameText === 'Стажировка(межвуз)')) {
                    levelEducations.push({nameText: 'Стажировка(межвуз)', levelEducSklon: 'в число стажирующихся студентов университета', zap: ', '})}
                break
        }

        //facultys
        switch (document.getElementById('faculty'+indexTab).options[document.getElementById('faculty'+indexTab).selectedIndex].text) {
            case "(ИСГО) Институт социально-гуманитарного образования":
                if (!facultys.some(el => el.nameText === '(ИСГО) Институт социально-гуманитарного образования')) {
                facultys.push({nameText: '(ИСГО) Институт социально-гуманитарного образования', facultySklon: 'Института социально-гуманитарного образования', zap: ', '})}
                break
            case "(Музфак) Институт изящных искусств: Музыкальный факультет":
                if (!facultys.some(el => el.nameText === '(Музфак) Институт изящных искусств: Музыкальный факультет')) {
                facultys.push({nameText: '(Музфак) Институт изящных искусств: Музыкальный факультет', facultySklon: 'Института изящных искусств: Музыкального факультета', zap: ', '})}
                break
            case "(Худграф) Институт изящных искусств: Художественно-графический факультет":
                if (!facultys.some(el => el.nameText === '(Худграф) Институт изящных искусств: Художественно-графический факультет')) {
                facultys.push({nameText: '(Худграф) Институт изящных искусств: Художественно-графический факультет', facultySklon: 'Института изящных искусств: Художественно-графического факультета', zap: ', '})}
                break
            case "(ИФ) Институт филологии":
                if (!facultys.some(el => el.nameText === '(ИФ) Институт филологии')) {
                facultys.push({nameText: '(ИФ) Институт филологии', facultySklon: 'Института филологии', zap: ', '})}
                break
            case "(ИПП) Институт педагогики и психологии":
                if (!facultys.some(el => el.nameText === '(ИПП) Институт педагогики и психологии')) {
                facultys.push({nameText: '(ИПП) Институт педагогики и психологии', facultySklon: 'Института педагогики и психологии', zap: ', '})}
                break
            case "(ИИЯ) Институт иностранных языков":
                if (!facultys.some(el => el.nameText === '(ИИЯ) Институт иностранных языков')) {
                facultys.push({nameText: '(ИИЯ) Институт иностранных языков', facultySklon: 'Института иностранных языков', zap: ', '})}
                break
            case "(ИЖКиМ) Институт журналистики, коммуникаций и медиаобразования":
                if (!facultys.some(el => el.nameText === '(ИЖКиМ) Институт журналистики, коммуникаций и медиаобразования')) {
                facultys.push({nameText: '(ИЖКиМ) Институт журналистики, коммуникаций и медиаобразования', facultySklon: 'Института журналистики, коммуникаций и медиаобразования', zap: ', '})}
                break
            case "(ИБХ) Институт биологии и химии":
                if (!facultys.some(el => el.nameText === '(ИБХ) Институт биологии и химии')) {
                facultys.push({nameText: '(ИБХ) Институт биологии и химии', facultySklon: 'Института биологии и химии', zap: ', '})}
                break
            case "(Геофак) Географический факультет":
                if (!facultys.some(el => el.nameText === '(Геофак) Географический факультет')) {
                facultys.push({nameText: '(Геофак) Географический факультет', facultySklon: 'Географического факультета', zap: ', '})}
                break
            case "(ИИП) Институт истории и политики":
                if (!facultys.some(el => el.nameText === '(ИИП) Институт истории и политики')) {
                facultys.push({nameText: '(ИИП) Институт истории и политики', facultySklon: 'Института истории и политики', zap: ', '})}
                break
            case "(ИФТИС) Институт физики, технологии и информационных систем":
                if (!facultys.some(el => el.nameText === '(ИФТИС) Институт физики, технологии и информационных систем')) {
                facultys.push({nameText: '(ИФТИС) Институт физики, технологии и информационных систем', facultySklon: 'Института физики, технологии и информационных систем', zap: ', '})}
                break
            case "(ИД) Институт детства":
                if (!facultys.some(el => el.nameText === '(ИД) Институт детства')) {
                facultys.push({nameText: '(ИД) Институт детства', facultySklon: 'Института детства', zap: ', '})}
                break
            case "(ИФКСиЗ) Институт физической культуры, спорта и здоровья":
                if (!facultys.some(el => el.nameText === '(ИФКСиЗ) Институт физической культуры, спорта и здоровья')) {
                facultys.push({nameText: '(ИФКСиЗ) Институт физической культуры, спорта и здоровья', facultySklon: 'Института физической культуры, спорта и здоровья', zap: ', '})}
                break
            case "(ИМиИ) Институт математики и информатики":
                if (!facultys.some(el => el.nameText === '(ИМиИ) Институт математики и информатики')) {
                facultys.push({nameText: '(ИМиИ) Институт математики и информатики', facultySklon: 'Института математики и информатики', zap: ', '})}
                break
            case "(Дошфак) Факультет дошкольной педагогики и психологии":
                if (!facultys.some(el => el.nameText === '(Дошфак) Факультет дошкольной педагогики и психологии')) {
                facultys.push({nameText: '(Дошфак) Факультет дошкольной педагогики и психологии', facultySklon: 'Факультета дошкольной педагогики и психологии', zap: ', '})}
                break
            case "(ИМО) Институт международного образования":
                if (!facultys.some(el => el.nameText === '(ИМО) Институт международного образования')) {
                facultys.push({nameText: '(ИМО) Институт международного образования', facultySklon: 'Института международного образования', zap: ', '})}
                break
            case "(ИРЦО) Институт развития цифрового образования":
                if (!facultys.some(el => el.nameText === '(ИРЦО) Институт развития цифрового образования')) {
                facultys.push({nameText: '(ИРЦО) Институт развития цифрового образования', facultySklon: 'Института развития цифрового образования', zap: ', '})}
                break
        }

        // courses
        switch (document.getElementById('course'+indexTab).value) {
            case "1":
                if (!courses.some(el => el.nameText === '1')) {
                    courses.push({nameText: '1', zap: ', '})}
                break
            case "2":
                if (!courses.some(el => el.nameText === '2')) {
                    courses.push({nameText: '2', zap: ', '})}
                break
            case "3":
                if (!courses.some(el => el.nameText === '3')) {
                    courses.push({nameText: '3', zap: ', '})}
                break
            case "4":
                if (!courses.some(el => el.nameText === '4')) {
                    courses.push({nameText: '4', zap: ', '})}
                break
            case "5":
                if (!courses.some(el => el.nameText === '5')) {
                    courses.push({nameText: '5', zap: ', '})}
                break
        }
    }

    // delete last zap
    students[students.length-1].zap = ''
    nStudent[nStudent.length-1].zap = ''
    levelEducations[levelEducations.length-1].zap = ''
    facultys[facultys.length-1].zap = ''
    courses[courses.length-1].zap = ''

    loadFile(
        path,
        function (error, content) {
            if (error) {
                throw error;
            }
            var zip = new PizZip(content);
            var doc = new window.docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            doc.render({
                cDate: new Date(document.getElementById('cDate').value).toLocaleDateString(),
                'students': students,
                'levelEducation': levelEducations,
                'faculty': facultys,
                'course': courses,
                registrationOn: registrSklon,
                grazd: grazdSklon,
                purpose: document.getElementById('purpose').options[document.getElementById('purpose').selectedIndex].text.toUpperCase(),
                'nStud': nStudent,

            })


            var out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                // compression: DEFLATE adds a compression step.
                // For a 50MB output document, expect 500ms additional CPU time
                compression: "DEFLATE",
            });


            let nameFile = 'Письмо-обоснование - '
            for (let i = 0; i<students.length; i++) {
                nameFile = nameFile + students[i].lastNameRu.toUpperCase() + ' ' + students[i].firstNameRu.toUpperCase()+', '
            }
            nameFile = nameFile.slice(0,-2) + '.docx'

            // Output the document using Data-URI
            saveAs(out, nameFile);
        }
    );
};




// function proverka() {
//     let elemList = document.querySelectorAll('input')
//     elemList.forEach(elem => {
//         if (elem.value == "" || elem.value == undefined) {
//             console.log(elem)
//             elem.style = 'border-top-width: 5px'
//         }
//         else {}
//     })
// }
