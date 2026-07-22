import re
import os

html_file = r"C:\Users\MACCIN _09\.gemini\antigravity\scratch\codesphere\codesphere-ui-demo.html"

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

python_vids = ['YYXdXT2l-Gg', 'k9TUPpGqYTo', 'W8KRlNvCQAL', 'dZLYlNCE5cw', '9Os0o3wzS_I']
cyber_vids = ['inWWhr5tnEA', 'bPVaOlJ6ln0', 'kXwmdP1Tqxk', '7_LPdttKXPc']
ccna_vids = ['H8W9oMNSuwo', 'qiQR5rTSshw', '6Enj9R-Jz58', '512-H1C8Jcw']
web_vids = ['pQN-pnXPaVg', '1PnVor36_40', 'G3e-cpLfu0E', 'jV8B24rSN5o']
hack_vids = ['3Kq1MIfTWCE', 'fNzpcB7iRxo', 'dz7Ntp7KQGA', 'WnN0eI3rOno']
linux_vids = ['ZtqBQ68cfJc', 'v_1yAOX8hR8', 'lqFq4vD5oV4', 'tK9Oc6AEnxc']

all_vids = [python_vids, cyber_vids, ccna_vids, web_vids, hack_vids, linux_vids]

parts = content.split("lessons: [")
new_parts = [parts[0]]

for i in range(1, len(parts)):
    if i-1 < len(all_vids):
        vids = all_vids[i-1]
        part = parts[i]
        
        lesson_idx = 0
        def vid_sub(m):
            global lesson_idx
            if lesson_idx < len(vids):
                rep = f"vid: '{vids[lesson_idx]}'"
                lesson_idx += 1
                return rep
            return m.group(0)
            
        # Only replace the vid within the lessons array, not the ones outside
        # actually part contains everything up to next "lessons: [" which means it includes the next course's header.
        # But wait, it's better to limit substitution to blocks inside { id: ... }
        # Let's just do it sequentially.
        
        # Find all vid: '...' in this part and replace only the first few that correspond to lessons
        new_part = re.sub(r"vid:\s*'[^']+'", vid_sub, part, count=len(vids))
        new_parts.append(new_part)
    else:
        new_parts.append(parts[i])

new_content = "lessons: [".join(new_parts)

# Fix video URLs and API flags
new_content = new_content.replace('youtube-nocookie.com', 'youtube.com')
new_content = new_content.replace('&enablejsapi=1', '')

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("Updated HTML with unique video IDs!")
