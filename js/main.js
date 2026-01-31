function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}
// Гарантийное письмо
window.generateGuarLetter = function generate() {
    path = ('../Templates/1.docx')
    
    var zipDocs = new PizZip();
        loadFile(
            path,
            function (error, content) {
                if (error) {
                    throw error;
                }

                function replaceErrors(key, value) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
                            error[key] = value[key];
                            return error;
                        }, {});
                    }
                    return value;
                }
                function errorHandler(error) {
                    console.log(JSON.stringify({error: error}, replaceErrors));

                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors.map(function (error) {
                            return error.properties.explanation;
                        }).join("\n");
                        console.log('errorMessages', errorMessages);
                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }

                //test
                for (let i =0; i<countTab();i++) {
                    var zip = new PizZip(content);
                    var doc = new window.docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                    });

                    let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
                    let elem = tabs[i]
                    let indexTab = parseInt(elem.id.match(/\d+/))


                    // gender
                    let gEgom = ''
                    let gEmug = ''
                    let gGog = ""
                    let gInag = ""
                    let gEeg = ""
                    let gen = ''
                    if (document.getElementById('gender' + indexTab).value == 'Мужской / Male') {
                        gEgom = 'его'
                        gEmug = 'ему'
                        gGog = 'ого'
                        gInag = 'ина'
                        gEeg = 'ему'
                        gen = '(М)'
                    } else {
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


                    //addressProj
                    let addressProj = 'г. Москва, проспект Вернадского, 88.'
                    if (document.getElementById('faculty'+indexTab).options[document.getElementById('faculty'+indexTab).selectedIndex].text == "Покровский филиал МПГУ"){
                        addressProj = 'Владимирская область, Петушинский район, г. Покров, ул. Быкова, д. 24.'
                    }
                    else if (document.getElementById('faculty'+indexTab).options[document.getElementById('faculty'+indexTab).selectedIndex].text == "Дербентский филиал МПГУ"){
                        addressProj = 'Респ. Дагестан, г. Дербент, ул. Буйнакского, д. 18'
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
                    doc.setData({

                        firstNameRu: document.getElementById('firstNameRu' + indexTab).value.toUpperCase(),
                        lastNameRu: document.getElementById('lastNameRu' + indexTab).value.toUpperCase(),
                        gEgo: gEgom,
                        gEmu: gEmug,
                        gGo: gGog,
                        gIna: gInag,
                        gEe: gEeg,
                        grazd: grazdSklon,
                        cDate: new Date(document.getElementById('cDate').value).toLocaleDateString(),
                        dateOfBirth: document.getElementById('dateOfBirth' + indexTab).value,
                        nStud: document.getElementById('nStud' + indexTab).value,
                        idPassport: document.getElementById('idPassport' + indexTab).value,
                        addressProj: addressProj,
                        registrationOn: registrSklon
                    });



                    try {
                        doc.render();
                    }
                    catch (error) {
                        // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
                        errorHandler(error);
                    }
                    var out = doc.getZip().generate();
                    zipDocs.file("Гарантийное письмо - " + document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + " " +
                        document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + gen +
                        " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + ".docx"
                        , out, {base64: true}
                    );
                } // end for


                let nameFile = ''
                if (countTab()==1) {
                    nameFile = document.getElementById('nStud1').value
                        +" Гарантийное письмо.zip"
                }
                else {
                    nameFile = document.getElementById('nStud1').value + '-'+
                        document.getElementById('nStud'+(lastTab()-1)).value
                        +" Гарантийное письмо.zip"
                }
                var content = zipDocs.generate({ type: "blob" });
                saveAs(content,nameFile);
            });
};

