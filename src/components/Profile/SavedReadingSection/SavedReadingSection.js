import OracleReadingModal from "../../OracleReadingModal/OracleReadingModal"


const SavedReadingSection = ({ 
    onSavedReading, 
    onUpdateReading, 
    onDeleteReading
 }) => {

    return (
        <section classname="section__saved-reading">
            <h1 className="section__saved-reading_title"> Your Saved Readings </h1>
            <ul className="section__saved-list">
                <li className="section__saved-item"></li>
            </ul>
            {/* thinking of doing a list of all readings and then pop-up modal for choices of reading to read and edit the title */}
            <OracleReadingModal/>
        </section>

       
    )
}


export default SavedReadingSection;