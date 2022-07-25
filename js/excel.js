let selectedFile;
let totalInfo = []; // file contents EXCEL
let nStud = document.getElementById('nStud1')

// console.log(window.XLSX)


document.getElementById('excel').addEventListener("change",(event)=>{
    selectedFile = event.target.files[0];
})

function findInfo(id) {

    id = parseInt(id.match(/\d+/)) // if id="find1" => id=1
    let nStud = document.querySelector('#nStud'+id)
    let purpose = document.querySelector("#purpose"+id)
    let entryVisa = document.querySelector("#entryVisa"+id)
    let typeVisa = document.querySelector("#typeVisa"+id)
    let lastNameRu = document.querySelector("#lastNameRu"+id)
    let lastNameEn = document.querySelector("#lastNameEn"+id)
    let firstNameRu = document.querySelector("#firstNameRu"+id)
    let firstNameEn = document.querySelector("#firstNameEn"+id)
    let gender = document.querySelector("#gender"+id)
    let dateOfBirth = document.querySelector("#dateOfBirth"+id)
    let series = document.querySelector("#series"+id)
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

                // console.log(workbook)
                // workbook.SheetNames.forEach(sheet => {
                //     let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                //
                //     totalInfo = JSON.stringify(rowObject, undefined, 1)
                //
                //     totalInfo = JSON.parse(totalInfo)
                //
                //     console.log(totalInfo)
                //
                //     for (let i=0; i<totalInfo.length; i++) {
                //
                //         if (totalInfo[i]['1:00'] == 12.4) {
                //             console.log(totalInfo[i])
                //         }
                //     }
                //
                // })

                let sheet = Object.keys(workbook.Sheets)[0]
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                totalInfo = JSON.stringify(rowObject, undefined, 1)

                totalInfo = JSON.parse(totalInfo)

                console.log(totalInfo)
                for (let i = 0; i<totalInfo.length; i++) {
                    if (totalInfo[i]['ПОРЯДКОВЫЙ НОМЕР'] == nStud.value) {
                        lastNameRu.value = totalInfo[i]['ФАМИЛИЯ (На русском языке) /SECOND NAME (in Russian)']
                    }
                }


            }
        }

    // });
}







