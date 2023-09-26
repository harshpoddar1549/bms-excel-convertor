import ExcelJS from "exceljs"
import { IPricePerSeatCols } from "../interfaces/excelConvertFunction.interface"

export const getValueFromColArr = (colArr:readonly ExcelJS.CellValue[]) => {
    if(colArr.length<=2){
        return ''
    }else{
        return colArr[3]
    }
}

export const getPricePerTicket = (row: ExcelJS.Row, colArr: IPricePerSeatCols)=>{
    const ticketQt = row.getCell(colArr.quantity).value?.toString()
    const ticketPricePaid = row.getCell(colArr.price).value?.toString()
    const pricePerTicket = ticketQt && ticketPricePaid ? (parseInt(ticketPricePaid) / parseInt(ticketQt)) : ""
    return pricePerTicket
}

export const getCustomerDetailsArr = (customerDetails: string) => {
    const customerDetailsSplitArr = customerDetails.split(",")
    customerDetailsSplitArr.pop()
    const customerDetailArr:string[] = []
    customerDetailsSplitArr.forEach((eachDetail) => {
        let tmpSplit = eachDetail.split(":")
        customerDetailArr.push(tmpSplit.length===2 ? tmpSplit[1] :"") 
    })
    return customerDetailArr
}