//Письмо поддержки
window.generateSupportLetter = function generate() {
    path = ('../Templates/2.docx')
    var zipDocs = new PizZip();
        loadFile(
            path,
            function (error, content) {
                if (error) {
                    throw error;
                }

                function replaceErrors(key, value) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
                            error[key] = value[key];
                            return error;
                        }, {});
                    }
                    return value;
                }
                function errorHandler(error) {
                    console.log(JSON.stringify({error: error}, replaceErrors));

                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors.map(function (error) {
                            return error.properties.explanation;
                        }).join("\n");
                        console.log('errorMessages', errorMessages);
                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }



                for (let i =0; i<countTab();i++) {
                    var zip = new PizZip(content);
                    var doc = new window.docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                    });

                    let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
                    let elem = tabs[i]
                    let indexTab = parseInt(elem.id.match(/\d+/))

                    // gender
                    let gInag = ""
                    let gen = ''
                    if (document.getElementById('gender'+indexTab).value == 'Мужской / Male') {
                        gInag = 'ина'
                        gen = '(М)'
                    }
                    else {
                        gInag = 'ку'
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
                        default:
                            facultySklon = ''
                            break

                        case "(ФНО) Институт детства: Факультет начального образования":
                            facultySklon = 'Института детства: Факультета начального образования'
                            break
                        case "(Деф) Институт детства: Дефектологический факультет":
                            facultySklon = 'Института детства: Дефектологический факультет'
                            break

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
                        case "Покровский филиал МПГУ":
                            facultySklon = 'Покровского филиала МПГУ'
                            break
                        case "Дербентский филиал МПГУ":
                            facultySklon = 'Дербентского филиала МПГУ'
                            break
                    }
                    // course
                    let courseSklon = ""
                    switch (document.getElementById('course'+indexTab).value) {
                        default:
                            courseSklon = ''
                            break
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
                        default:
                            levelEducSklon = ''
                            break
                        case "Подфак":
                            levelEducSklon = 'в число студентов подготовительного факультета в Центр довузовской подготовки иностранных граждан по русскому языку (МПГУ)'
                            break
                        case "Бакалавриат":
                            levelEducSklon = 'в число студентов бакалавриата'
                            break
                        case "Магистратура":
                            levelEducSklon = 'в число студентов магистратуры'
                            break
                        case "Аспирантура":
                            levelEducSklon = 'в число студентов аспирантуры'
                            break
                        case "Стажировка":
                            levelEducSklon = 'в число стажирующихся студентов'
                            break
                        case "Стажировка(межвуз)":
                            levelEducSklon = 'в число стажирующихся студентов университета'
                            break
                    }

                    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
                    doc.setData({

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
                        academicYear: document.getElementById('academicYear').options[document.getElementById('academicYear').selectedIndex].text,
                    });

                    try {
                        doc.render();
                    }
                    catch (error) {
                        // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
                        errorHandler(error);
                    }

                    var out = doc.getZip().generate();
                    // Output the document using Data-URI
                    zipDocs.file("Письмо поддержки - " + document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + " " +
                        document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + gen +
                        " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + ".docx"
                        , out, {base64: true}
                    )
                }
                let nameFile = ''
                if (countTab()==1) {
                    nameFile = document.getElementById('nStud1').value
                        +" Письмо поддержки.zip"
                }
                else {
                    nameFile = document.getElementById('nStud1').value + '-'+
                        document.getElementById('nStud'+(lastTab()-1)).value
                        +" Письмо поддержки.zip"
                }
                var content = zipDocs.generate({ type: "blob" });
                saveAs(content,nameFile);
        });
};

