import { useEffect } from "react";
import { useStore } from "./store";

export function HUD() {
  const {
    speed,
    timer,
    isRaceStarted,
    gameStarted,
    gameFinished,
    startGame,
    resetRace,
    lapCount,
    currentLapTime,
    lastLapTime,
    bestLapTime,
    totalRaceTime,
    getLapLimit,
  } = useStore();

  const lapLimit = getLapLimit();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && !gameStarted) {
        e.preventDefault();
        startGame();
      }
      if (e.code === "KeyR" && gameFinished) {
        e.preventDefault();
        resetRace();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameFinished, startGame, resetRace]);

  useEffect(() => {
    if (!isRaceStarted) return;

    const interval = setInterval(() => {
      useStore.setState((state) => ({
        timer: state.timer + 0.1,
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [isRaceStarted]);

  const formatTime = (time) => {
    if (time === Infinity || time === 0) return "--:--";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 100);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {!gameStarted && (
        <div className="game-start-overlay">
          <div className="start-screen">
            <h1>RACE GAME</h1>
            <p>Press SPACE to Start</p>
          </div>
        </div>
      )}

      {gameFinished && (
        <div className="game-start-overlay">
          <div className="results-screen">
            <h1>🏁 RACE COMPLETE! 🏁</h1>
            <div className="results-stats">
              <div className="result-item">
                <div className="result-label">LAPS COMPLETED</div>
                <div className="result-value">
                  {lapCount}/{lapLimit}
                </div>
              </div>
              <div className="result-item">
                <div className="result-label">TOTAL TIME</div>
                <div className="result-value">{formatTime(totalRaceTime)}</div>
              </div>
              <div className="result-item">
                <div className="result-label">BEST LAP</div>
                <div className="result-value">{formatTime(bestLapTime)}</div>
              </div>
            </div>
            <p className="restart-text">Press R to Restart</p>
          </div>
        </div>
      )}

      <div className="hud">
        <div className="hud-item speed">
          <div className="hud-label">SPEED</div>
          <div className="hud-value">{Math.round(speed * 10)} km/h</div>
        </div>
        <div className="hud-item laps">
          <div className="hud-label">LAPS</div>
          <div className="hud-value">
            {lapCount}/{lapLimit}
          </div>
        </div>
        <div className="hud-item current-time">
          <div className="hud-label">TIME</div>
          <div className="hud-value">{formatTime(currentLapTime)}</div>
        </div>
        <div className="hud-item last-time">
          <div className="hud-label">LAST LAP</div>
          <div className="hud-value">{formatTime(lastLapTime)}</div>
        </div>
        <div className="hud-item best-time">
          <div className="hud-label">BEST LAP</div>
          <div className="hud-value">{formatTime(bestLapTime)}</div>
        </div>
        {totalRaceTime > 0 && (
          <div className="hud-item total-time">
            <div className="hud-label">TOTAL TIME</div>
            <div className="hud-value">{formatTime(totalRaceTime)}</div>
          </div>
        )}
      </div>
    </>
  );
}
