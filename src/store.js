import { create } from 'zustand';

const LAP_LIMIT = 2; // Change this to modify lap limit

export const useStore = create((set) => ({
    speed: 0,
    timer: 0,
    isRaceStarted: false,
    gameStarted: false,
    gameFinished: false,

    // Checkpoint tracking
    currentCheckpoint: 0, // Next checkpoint to hit (0 = Start/Finish)
    lapCount: 0,
    currentLapTime: 0,
    lastLapTime: 0,
    bestLapTime: Infinity,
    totalRaceTime: 0,
    lapTimes: [], // Store all lap times
    lapStartTime: null,
    raceStartTime: null,
    crossedStart: false,

    setSpeed: (speed) => set({ speed }),
    setTimer: (timer) => set({ timer }),
    startRace: () => set({ isRaceStarted: true, timer: 0, raceStartTime: performance.now() }),
    startGame: () => set({ gameStarted: true, isRaceStarted: true, timer: 0, raceStartTime: performance.now(), gameFinished: false }),
    resetRace: () => set({ isRaceStarted: false, timer: 0, speed: 0, gameStarted: false, lapCount: 0, currentCheckpoint: 0, lastLapTime: 0, bestLapTime: Infinity, totalRaceTime: 0, currentLapTime: 0, lapStartTime: null, raceStartTime: null, lapTimes: [], gameFinished: false }),

    // Checkpoint and lap methods
    setCurrentCheckpoint: (checkpoint) => set({ currentCheckpoint: checkpoint }),

    startLapTimer: () => set({ lapStartTime: performance.now() }),

    updateLapTime: (currentTime) => set({ currentLapTime: currentTime }),

    completeLap: (lapTime) => set((state) => {
        const newLapCount = state.lapCount + 1;
        const newLapTimes = [...state.lapTimes, lapTime];
        const updates = {
            lapCount: newLapCount,
            lastLapTime: lapTime,
            bestLapTime: Math.min(state.bestLapTime, lapTime),
            currentCheckpoint: 1, // Reset to CP1
            lapTimes: newLapTimes,
        };

        // If this is the last lap, calculate and save total race time
        if (newLapCount >= LAP_LIMIT) {
            const totalTime = newLapTimes.reduce((sum, time) => sum + time, 0);
            updates.totalRaceTime = totalTime;
            updates.gameFinished = true;
            updates.isRaceStarted = false;
            // Save to localStorage
            const raceHistory = JSON.parse(localStorage.getItem('raceHistory') || '[]');
            raceHistory.push({
                timestamp: new Date().toISOString(),
                totalTime: totalTime,
                lapTimes: newLapTimes,
                bestLapTime: Math.min(state.bestLapTime, lapTime),
            });
            localStorage.setItem('raceHistory', JSON.stringify(raceHistory));
        }

        return updates;
    }),

    getLapLimit: () => LAP_LIMIT,
}));