// Ходатайство
window.generateSolicitation = function generate() {
    path = ('../Templates/3.docx')
    var zipDocs = new PizZip();
        loadFile(
            path,
            function (error, content) {
                if (error) {
                    throw error;
                }

                function replaceErrors(key, value) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
                            error[key] = value[key];
                            return error;
                        }, {});
                    }
                    return value;
                }
                function errorHandler(error) {
                    console.log(JSON.stringify({error: error}, replaceErrors));

                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors.map(function (error) {
                            return error.properties.explanation;
                        }).join("\n");
                        console.log('errorMessages', errorMessages);
                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }

                for (let i =0; i<countTab();i++) {
                    var zip = new PizZip(content);
                    var doc = new window.docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                    });

                    let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
                    let elem = tabs[i]
                    let indexTab = parseInt(elem.id.match(/\d+/))

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
                    if (document.getElementById('gender' + indexTab).value == 'Мужской / Male') {
                        genSklonM = '☒'
                        gen = '(М)'
                    } else {
                        genSklonW = '☒'
                        gen = '(Ж)'
                    }
                    // entry Visa
                    let entryVisaSklonO = '□'
                    let entryVisaSklonD = '□'
                    let entryVisaSklonM = '□'
                    switch (document.getElementById('entryVisa' + indexTab).options[document.getElementById('entryVisa' + indexTab).selectedIndex].text) {
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
                    switch (document.getElementById('typeVisa' + indexTab).options[document.getElementById('typeVisa' + indexTab).selectedIndex].text) {
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
                    let stateBirthSklon = document.getElementById('stateBirth' + indexTab).options[document.getElementById('stateBirth' + indexTab).selectedIndex].text
                    switch (document.getElementById('stateBirth' + indexTab).options[document.getElementById('stateBirth' + indexTab).selectedIndex].text) {
                        case "Другое":
                            stateBirthSklon = document.getElementById('otherStateBirth' + indexTab).value
                            break
                    }
                    // place State Get Visa
                    let placeStateGetVisaSklon = document.getElementById('placeStateGetVisa' + indexTab).options[document.getElementById('placeStateGetVisa' + indexTab).selectedIndex].text
                    switch (document.getElementById('placeStateGetVisa' + indexTab).options[document.getElementById('placeStateGetVisa' + indexTab).selectedIndex].text) {
                        case "Другое":
                            placeStateGetVisaSklon = document.getElementById('otherStateGetVisa' + indexTab).value
                            break
                    }
                    // place City Get Visa
                    let placeCityGetVisaSklon = document.getElementById('placeCityGetVisa' + indexTab).options[document.getElementById('placeCityGetVisa' + indexTab).selectedIndex].text
                    switch (document.getElementById('placeCityGetVisa' + indexTab).options[document.getElementById('placeCityGetVisa' + indexTab).selectedIndex].text) {
                        case "Другое":
                            placeCityGetVisaSklon = document.getElementById('otherCityGetVisa' + indexTab).value
                            break
                    }


                    let addressProj = 'МОСКВА'
                    let addressProjObl = ''
                    let addressProjRa = ''
                    let addressProjCity = 'Г. МОСКВА'
                    let addressProjStr = 'ПРОСПЕКТ ВЕРНАДСКОГО'
                    let addressProjD = '88'
                    let addressProjK = '1'
                    let addressProjTel = '+7 (965) 109-85-50'
                    if (document.getElementById('faculty'+indexTab).options[document.getElementById('faculty'+indexTab).selectedIndex].text == "Покровский филиал МПГУ"){
                        addressProj = 'МОСКВА, ПОКРОВ, ВЛАДИМИРСКАЯ ОБЛАСТЬ'
                        addressProjObl = 'ВЛАДИМИРСКАЯ ОБЛАСТЬ'
                        addressProjRa = 'ПЕТУШИНСКИЙ РАЙОН'
                        addressProjCity = 'Г. ПОКРОВ'
                        addressProjStr = 'БЫКОВА'
                        addressProjD = '24'
                        addressProjK = ''
                        addressProjTel = '+7 (915) 779-56-73'
                    }
                    else if (document.getElementById('faculty'+indexTab).options[document.getElementById('faculty'+indexTab).selectedIndex].text == "Дербентский филиал МПГУ"){
                        addressProj = 'РЕСПУБЛИКА ДАГЕСТАН'
                        addressProjObl = ''
                        addressProjRa = 'ПЕТУШИНСКИЙ РАЙОН'
                        addressProjCity = 'Г. ДЕРБЕНТ'
                        addressProjStr = 'БУЙНАКСКОГО'
                        addressProjD = '18'
                        addressProjK = ''
                        addressProjTel = '+7 (87240) 4-08-94'
                    }




                    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
                    doc.setData({

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
                        firstNameRu: document.getElementById('firstNameRu' + indexTab).value.toUpperCase(),
                        lastNameRu: document.getElementById('lastNameRu' + indexTab).value.toUpperCase(),
                        firstNameEn: document.getElementById('firstNameEn' + indexTab).value.toUpperCase(),
                        lastNameEn: document.getElementById('lastNameEn' + indexTab).value.toUpperCase(),
                        genM: genSklonM,
                        genW: genSklonW,
                        dateOfBirth: document.getElementById('dateOfBirth' + indexTab).value,
                        stateBirth: stateBirthSklon.toUpperCase(),
                        placeStateBirth: document.getElementById('placeStateBirth' + indexTab).value.toUpperCase(),
                        grazd: grazdSklon.toUpperCase(),
                        placeStateGetVisa: placeStateGetVisaSklon.toUpperCase(),
                        placeCityGetVisa: placeCityGetVisaSklon.toUpperCase(),
                        homeAddress: document.getElementById('homeAddress' + indexTab).value.toUpperCase(),
                        idPassport: document.getElementById('idPassport' + indexTab).value.toUpperCase(),
                        issuedBy: document.getElementById('issuedBy' + indexTab).value.toUpperCase(),
                        dateOfIssue: document.getElementById('dateOfIssue' + indexTab).value.toUpperCase(),
                        validUntil: document.getElementById('validUntil' + indexTab).value.toUpperCase(),
                        registrationOn: registrSklon,
                        addressProj: addressProj,
                        addressProjObl: addressProjObl,
                        addressProjRa: addressProjRa,
                        addressProjCity: addressProjCity,
                        addressProjStr: addressProjStr,
                        addressProjD: addressProjD,
                        addressProjK: addressProjK,
                        addressProjTel: addressProjTel,

                        workAddress: document.getElementById('workAddress' + indexTab).value.toUpperCase()
                    });

                    try {
                        doc.render();
                    }
                    catch (error) {
                        // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
                        errorHandler(error);
                    }

                    var out = doc.getZip().generate();

                    zipDocs.file("ХОДАТАЙСТВО - " + document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + " " +
                        document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + gen +
                        " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + ".docx"
                        , out, {base64: true}
                    )
                }

                let nameFile = ''
                if (countTab()==1) {
                    nameFile = document.getElementById('nStud1').value
                        +" Ходатайство.zip"
                }
                else {
                    nameFile = document.getElementById('nStud1').value + '-'+
                        document.getElementById('nStud'+(lastTab()-1)).value
                        +" Ходатайство.zip"
                }
                var content = zipDocs.generate({ type: "blob" });
                saveAs(content,nameFile);
            });
};




