import { ChangeEvent, useRef, useState } from 'react'
import {Button, CircularProgress} from '@mui/material'
import styles from './UploadAndConv.module.scss'
import { downloadFile, excelConvertFunction } from './excelConvertFunction'
import { IFileNameAndBuffer } from '../../interfaces/excelConvertFunction.interface'

function UploadAndConv() {
	const [fileList, setFileList] = useState<FileList>()
	const [bufferArr, setBufferArr] = useState<IFileNameAndBuffer[]>()
	const fileInputRef = useRef<HTMLInputElement>(null)
	
	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.files){
			console.log(e.target.files)
			const tmpBufferArr = await handleFileList(e.target.files)
			setFileList(e.target.files)
			tmpBufferArr && setBufferArr(tmpBufferArr)	
		}
	}

	const handleFileList = async (fileList:FileList):Promise<IFileNameAndBuffer[] | undefined> => {
		if(fileList.length){
			let tmpBufferArr = []
			for (let i=0; i<fileList.length; i++){
				const fileNameAndBuffer = await excelConvertFunction(fileList[i], i)
				tmpBufferArr.push(fileNameAndBuffer)
			}
			return tmpBufferArr
		}
	}

	const handleDownloadMultipleFile = (fileNameAndBuffer: IFileNameAndBuffer[]) => {
		for(let fileIndex = 0; fileIndex < fileNameAndBuffer.length; fileIndex++){
			downloadFile(fileNameAndBuffer[fileIndex].buffer, fileNameAndBuffer[fileIndex].fileName)
		}
	}

	const handleUploadButtonClick = () => {
		if(fileInputRef.current !== null)
			fileInputRef.current.click()
	}

	const handleStartOverButtonClick = () => {
		setFileList(undefined)
		setBufferArr(undefined)
	}

  return (
    <div className={styles.uploadButtonParentContainer}>
			{(fileList?.length ? 
				(bufferArr && bufferArr?.length>0 ? 
				<div className={styles.downloadButtonParentContainer}>
					<Button variant='contained' onClick={() => handleDownloadMultipleFile(bufferArr)}>Click to Download the file</Button>
					 {/* <span >{file.name}</span> */}
					<Button variant="text" onClick={handleStartOverButtonClick} style={{marginTop: "20px"}}>Start Over</Button>
				</div> :
				<div>
					<CircularProgress />
				</div>) :
				(<>
					<Button variant='contained' onClick={handleUploadButtonClick}> {/* startIcon={} */} 
						Upload the BMS Document
					</Button>
					<input 
						type='file' 
						onChange={handleFileChange} 
						multiple={true}
						//style={{display:"none"}}
						ref={fileInputRef}
						accept='.xls,.xlsx'
						hidden
					/>  
				</>)
			)}
    </div>
  )
}

export default UploadAndConv