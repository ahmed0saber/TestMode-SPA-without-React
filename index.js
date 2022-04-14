const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib
submitBtn.addEventListener("click", () => {
  const val =userName.value
  if(val.trim() !== "" && userName.checkValidity()) {
      generatePDF(val)
  }else{
    userName.reportValidity()
  }
})
const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("./Test Mode Certificate.pdf").then((res) =>
    res.arrayBuffer()
  )
  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  pdfDoc.registerFontkit(fontkit)
  //get font
  const fontBytes = await fetch("./metropolis.regular.otf").then((res) =>
  res.arrayBuffer()
  )
  // Embed our custom font in the document
  const SanChezFont  = await pdfDoc.embedFont(fontBytes)
   // Get the first page of the document
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 310,
    y: 490,
    size: 50,
    font: SanChezFont,
    color: rgb(0.1, 0.1, 0.1),
  })
  firstPage.drawText(testName, {
    x: 472,
    y: 390,
    size: 30,
    font: SanChezFont,
    color: rgb(0.1, 0.1, 0.1),
  })
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })
  saveAs(pdfDataUri,testName + " certificate on Code Touch.pdf")
}