// Письмо обоснование
window.generateJustification = function generate() {
    path = ('../Templates/4.docx')

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
        //old
        // nStudent.push({nSt: document.getElementById('nStud' + indexTab).value, zap: ', '})
        // new
        if (countTab()==1) {
            nStudent.push({nSt: document.getElementById('nStud' + indexTab).value, zap: ''})
        }
        else {
            if (i==0) {
                nStudent.push({nSt: document.getElementById('nStud' + indexTab).value, zap: ' - '})
            }
            if (i==countTab()-1) {
                nStudent.push({nSt: document.getElementById('nStud' + indexTab).value, zap: ''})
            }
        }

        

        // levelEducations
        switch (document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text) {
            default:
                levelEducations.push({nameText: "", levelEducSklon: "", zap: ''})
                break
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
            default:
                facultys.push({nameText: "", facultySklon: "", zap: ''})
                break
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
            case "Покровский филиал МПГУ":
                if (!facultys.some(el => el.nameText === 'Покровский филиал МПГУ')) {
                facultys.push({nameText: 'Покровский филиал МПГУ', facultySklon: 'Покровского филиала МПГУ', zap: ', '})}
                break
            case "Дербентский филиал МПГУ":
                if (!facultys.some(el => el.nameText === 'Дербентский филиал МПГУ')) {
                facultys.push({nameText: 'Дербентский филиал МПГУ', facultySklon: 'Дербентского филиала МПГУ', zap: ', '})}
                break
        }

        // courses
        switch (document.getElementById('course'+indexTab).value) {
            default:
                courses.push({nameText: "", zap: ''})
                break
            case " ":
                if (!courses.some(el => el.nameText === ' ')) {
                    courses.push({nameText: '', zap: ''})}
                break
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
                academicYear: document.getElementById('academicYear').options[document.getElementById('academicYear').selectedIndex].text,


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

            // old
            // for (let i = 0; i<students.length; i++) {
            //     nameFile = nameFile + students[i].lastNameRu.toUpperCase() + ' ' + students[i].firstNameRu.toUpperCase()+', '
            // }
            // nameFile = nameFile.slice(0,-2) + '.docx'


            // new
            if (countTab()==1) {
                nameFile = nameFile + students[0].lastNameRu.toUpperCase() + ' ' + students[0].firstNameRu.toUpperCase()+'.docx'
            }
            else {
                nameFile = nameFile + students[0].lastNameRu.toUpperCase() + ' ' + students[0].firstNameRu.toUpperCase()+' - ' 
                + students[students.length-1].lastNameRu.toUpperCase() + ' ' + students[students.length-1].firstNameRu.toUpperCase()+'.docx'
            }

            

            // Output the document using Data-URI
            saveAs(out, nameFile);



        }
    );
};


// Опись
window.generateInventory = function generate() {
    path = ('../Templates/5.docx')

    let students = []

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
    let grazdSklon = document.getElementById('grazd').value
    switch (document.getElementById('grazd').value) {
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
            entryVisa: document.getElementById('entryVisa'+indexTab).options[document.getElementById('entryVisa'+indexTab).selectedIndex].text
        })
    }


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
                registrationOn: registrSklon,
                grazd: grazdSklon.toUpperCase(),
                purpose: document.getElementById('purpose').options[document.getElementById('purpose').selectedIndex].text.toUpperCase(),
            })


            var out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                // compression: DEFLATE adds a compression step.
                // For a 50MB output document, expect 500ms additional CPU time
                compression: "DEFLATE",
            });


            let nameFile = 'Опись - '
            // old
            // for (let i = 0; i<students.length; i++) {
            //     nameFile = nameFile + students[i].lastNameRu.toUpperCase() + ' ' + students[i].firstNameRu.toUpperCase()+', '
            // }
            // nameFile = nameFile.slice(0,-2) + '.docx'

            // new
            if (countTab()==1) {
                nameFile = nameFile + students[0].lastNameRu.toUpperCase() + ' ' + students[0].firstNameRu.toUpperCase()+'.docx'
            }
            else {
                nameFile = nameFile + students[0].lastNameRu.toUpperCase() + ' ' + students[0].firstNameRu.toUpperCase()+' - ' 
                + students[students.length-1].lastNameRu.toUpperCase() + ' ' + students[students.length-1].firstNameRu.toUpperCase()+'.docx'
            }

            // Output the document using Data-URI
            saveAs(out, nameFile);
        }
    );
};








