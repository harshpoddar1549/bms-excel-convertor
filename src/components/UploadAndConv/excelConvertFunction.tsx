import ExcelJS from "exceljs"
import { getCustomerDetailsArr, getPricePerTicket, getValueFromColArr } from "../../utils/excelConvertFunction.utils";
import { IFileNameAndBuffer } from "../../interfaces/excelConvertFunction.interface";


export const excelConvertFunction = async (file:File, index: number):Promise<IFileNameAndBuffer> => {
    const data = await file.arrayBuffer()
    //reading
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(data);
    /* LOGIC START */
    // get the bms sheet
    const bmsSheet = workbook.worksheets[0]
    let fileName = `file_${index}.xlsx`
    // Check if WB is empty or not
    // If yes, return here
    // If not, proceed to the logic
    if(bmsSheet.getRow(2).values.length!==0){
        // adding a sheet
        //const newSheet = workbook.addWorksheet("New Sheet")
        // getting the name of the Event
        const eventName = getValueFromColArr(bmsSheet.getColumn('F').values)
        fileName = eventName?.toString() ? `${eventName?.toString()}.xlsx` : `file_${index}.xlsx`
        // adding a sheet
        const newSheet = workbook.addWorksheet(eventName?.toString()) //eventName?.toString()
        // Getting the Date and Time for the event
        const dateAndTime = getValueFromColArr(bmsSheet.getColumn('G').values)
        // Getting the price per head
        const row = bmsSheet.getRow(2)
        const pricePerTicket = getPricePerTicket(row, { price: 'K', quantity: 'J'})
        // Add these to the new Sheet
        newSheet.addRows([
            ['Event Name', eventName],
            ['Date and Time', dateAndTime], 
            ['Price per ticket', pricePerTicket],
            [],
            ["Booking Id", "Name", "Phone Number", "Email", "Number of Tickets"]
        ])
        let rowIndex = 6
        bmsSheet.eachRow((row, rowNumber) => {
            if(rowNumber>=2){
                const rowEntry:string[] = []
                //getting the booking Id
                const bookingId = row.getCell('A').value?.toString()
                rowEntry.push(bookingId ? bookingId : "")
                //getting the customer Details
                const customerDetails = row.getCell('T').value?.toString()
                if(customerDetails && customerDetails!=='NA'){
                    rowEntry.push(...getCustomerDetailsArr(customerDetails))
                }
                // for managing the missing booking person info
                if(rowEntry.length===1){
                    rowEntry.push("","","")
                }
                // getting the number of tickets bought
                const noOfTicketsBought = row.getCell('J').value?.toString()
                rowEntry.push(noOfTicketsBought ? noOfTicketsBought : "")
                
                newSheet.getRow(rowIndex).values = rowEntry
                row.commit()
                rowIndex += 1
            }
        })
    }
    //removing bms sheet
    workbook.removeWorksheet(bmsSheet.id)
    //writing
    const buffer = await workbook.xlsx.writeBuffer();
    return { "buffer": buffer, "fileName": fileName}
}

export const downloadFile = (buffer:ExcelJS.Buffer, filename: string)=>{
    const blob = new Blob([buffer])
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    document.body.appendChild(a);
    a.setAttribute("style", "display: hidden");
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
}