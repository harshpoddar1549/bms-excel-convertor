import React from 'react'
import Header from './components/Header/Header'
import UploadAndConv from './components/UploadAndConv/UploadAndConv'
import styles from './BmsToExcelConv.module.scss'

function BmsToExcelConv() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className={styles.uploadAndConvMainContainer}>
        <UploadAndConv/>
      </div>   
    </div>
  )
}

export default BmsToExcelConv