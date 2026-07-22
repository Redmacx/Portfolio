from PIL import Image, ImageFilter, ImageEnhance
import os

src = r"C:\Users\MACCIN _09\.gemini\antigravity\brain\e7e3f794-bb99-478a-9604-5eb4ec7a3a97\media__1784713503211.jpg"
dst = r"C:\Users\MACCIN _09\.gemini\antigravity\scratch\portfolio\zendy-poster.png"

print("Loading original image...")
img = Image.open(src)
print(f"Original size: {img.size}")

# Step 1: Upscale 4x using LANCZOS (best quality resampling)
new_w = img.width * 4
new_h = img.height * 4
print(f"Upscaling to {new_w}x{new_h} with LANCZOS...")
img = img.resize((new_w, new_h), Image.LANCZOS)

# Step 2: Apply strong unsharp mask to sharpen text edges
# radius=2, percent=200, threshold=3
print("Applying UnsharpMask filter...")
img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=200, threshold=3))

# Step 3: Apply second pass sharpening for extra crispness
img = img.filter(ImageFilter.UnsharpMask(radius=1, percent=150, threshold=2))

# Step 4: Boost contrast slightly to make text pop
print("Enhancing contrast...")
enhancer = ImageEnhance.Contrast(img)
img = enhancer.enhance(1.2)

# Step 5: Boost sharpness one more time
enhancer2 = ImageEnhance.Sharpness(img)
img = enhancer2.enhance(2.0)

# Save as PNG (lossless)
print(f"Saving to {dst}...")
img.save(dst, "PNG", optimize=False)

size_mb = os.path.getsize(dst) / (1024*1024)
print(f"Done! Final size: {img.size}, File: {size_mb:.1f} MB")
