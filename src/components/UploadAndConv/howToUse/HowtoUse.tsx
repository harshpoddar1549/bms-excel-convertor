import styles from './HowtoUse.module.scss'

function HowtoUse() {
  return (
    <div className={styles.howToUseParentContainer}>
        <h1>How to use the application?</h1>
        <ul>
            <li>Click on the <b>"Upload the BMS File(s)"</b> button.</li>
            <li>From the dialog box, select a single file or multiple files downloaded directly from the BookMyShow Website.</li>
            <li>Once the conversion is completed, the button changes to <b>Click to download the files(s)</b>.</li>
            <li>On Clicking, allow to download multiple files on being asked.</li>
            <li>To start over again, click on <b>START OVER</b> button</li>
        </ul>
    </div>
  )
}

export default HowtoUse