function generateAll() {


    var zipTotal = new PizZip();

// Гарантийное письмо
    window.generateGuarLetterTotal = function generate() {
        path = ('../Templates/1.docx')
        loadFile(
            path,
            function (error, content) {
                if (error) {
                    throw error;
                }

                function replaceErrors(key, value) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
                            error[key] = value[key];
                            return error;
                        }, {});
                    }
                    return value;
                }
                function errorHandler(error) {
                    console.log(JSON.stringify({error: error}, replaceErrors));

                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors.map(function (error) {
                            return error.properties.explanation;
                        }).join("\n");
                        console.log('errorMessages', errorMessages);
                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }

                //test
                for (let i =0; i<countTab();i++) {
                    var zip = new PizZip(content);
                    var doc = new window.docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                    });

                    let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
                    let elem = tabs[i]
                    let indexTab = parseInt(elem.id.match(/\d+/))


                    // gender
                    let gEgom = ''
                    let gEmug = ''
                    let gGog = ""
                    let gInag = ""
                    let gEeg = ""
                    let gen = ''
                    if (document.getElementById('gender' + indexTab).value == 'Мужской / Male') {
                        gEgom = 'его'
                        gEmug = 'ему'
                        gGog = 'ого'
                        gInag = 'ина'
                        gEeg = 'ему'
                        gen = '(М)'
                    } else {
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

                    //addressProj
                    let addressProj = 'г. Москва, проспект Вернадского, 88.'
                    if (document.getElementById('faculty'+indexTab).options[document.getElementById('faculty'+indexTab).selectedIndex].text == "Покровский филиал МПГУ"){
                        addressProj = 'Владимирская область, Петушинский район, г. Покров, ул. Быкова, д. 24.'
                    }
                    else if (document.getElementById('faculty'+indexTab).options[document.getElementById('faculty'+indexTab).selectedIndex].text == "Дербентский филиал МПГУ"){
                        addressProj = 'Респ. Дагестан, г. Дербент, ул. Буйнакского, д. 18'
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
                    doc.setData({

                        firstNameRu: document.getElementById('firstNameRu' + indexTab).value.toUpperCase(),
                        lastNameRu: document.getElementById('lastNameRu' + indexTab).value.toUpperCase(),
                        gEgo: gEgom,
                        gEmu: gEmug,
                        gGo: gGog,
                        gIna: gInag,
                        gEe: gEeg,
                        grazd: grazdSklon,
                        cDate: new Date(document.getElementById('cDate').value).toLocaleDateString(),
                        dateOfBirth: document.getElementById('dateOfBirth' + indexTab).value,
                        nStud: document.getElementById('nStud' + indexTab).value,
                        idPassport: document.getElementById('idPassport' + indexTab).value,
                        addressProj: addressProj,
                        registrationOn: registrSklon
                    });



                    try {
                        doc.render();
                    }
                    catch (error) {
                        // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
                        errorHandler(error);
                    }
                    var out = doc.getZip().generate();
                    zipTotal.file(document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + " " +
                        document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + gen +
                        " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text+'/'

                        +"Гарантийное письмо - " + document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + " " +
                        document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + gen +
                        " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + ".docx"
                        , out, {base64: true}
                    );
                } // end for


                // let nameFile = ''
                // if (countTab()==1) {
                //     nameFile = document.getElementById('nStud1').value
                //         +" Гарантийное письмо.zip"
                // }
                // else {
                //     nameFile = document.getElementById('nStud1').value + '-'+
                //         document.getElementById('nStud'+(lastTab()-1)).value
                //         +" Гарантийное письмо.zip"
                // }
                var content = zipTotal.generate({ type: "blob" });
                // return content;
            });
    };

//Письмо поддержки
    window.generateSupportLetterTotal = function generate() {
        path = ('../Templates/2.docx')

        loadFile(
            path,
            function (error, content) {
                if (error) {
                    throw error;
                }

                function replaceErrors(key, value) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
                            error[key] = value[key];
                            return error;
                        }, {});
                    }
                    return value;
                }
                function errorHandler(error) {
                    console.log(JSON.stringify({error: error}, replaceErrors));

                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors.map(function (error) {
                            return error.properties.explanation;
                        }).join("\n");
                        console.log('errorMessages', errorMessages);
                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }



                for (let i =0; i<countTab();i++) {
                    var zip = new PizZip(content);
                    var doc = new window.docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                    });

                    let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
                    let elem = tabs[i]
                    let indexTab = parseInt(elem.id.match(/\d+/))

                    // gender
                    let gInag = ""
                    let gen = ''
                    if (document.getElementById('gender'+indexTab).value == 'Мужской / Male') {
                        gInag = 'ина'
                        gen = '(М)'
                    }
                    else {
                        gInag = 'ку'
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
                        default:
                            facultySklon = ""
                            break
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
                        case "Покровский филиал МПГУ":
                            facultySklon = 'Покровского филиала МПГУ'
                            break
                        case "Дербентский филиал МПГУ":
                            facultySklon = 'Дербентского филиала МПГУ'
                            break
                    }
                    // course
                    let courseSklon = ""
                    switch (document.getElementById('course'+indexTab).value) {
                        default:
                            courseSklon = ''
                            break
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
                        default:
                            levelEducSklon = ''
                            break
                        case "Подфак":
                            levelEducSklon = 'в число студентов подготовительного факультета в Центр довузовской подготовки иностранных граждан по русскому языку (МПГУ)'
                            break
                        case "Бакалавриат":
                            levelEducSklon = 'в число студентов бакалавриата'
                            break
                        case "Магистратура":
                            levelEducSklon = 'в число студентов магистратуры'
                            break
                        case "Аспирантура":
                            levelEducSklon = 'в число студентов аспирантуры'
                            break
                        case "Стажировка":
                            levelEducSklon = 'в число стажирующихся студентов'
                            break
                        case "Стажировка(межвуз)":
                            levelEducSklon = 'в число стажирующихся студентов университета'
                            break
                    }

                    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
                    doc.setData({

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
                        academicYear: document.getElementById('academicYear').options[document.getElementById('academicYear').selectedIndex].text,
                    });

                    try {
                        doc.render();
                    }
                    catch (error) {
                        // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
                        errorHandler(error);
                    }

                    var out = doc.getZip().generate();
                    // Output the document using Data-URI
                    zipTotal.file(document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + " " +
                        document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + gen +
                        " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + "/"

                        +"Письмо поддержки - " + document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + " " +
                        document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + gen +
                        " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + ".docx"
                        , out, {base64: true}
                    )
                }
                // let nameFile = ''
                // if (countTab()==1) {
                //     nameFile = document.getElementById('nStud1').value
                //         +" Письмо поддержки.zip"
                // }
                // else {
                //     nameFile = document.getElementById('nStud1').value + '-'+
                //         document.getElementById('nStud'+(lastTab()-1)).value
                //         +" Письмо поддержки.zip"
                // }
                var content = zipTotal.generate({ type: "blob" });
                // saveAs(content);
            });
    };

