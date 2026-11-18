import ModeSelector from "../components/home/ModeSelector";
import Leaderboard from "../components/home/Leaderboard";
import PlayButton from "../components/home/PlayButton";

const HomePage = () => {
  return (
    <main className="fade-in">
      <header className="home-hero">
        <span className="home-hero-kicker">Geografía & Banderas</span>
        <h1>Flag Guess</h1>
        <p className="home-hero-subtitle">
          Poné a prueba tu conocimiento del mundo. Elegí una modalidad de juego,
          respondé antes de que el reloj llegue a cero y superá el récord.
        </p>
      </header>

      <section className="home-section" aria-label="Selección de modo de juego">
        <div className="section-header">
          <h2 className="section-title">Modo de Juego</h2>
          <span className="section-hint">Seleccioná una modalidad</span>
        </div>
        <ModeSelector />
      </section>

      <div className="play-button-wrapper">
        <PlayButton />
      </div>

      <section className="home-section" aria-label="Tabla de posiciones">
        <Leaderboard />
      </section>
    </main>
  );
};

export default HomePage;
