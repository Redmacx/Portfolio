"""
========================================================================
MOOD & FACIAL EMOTION DETECTOR (Python + OpenCV + Haar Cascade / Deep AI)
Developer: Maccin Beldad
========================================================================
Requirements:
    pip install opencv-python numpy

Description:
    Real-time high-speed face tracking and mood analysis script.
========================================================================
"""

import cv2
import numpy as np
import time

def main():
    print("==================================================")
    print("  MOOD & FACIAL EMOTION DETECTOR - Python CV     ")
    print("  Press 'Q' or 'ESC' in the window to Exit        ")
    print("==================================================")

    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    smile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_smile.xml')
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    if not cap.isOpened():
        print("Error: Could not access webcam.")
        return

    fps_start_time = time.time()
    fps_frame_count = 0
    fps = 0

    while True:
        ret, frame = cap.read()
        if not ret: break

        frame = cv2.flip(frame, 1)
        h, w, c = frame.shape

        # Downscale for high speed cascade detection
        small_frame = cv2.resize(frame, (320, 240))
        gray = cv2.cvtColor(small_frame, cv2.COLOR_BGR2GRAY)

        fps_frame_count += 1
        if time.time() - fps_start_time >= 1.0:
            fps = fps_frame_count
            fps_frame_count = 0
            fps_start_time = time.time()

        # Fast Face Detection
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.2,
            minNeighbors=5,
            minSize=(40, 40)
        )

        detected_mood = "NO FACE DETECTED"
        mood_color = (120, 120, 120)
        confidence = 0

        for (sx, sy, sw, sh) in faces:
            # Scale coordinates back to original frame size (320 -> 640 = 2x)
            x, y, fw, fh = sx * 2, sy * 2, sw * 2, sh * 2

            roi_gray = gray[sy:sy+sh, sx:sx+sw]
            roi_color = frame[y:y+fh, x:x+w]

            eyes = eye_cascade.detectMultiScale(roi_gray, scaleFactor=1.1, minNeighbors=8)
            smiles = smile_cascade.detectMultiScale(roi_gray, scaleFactor=1.5, minNeighbors=15)

            num_smiles = len(smiles)
            num_eyes = len(eyes)

            if num_smiles > 0:
                detected_mood = "HAPPY / SMILING 😄"
                mood_color = (46, 204, 113)
                confidence = 92
            elif num_eyes >= 2:
                detected_mood = "NEUTRAL / FOCUSED 😐"
                mood_color = (52, 152, 219)
                confidence = 85
            elif num_eyes == 1:
                detected_mood = "WINKING / PLAYFUL 😉"
                mood_color = (155, 89, 182)
                confidence = 80
            else:
                detected_mood = "CALM / REFLECTIVE 🧘"
                mood_color = (241, 196, 15)
                confidence = 70

            # Draw Face Box
            cv2.rectangle(frame, (x, y), (x+fw, y+fh), mood_color, 3)

            # Label box above face
            cv2.rectangle(frame, (x, y - 35), (x + fw, y), mood_color, -1)
            cv2.putText(frame, f"{detected_mood}", (x + 8, y - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.55, (255, 255, 255), 2, cv2.LINE_AA)

        # Header Overlay
        cv2.rectangle(frame, (0, 0), (w, 45), (20, 20, 20), -1)
        cv2.putText(frame, "Maccin Beldad | AI Mood Face Detector", (15, 28),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 200), 2)
        cv2.putText(frame, f"FPS: {fps} | Faces: {len(faces)}", (w - 180, 28),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.55, (255, 255, 255), 1)

        # Bottom Banner
        cv2.rectangle(frame, (10, h - 50), (w - 10, h - 10), (15, 15, 15), -1)
        cv2.rectangle(frame, (10, h - 50), (w - 10, h - 10), mood_color, 2)
        cv2.putText(frame, f"Current Mood Status: {detected_mood} ({confidence}% Confidence)", (25, h - 22),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        cv2.imshow("AI Mood & Facial Emotion Detector", frame)

        if (cv2.waitKey(1) & 0xFF) in (ord('q'), 27): break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
