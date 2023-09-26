import ExcelJS from "exceljs"

export interface IPricePerSeatCols{
    price: string | number
    quantity: string | number
}

export interface IFileNameAndBuffer{
    buffer: ExcelJS.Buffer
    fileName: string
}