// Ходатайство
    window.generateSolicitationTotal = function generate() {
        path = ('../Templates/3.docx')
        loadFile(
            path,
            function (error, content) {
                if (error) {
                    throw error;
                }

                function replaceErrors(key, value) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
                            error[key] = value[key];
                            return error;
                        }, {});
                    }
                    return value;
                }
                function errorHandler(error) {
                    console.log(JSON.stringify({error: error}, replaceErrors));

                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors.map(function (error) {
                            return error.properties.explanation;
                        }).join("\n");
                        console.log('errorMessages', errorMessages);
                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }

                for (let i =0; i<countTab();i++) {
                    var zip = new PizZip(content);
                    var doc = new window.docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                    });

                    let tabs = document.getElementsByClassName('nav-tabs')[0].getElementsByTagName('li')
                    let elem = tabs[i]
                    let indexTab = parseInt(elem.id.match(/\d+/))

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
                    if (document.getElementById('gender' + indexTab).value == 'Мужской / Male') {
                        genSklonM = '☒'
                        gen = '(М)'
                    } else {
                        genSklonW = '☒'
                        gen = '(Ж)'
                    }
                    // entry Visa
                    let entryVisaSklonO = '□'
                    let entryVisaSklonD = '□'
                    let entryVisaSklonM = '□'
                    switch (document.getElementById('entryVisa' + indexTab).options[document.getElementById('entryVisa' + indexTab).selectedIndex].text) {
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
                    switch (document.getElementById('typeVisa' + indexTab).options[document.getElementById('typeVisa' + indexTab).selectedIndex].text) {
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
                    let stateBirthSklon = document.getElementById('stateBirth' + indexTab).options[document.getElementById('stateBirth' + indexTab).selectedIndex].text
                    switch (document.getElementById('stateBirth' + indexTab).options[document.getElementById('stateBirth' + indexTab).selectedIndex].text) {
                        case "Другое":
                            stateBirthSklon = document.getElementById('otherStateBirth' + indexTab).value
                            break
                    }
                    // place State Get Visa
                    let placeStateGetVisaSklon = document.getElementById('placeStateGetVisa' + indexTab).options[document.getElementById('placeStateGetVisa' + indexTab).selectedIndex].text
                    switch (document.getElementById('placeStateGetVisa' + indexTab).options[document.getElementById('placeStateGetVisa' + indexTab).selectedIndex].text) {
                        case "Другое":
                            placeStateGetVisaSklon = document.getElementById('otherStateGetVisa' + indexTab).value
                            break
                    }
                    // place City Get Visa
                    let placeCityGetVisaSklon = document.getElementById('placeCityGetVisa' + indexTab).options[document.getElementById('placeCityGetVisa' + indexTab).selectedIndex].text
                    switch (document.getElementById('placeCityGetVisa' + indexTab).options[document.getElementById('placeCityGetVisa' + indexTab).selectedIndex].text) {
                        case "Другое":
                            placeCityGetVisaSklon = document.getElementById('otherCityGetVisa' + indexTab).value
                            break
                    }

                    let addressProj = 'МОСКВА'
                    let addressProjObl = ''
                    let addressProjRa = ''
                    let addressProjCity = 'Г. МОСКВА'
                    let addressProjStr = 'ПРОСПЕКТ ВЕРНАДСКОГО'
                    let addressProjD = '88'
                    let addressProjK = '1'
                    let addressProjTel = '+7 (965) 109-85-50'
                    if (document.getElementById('faculty'+indexTab).options[document.getElementById('faculty'+indexTab).selectedIndex].text == "Покровский филиал МПГУ"){
                        addressProj = 'МОСКВА, ПОКРОВ, ВЛАДИМИРСКАЯ ОБЛАСТЬ'
                        addressProjObl = 'ВЛАДИМИРСКАЯ ОБЛАСТЬ'
                        addressProjRa = 'ПЕТУШИНСКИЙ РАЙОН'
                        addressProjCity = 'Г. ПОКРОВ'
                        addressProjStr = 'БЫКОВА'
                        addressProjD = '24'
                        addressProjK = ''
                        addressProjTel = '+7 (915) 779-56-73'
                    }
                    else if (document.getElementById('faculty'+indexTab).options[document.getElementById('faculty'+indexTab).selectedIndex].text == "Дербентский филиал МПГУ"){
                        addressProj = 'РЕСПУБЛИКА ДАГЕСТАН'
                        addressProjObl = ''
                        addressProjRa = 'ПЕТУШИНСКИЙ РАЙОН'
                        addressProjCity = 'Г. ДЕРБЕНТ'
                        addressProjStr = 'БУЙНАКСКОГО'
                        addressProjD = '18'
                        addressProjK = ''
                        addressProjTel = '+7 (87240) 4-08-94'
                    }

                    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
                    doc.setData({

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
                        firstNameRu: document.getElementById('firstNameRu' + indexTab).value.toUpperCase(),
                        lastNameRu: document.getElementById('lastNameRu' + indexTab).value.toUpperCase(),
                        firstNameEn: document.getElementById('firstNameEn' + indexTab).value.toUpperCase(),
                        lastNameEn: document.getElementById('lastNameEn' + indexTab).value.toUpperCase(),
                        genM: genSklonM,
                        genW: genSklonW,
                        dateOfBirth: document.getElementById('dateOfBirth' + indexTab).value,
                        stateBirth: stateBirthSklon.toUpperCase(),
                        placeStateBirth: document.getElementById('placeStateBirth' + indexTab).value.toUpperCase(),
                        grazd: grazdSklon.toUpperCase(),
                        placeStateGetVisa: placeStateGetVisaSklon.toUpperCase(),
                        placeCityGetVisa: placeCityGetVisaSklon.toUpperCase(),
                        homeAddress: document.getElementById('homeAddress' + indexTab).value.toUpperCase(),
                        idPassport: document.getElementById('idPassport' + indexTab).value.toUpperCase(),
                        issuedBy: document.getElementById('issuedBy' + indexTab).value.toUpperCase(),
                        dateOfIssue: document.getElementById('dateOfIssue' + indexTab).value.toUpperCase(),
                        validUntil: document.getElementById('validUntil' + indexTab).value.toUpperCase(),
                        registrationOn: registrSklon,
                        addressProj: addressProj,
                        addressProjObl: addressProjObl,
                        addressProjRa: addressProjRa,
                        addressProjCity: addressProjCity,
                        addressProjStr: addressProjStr,
                        addressProjD: addressProjD,
                        addressProjK: addressProjK,
                        addressProjTel: addressProjTel,

                        workAddress: document.getElementById('workAddress' + indexTab).value.toUpperCase()
                    });

                    try {
                        doc.render();
                    }
                    catch (error) {
                        // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
                        errorHandler(error);
                    }

                    var out = doc.getZip().generate();

                    zipTotal.file(document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + " " +
                        document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + gen +
                        " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + "/"

                        +"ХОДАТАЙСТВО - " + document.getElementById('lastNameRu'+indexTab).value.toUpperCase() + " " +
                        document.getElementById('firstNameRu'+indexTab).value.toUpperCase() + gen +
                        " - " + document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text + ".docx"
                        , out, {base64: true}
                    )
                }

                let nameZip = ''
                if (countTab()==1) {
                    nameZip = document.getElementById('nStud1').value
                        +" Студент.zip"
                }
                else {
                    nameZip = document.getElementById('nStud1').value + '-'+
                        document.getElementById('nStud'+(lastTab()-1)).value
                        +" Студенты.zip"
                }

                var content = zipTotal.generate({ type: "blob" });
                saveAs(content,nameZip);
            });
    };






