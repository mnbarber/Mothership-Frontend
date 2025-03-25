import styles from './CharSheetList.module.css';
import { Link } from 'react-router';

const CharSheetList = (props) => {
    return (
        <main className={styles.container}>
            {props.charSheets.map((sheet) => (
                <Link key={sheet._id} to={`/charSheets/${sheet._id}`}>
                    <article>
                        <h2>{sheet.name}</h2>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default CharSheetList;