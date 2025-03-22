import styles from './Landing.module.css';

const Landing = () => {
  return (
    <main className={styles.container}>
      <h1>Hello, you are on the landing page for visitors.</h1>
      <p>Sign up now, or sign in to see your super secret dashboard!</p>

      <p>
        <img class="welcome-gif" src="https://media.discordapp.net/attachments/748920099481845930/767682891442290698/cloudbank.gif?ex=67dfd668&is=67de84e8&hm=1b0b954230a20aa700c13666e0563c868ff2181774bdfef5f22769bf694de663&=" />
      </p>
    </main>
  );
};

export default Landing;