// Письмо обоснование
    window.generateJustificationTotal = function generate() {
        path = ('../Templates/4.docx')

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
            //old
            // nStudent.push({nSt: document.getElementById('nStud' + indexTab).value, zap: ', '})
            // new
            if (countTab()==1) {
                nStudent.push({nSt: document.getElementById('nStud' + indexTab).value, zap: ''})
            }
            else {
                if (i==0) {
                    nStudent.push({nSt: document.getElementById('nStud' + indexTab).value, zap: ' - '})
                }
                if (i==countTab()-1) {
                    nStudent.push({nSt: document.getElementById('nStud' + indexTab).value, zap: ''})
                }
            }
            // levelEducations
            switch (document.getElementById('levelEducation'+indexTab).options[document.getElementById('levelEducation'+indexTab).selectedIndex].text) {
                default:
                    levelEducations.push({nameText: "", levelEducSklon: "", zap: ''})
                    break
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
                default:
                    facultys.push({nameText: "", facultySklon: "", zap: ''})
                    break
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
                case "Покровский филиал МПГУ":
                    if (!facultys.some(el => el.nameText === 'Покровский филиал МПГУ')) {
                        facultys.push({nameText: 'Покровский филиал МПГУ', facultySklon: 'Покровского филиала МПГУ', zap: ', '})}
                    break
                case "Дербентский филиал МПГУ":
                    if (!facultys.some(el => el.nameText === 'Дербентский филиал МПГУ')) {
                        facultys.push({nameText: 'Дербентский филиал МПГУ', facultySklon: 'Дербентского филиала МПГУ', zap: ', '})}
                    break
                
            }

            // courses
            switch (document.getElementById('course'+indexTab).value) {
                default:
                    courses.push({nameText: "", zap: ''})
                    break
                case " ":
                    if (!courses.some(el => el.nameText === ' ')) {
                        courses.push({nameText: '', zap: ''})}
                    break
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
                    academicYear: document.getElementById('academicYear').options[document.getElementById('academicYear').selectedIndex].text,


                })


                var out = doc.getZip().generate();



                let nameFile = 'Письмо-обоснование - '
                // old
                // for (let i = 0; i<students.length; i++) {
                //     nameFile = nameFile + students[i].lastNameRu.toUpperCase() + ' ' + students[i].firstNameRu.toUpperCase()+', '
                // }
                // nameFile = nameFile.slice(0,-2) + '.docx'

                // new
                if (countTab()==1) {
                    nameFile = nameFile + students[0].lastNameRu.toUpperCase() + ' ' + students[0].firstNameRu.toUpperCase()+'.docx'
                }
                else {
                    nameFile = nameFile + students[0].lastNameRu.toUpperCase() + ' ' + students[0].firstNameRu.toUpperCase()+' - ' 
                    + students[students.length-1].lastNameRu.toUpperCase() + ' ' + students[students.length-1].firstNameRu.toUpperCase()+'.docx'
                }

                zipTotal.file(nameFile, out, {base64: true})
                // Output the document using Data-URI
                // saveAs(out, nameFile);

                var content = zipTotal.generate({ type: "blob" });

            }
        );
    };




