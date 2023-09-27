type IFileUploadViewer = {
    fileList: FileList
}

export const FilesUploadedViewer = (props:IFileUploadViewer)=>{
    const { fileList } = props
    return (
        <div style={{marginTop:"20px"}}>
            <h3>Files Uploaded:</h3>
            <ol>
                {Array.from(fileList).map((file, index) => <li key={index}>{file.name}</li>)}
            </ol>
        </div>
    )
}
