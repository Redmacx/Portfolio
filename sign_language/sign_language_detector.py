"""
========================================================================
SIGN LANGUAGE & GESTURE DETECTOR (Python + OpenCV + MediaPipe)
Developer: Maccin Beldad
========================================================================
Requirements:
    pip install opencv-python mediapipe numpy

Description:
    Real-time American Sign Language (ASL) and hand gesture detector
    using computer vision and 21-point 3D hand landmark tracking.
========================================================================
"""

import cv2
import math

# Try importing MediaPipe for 21-point hand tracking
try:
    import mediapipe as mp
    HAS_MEDIAPIPE = True
except ImportError:
    HAS_MEDIAPIPE = False

def calculate_distance(p1, p2):
    """Calculate Euclidean distance between two 2D points."""
    return math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)

def detect_gesture(hand_landmarks):
    """Classify hand gestures based on 21 MediaPipe hand landmarks."""
    lm = hand_landmarks.landmark

    # Check if fingers are extended
    thumb_up = lm[4].y < lm[3].y and lm[3].y < lm[2].y
    index_up = lm[8].y < lm[6].y
    middle_up = lm[12].y < lm[10].y
    ring_up = lm[16].y < lm[14].y
    pinky_up = lm[20].y < lm[18].y

    thumb_index_dist = calculate_distance(lm[4], lm[8])

    if thumb_up and not index_up and not middle_up and not ring_up and not pinky_up:
        return "THUMBS UP 👍 (Agree / Good)", (46, 204, 113)

    elif index_up and middle_up and not ring_up and not pinky_up:
        return "PEACE / VICTORY ✌️ (ASL 'V')", (52, 152, 219)

    elif index_up and not middle_up and not ring_up and not pinky_up:
        return "POINTING / ONE ☝️ (ASL '1')", (241, 196, 15)

    elif index_up and not middle_up and not ring_up and pinky_up:
        return "I LOVE YOU / ROCK 🤟", (155, 89, 182)

    elif index_up and middle_up and ring_up and pinky_up:
        return "OPEN PALM 🖐️ (Hello)", (230, 126, 34)

    elif not index_up and not middle_up and not ring_up and not pinky_up:
        return "FIST ✊ (ASL 'S' / Zero)", (231, 76, 60)

    elif thumb_index_dist < 0.05 and middle_up and ring_up and pinky_up:
        return "OK SIGN 👌 (ASL 'OK')", (26, 188, 156)

    else:
        return "TRACKING HAND...", (189, 195, 199)

def main():
    print("==================================================")
    print("  SIGN LANGUAGE & GESTURE DETECTOR - Python CV   ")
    print("  Press 'Q' or 'ESC' in the window to Exit        ")
    print("==================================================")

    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    if not cap.isOpened():
        print("Error: Could not access webcam.")
        return

    if HAS_MEDIAPIPE:
        mp_hands = mp.solutions.hands
        # model_complexity=0 (Lite) for 60 FPS ultra-smooth tracking
        hands = mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=1,
            model_complexity=0,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        mp_draw = mp.solutions.drawing_utils
    else:
        print("\nNote: 'mediapipe' library not found. Run: pip install mediapipe\n")

    while True:
        ret, frame = cap.read()
        if not ret: break

        frame = cv2.flip(frame, 1)
        h, w, c = frame.shape

        if HAS_MEDIAPIPE:
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = hands.process(rgb_frame)

            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    mp_draw.draw_landmarks(
                        frame, hand_landmarks, mp_hands.HAND_CONNECTIONS,
                        mp_draw.DrawingSpec(color=(0, 255, 255), thickness=2, circle_radius=3),
                        mp_draw.DrawingSpec(color=(255, 0, 128), thickness=2)
                    )

                    gesture_text, color = detect_gesture(hand_landmarks)

                    cv2.rectangle(frame, (10, h - 65), (w - 10, h - 15), (20, 20, 20), -1)
                    cv2.rectangle(frame, (10, h - 65), (w - 10, h - 15), color, 2)
                    cv2.putText(frame, f"Detected Sign: {gesture_text}", (25, h - 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2, cv2.LINE_AA)
            else:
                cv2.rectangle(frame, (10, h - 55), (320, h - 15), (0, 0, 0), -1)
                cv2.putText(frame, "Show hand to camera...", (20, h - 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200, 200, 200), 1)

        cv2.putText(frame, "Maccin Beldad | ASL Gesture Detector (60 FPS)", (15, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 200), 2)

        cv2.imshow("Sign Language Detector", frame)

        if (cv2.waitKey(1) & 0xFF) in (ord('q'), 27): break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
