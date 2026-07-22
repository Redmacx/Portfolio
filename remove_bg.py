from PIL import Image
import numpy as np

# Load the ORIGINAL photo (the one you uploaded — clean white background)
src = r"C:\Users\MACCIN _09\.gemini\antigravity\brain\bf8bee1f-561c-43d3-ac3d-9d61069727e1\media__1784659012574.png"
out = r"C:\Users\MACCIN _09\.gemini\antigravity\scratch\portfolio\profile.png"

img = Image.open(src).convert("RGBA")
data = np.array(img, dtype=np.float32)

r = data[:, :, 0]
g = data[:, :, 1]
b = data[:, :, 2]

# --- Step 1: Remove pure white / very light pixels ---
# White threshold: all channels high and roughly equal
white_mask = (r > 210) & (g > 210) & (b > 210)

# --- Step 2: Soft-edge anti-aliasing around the cutout ---
# For near-white pixels, make them semi-transparent so edges look smooth
near_white = (r > 180) & (g > 180) & (b > 180) & ~white_mask
brightness = (r + g + b) / 3.0  # 0-255

# Convert back to uint8 array
result = np.array(img)  # shape: H x W x 4, dtype uint8

# Fully transparent for white pixels
result[white_mask, 3] = 0

# Partial transparency for near-white (feathered edge)
alpha_near = np.clip(255 - (brightness[near_white] - 180) * (255 / 75), 0, 255).astype(np.uint8)
result[near_white, 3] = alpha_near

out_img = Image.fromarray(result, "RGBA")
out_img.save(out, "PNG")
print("Done! Saved to:", out)