// Опись
    window.generateInventoryTotal = function generate() {
        path = ('../Templates/5.docx')

        let students = []

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
        let grazdSklon = document.getElementById('grazd').value
        switch (document.getElementById('grazd').value) {
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
                entryVisa: document.getElementById('entryVisa'+indexTab).options[document.getElementById('entryVisa'+indexTab).selectedIndex].text
            })
        }


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
                    registrationOn: registrSklon,
                    grazd: grazdSklon.toUpperCase(),
                    purpose: document.getElementById('purpose').options[document.getElementById('purpose').selectedIndex].text.toUpperCase(),
                })


                var out = doc.getZip().generate();


                let nameFile = 'Опись - '
                // old
                // for (let i = 0; i<students.length; i++) {
                //     nameFile = nameFile + students[i].lastNameRu.toUpperCase() + ' ' + students[i].firstNameRu.toUpperCase()+', '
                // }

                // nameFile = nameFile.slice(0,-2) + '.docx'

                // new
                if (countTab()==1) {
                    nameFile = nameFile + students[0].lastNameRu.toUpperCase() + ' ' + students[0].firstNameRu.toUpperCase()+'.docx'
                }
                else {
                    nameFile = nameFile + students[0].lastNameRu.toUpperCase() + ' ' + students[0].firstNameRu.toUpperCase()+' - ' 
                    + students[students.length-1].lastNameRu.toUpperCase() + ' ' + students[students.length-1].firstNameRu.toUpperCase()+'.docx'
                }

                zipTotal.file(nameFile, out, {base64: true})

                // Output the document using Data-URI
                // saveAs(out, nameFile);

                var content = zipTotal.generate({ type: "blob" });
            }
        );
    };

    setTimeout(generateGuarLetterTotal, 30)
    setTimeout(generateSupportLetterTotal, 30)
    setTimeout(generateJustificationTotal, 30)
    setTimeout(generateInventoryTotal, 30)
    setTimeout(generateSolicitationTotal, 300)




}









































// function generate() {
//
//     loadFile("https://docxtemplater.com/tag-example.docx",function(error,content){
//         if (error) { throw error };
//
//         // The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
//         function replaceErrors(key, value) {
//             if (value instanceof Error) {
//                 return Object.getOwnPropertyNames(value).reduce(function(error, key) {
//                     error[key] = value[key];
//                     return error;
//                 }, {});
//             }
//             return value;
//         }
//
//         function errorHandler(error) {
//             console.log(JSON.stringify({error: error}, replaceErrors));
//
//             if (error.properties && error.properties.errors instanceof Array) {
//                 const errorMessages = error.properties.errors.map(function (error) {
//                     return error.properties.explanation;
//                 }).join("\n");
//                 console.log('errorMessages', errorMessages);
//                 // errorMessages is a humanly readable message looking like this :
//                 // 'The tag beginning with "foobar" is unopened'
//             }
//             throw error;
//         }
//         const array = ['John','Jane']
//         array.forEach(function(name){
//             var zip = new PizZip(content);
//             var doc;
//             try {
//                 doc=new window.docxtemplater(zip);
//             } catch(error) {
//                 // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
//                 errorHandler(error);
//             }
//             console.log(name);
//             doc.setData({
//                 first_name: name,
//                 last_name: 'Doe',
//                 phone: '0652455478',
//                 description: 'New Website'
//             });
//
//             try {
//                 // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
//                 doc.render();
//             }
//             catch (error) {
//                 // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
//                 errorHandler(error);
//             }
//
//             var out=doc.getZip().generate() //Output the document using Data-URI
//             zipDocs.file(name+".docx", out, {base64: true});
//             console.log(name, " wurde gezippt.");
//
//         })
//         var content = zipDocs.generate({ type: "blob" });
//         // see FileSaver.js
//         saveAs(content, "example.zip");
//     })

// }


