function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

path = ('../Templates/1.docx')
window.generate = function generate() {
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

            // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
            doc.render({
                firstname: document.getElementById('name').value,
                last_name: "Doe",
                phone: "0652455478",
                description: "New Website",
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
            saveAs(out, "output.docx");
        }
    );
};