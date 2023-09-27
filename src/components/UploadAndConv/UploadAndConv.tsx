import { ChangeEvent, useRef, useState } from 'react'
import { Button, CircularProgress } from '@mui/material'
import styles from './UploadAndConv.module.scss'
import { downloadFile, excelConvertFunction } from './excelConvertFunction'
import { IFileNameAndBuffer } from '../../interfaces/excelConvertFunction.interface'
import HowtoUse from './howToUse/HowtoUse'
import { FilesUploadedViewer } from './filesUploadedViewer/FilesUploadedViewer'

function UploadAndConv() {
	const [fileList, setFileList] = useState<FileList>()
	const [bufferArr, setBufferArr] = useState<IFileNameAndBuffer[]>()
	const fileInputRef = useRef<HTMLInputElement>(null)
	
	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.files){
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
	<>
		<div>
			<HowtoUse />
		</div>
		<div>
			{(fileList?.length ? 
				(bufferArr && bufferArr?.length>0 ? 
				<div>
					<FilesUploadedViewer fileList={fileList}/>
					<div className={styles.downloadButtonParentContainer}>
						<Button variant='contained' onClick={() => handleDownloadMultipleFile(bufferArr)}>Click to Download the file(s)</Button>
						<Button variant="text" onClick={handleStartOverButtonClick} style={{marginTop: "10px"}}>Start Over</Button>
					</div>
				</div> :
				<div>
					<CircularProgress />
				</div>) :
				(<div className={styles.uploadButtonParentContainer}>
					<Button variant='contained' onClick={handleUploadButtonClick}> 
						Upload the BMS File(s)
					</Button>
					<input 
						type='file' 
						onChange={handleFileChange} 
						multiple={true}
						ref={fileInputRef}
						accept='.xls,.xlsx'
						hidden
					/>  
				</div>)
			)}
		</div>
	</>
  )
}

export default UploadAndConv