import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * CarAudio Component
 *
 * Arcade-style 3D positional audio for a racing game car.
 * Uses two looping sounds (throttle/release) with smooth crossfading
 * based on keyboard input.
 *
 * @param {Object} controls - Keyboard state object (e.g., { w: true, s: false })
 * @param {number} speed - Optional car speed for subtle pitch variation
 */
export default function CarAudio({ controls = {}, speed = 0 }) {
  const { camera } = useThree();

  // Audio refs
  const throttleSoundRef = useRef(null);
  const releaseSoundRef = useRef(null);
  const listenerRef = useRef(null);
  const audioContextRef = useRef(null);

  // State for tracking which sound is active
  const [audioReady, setAudioReady] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Target volumes for crossfading
  const throttleVolumeRef = useRef(0);
  const releaseVolumeRef = useRef(0);

  // Initialize audio system
  useEffect(() => {
    // Create AudioListener and attach to camera
    const listener = new THREE.AudioListener();
    camera.add(listener);
    listenerRef.current = listener;
    audioContextRef.current = listener.context;

    // Create the two PositionalAudio instances
    const throttleSound = new THREE.PositionalAudio(listener);
    const releaseSound = new THREE.PositionalAudio(listener);

    throttleSoundRef.current = throttleSound;
    releaseSoundRef.current = releaseSound;

    // Audio loader
    const audioLoader = new THREE.AudioLoader();

    // Load throttle sound
    audioLoader.load(
      "/sounds/engine_throttle.mp3", // Replace with your actual file path
      (buffer) => {
        throttleSound.setBuffer(buffer);
        throttleSound.setLoop(true);
        throttleSound.setVolume(0); // Start silent
        throttleSound.setRefDistance(5); // 3D audio distance settings
      },
      undefined,
      (err) => console.error("Error loading throttle sound:", err)
    );

    // Load release sound
    audioLoader.load(
      "/sounds/engine_release.mp3", // Replace with your actual file path
      (buffer) => {
        releaseSound.setBuffer(buffer);
        releaseSound.setLoop(true);
        releaseSound.setVolume(0); // Start silent
        releaseSound.setRefDistance(5);

        setAudioReady(true);
      },
      undefined,
      (err) => console.error("Error loading release sound:", err)
    );

    // Cleanup
    return () => {
      if (throttleSound.isPlaying) throttleSound.stop();
      if (releaseSound.isPlaying) releaseSound.stop();
      camera.remove(listener);
    };
  }, [camera]);

  // Handle browser audio unlock (autoplay policy)
  useEffect(() => {
    if (!audioReady || audioUnlocked) return;

    const unlockAudio = () => {
      const context = audioContextRef.current;

      if (context && context.state === "suspended") {
        context.resume().then(() => {
          console.log("Audio context unlocked");
        });
      }

      // Start both sounds playing (but silent) so they loop properly
      if (throttleSoundRef.current && !throttleSoundRef.current.isPlaying) {
        throttleSoundRef.current.play();
      }
      if (releaseSoundRef.current && !releaseSoundRef.current.isPlaying) {
        releaseSoundRef.current.play();
      }

      setAudioUnlocked(true);

      // Remove listeners after first interaction
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [audioReady, audioUnlocked]);

  // Update audio based on controls
  useEffect(() => {
    if (!audioUnlocked || !audioReady) return;

    // Determine which sound should be playing based on input
    if (controls.w) {
      // Throttle pressed - play throttle sound
      throttleVolumeRef.current = 1.0;
      releaseVolumeRef.current = 0.0;
    } else if (controls.s || !controls.w) {
      // Brake pressed OR no throttle - play release sound
      throttleVolumeRef.current = 0.0;
      releaseVolumeRef.current = 1.0;
    }
  }, [controls.w, controls.s, audioUnlocked, audioReady]);

  // Smooth animation loop for volume crossfading and pitch adjustment
  useEffect(() => {
    if (!audioUnlocked || !audioReady) return;

    let animationFrameId;

    const animate = () => {
      const throttleSound = throttleSoundRef.current;
      const releaseSound = releaseSoundRef.current;

      if (throttleSound && releaseSound) {
        // Smoothly lerp volumes for crossfading
        const currentThrottleVol = throttleSound.getVolume();
        const currentReleaseVol = releaseSound.getVolume();

        const newThrottleVol = THREE.MathUtils.lerp(
          currentThrottleVol,
          throttleVolumeRef.current,
          0.1 // Lerp factor - adjust for faster/slower fade
        );

        const newReleaseVol = THREE.MathUtils.lerp(
          currentReleaseVol,
          releaseVolumeRef.current,
          0.1
        );

        throttleSound.setVolume(Math.max(0, Math.min(1, newThrottleVol)));
        releaseSound.setVolume(Math.max(0, Math.min(1, newReleaseVol)));

        // Optional: Adjust pitch based on speed
        // Higher speed = slightly higher pitch for arcade feel
        if (speed !== undefined) {
          const pitchMultiplier = 1 + speed * 0.01; // Subtle pitch variation
          const targetPitch = THREE.MathUtils.clamp(pitchMultiplier, 0.8, 1.3);

          if (throttleSound.source && throttleSound.source.playbackRate) {
            const currentPitch = throttleSound.source.playbackRate.value;
            throttleSound.setPlaybackRate(
              THREE.MathUtils.lerp(currentPitch, targetPitch, 0.05)
            );
          }

          // Release sound has less pitch variation
          if (releaseSound.source && releaseSound.source.playbackRate) {
            const currentPitch = releaseSound.source.playbackRate.value;
            releaseSound.setPlaybackRate(
              THREE.MathUtils.lerp(currentPitch, targetPitch * 0.85, 0.05)
            );
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [audioUnlocked, audioReady, speed]);

  // This component doesn't render anything visible
  // The PositionalAudio objects are attached to the parent group
  return (
    <group>
      {throttleSoundRef.current && (
        <primitive object={throttleSoundRef.current} />
      )}
      {releaseSoundRef.current && (
        <primitive object={releaseSoundRef.current} />
      )}
    </group>
  );
}
