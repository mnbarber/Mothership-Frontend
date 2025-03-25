import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as charSheetService from '../../services/charSheetService';
import { UserContext } from "../../contexts/UserContext";
import styles from './CharSheetDetails.module.css';

const CharSheetDetails = (props) => {
    const { charSheetId } = useParams();
    const { user } = useContext(UserContext);
    const [sheet, setSheet] = useState(null);

    useEffect(() => {
        const fetchSheet = async () => {
            const sheetData = await charSheetService.show(charSheetId);
            setSheet(sheetData);
        };
        fetchSheet();
    }, [charSheetId]);

    if(!sheet) return <main>Loading...</main>
    return (
        <main className={styles.container}>
            <section>
                <header>
                    <h1>{sheet.name}</h1>
                    <div>
                        <p>created by: {sheet.author.username}</p>
                    </div>
                </header>
                <p>pronouns: {sheet.pronouns}</p>
                <p>class: {sheet.class}</p>
                <p>stats:
                        <ul>
                            <li>strength: {sheet.stats.strength}</li>
                            <li>speed: {sheet.stats.speed}</li>
                            <li>intellect: {sheet.stats.intellect}</li>
                            <li>combat: {sheet.stats.combat}</li>
                        </ul>
                </p>
                <p>saves:
                        <ul>
                            <li>sanity: {sheet.saves.sanity}</li>
                            <li>fear: {sheet.saves.fear}</li>
                            <li>body: {sheet.saves.body}</li>
                        </ul>
                </p>
                <p>health:
                    <ul>
                        <li>current: {sheet.health.current}</li>
                        <li>maximum: {sheet.health.maximum}</li>
                    </ul>
                </p>
                <p>wounds:
                    <ul>
                        <li>current: {sheet.wounds.current}</li>
                        <li>maximum: {sheet.wounds.maximum}</li>
                    </ul>
                </p>
                <p>stress:
                    <ul>
                        <li>current: {sheet.stress.current}</li>
                        <li>maximum: {sheet.stress.maximum}</li>
                    </ul>
                </p>
                <p>equipment: {sheet.equipment}</p>
                <p>skills: {sheet.skills}</p>
            </section>
        </main>
    )
};

export default CharSheetDetails;