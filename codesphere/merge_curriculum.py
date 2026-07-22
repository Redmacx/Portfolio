import json
import codecs
import re

html_file = r"C:\Users\MACCIN _09\.gemini\antigravity\scratch\codesphere\codesphere-ui-demo.html"

# Define the metadata for the 6 courses
courses_meta = [
  {
    "id": 0,
    "cat": 'PYTHON',
    "title": 'Python for Beginners — Full Course',
    "desc": 'Master Python programming from zero. Covers variables, control flow, functions, lists, dictionaries, and file I/O.',
    "vid": 'rfscVS0vtbw',
    "level": 'BEGINNER',
    "bdg": 'bdg-g',
    "lessonsCount": 0,
    "hrs": '8h',
    "source": 'freeCodeCamp (YouTube)',
    "rating": '⭐ 4.9 (2,400 reviews)',
    "outcomes": [
      'Write clean Python code for automation and scripts',
      'Understand variables, data types, lists, and dictionaries',
      'Use loops and conditional statements effectively',
      'Build real-world projects and handle errors cleanly'
    ],
    "lessons": []
  },
  {
    "id": 1,
    "cat": 'CYBERSECURITY',
    "title": 'Cybersecurity Essentials',
    "desc": 'Understand network security, attack vectors, cryptography, firewalls, and defense strategies.',
    "vid": 'inWWhr5tnEA',
    "level": 'BEGINNER',
    "bdg": 'bdg-g',
    "lessonsCount": 0,
    "hrs": '6h',
    "source": 'NetworkChuck (YouTube)',
    "rating": '⭐ 4.8 (1,800 reviews)',
    "outcomes": [
      'Understand CIA Triad (Confidentiality, Integrity, Availability)',
      'Analyze network attack vectors and phishing tactics',
      'Understand firewalls, VPNs, and modern security protocols'
    ],
    "lessons": []
  },
  {
    "id": 2,
    "cat": 'NETWORKING',
    "title": 'Cisco CCNA 200-301 — Networking Course',
    "desc": 'Learn IP addressing, IPv4/IPv6 subnetting, VLANs, routing protocols (OSPF), and Cisco IOS commands.',
    "vid": 'H8W9oMNSuwo',
    "level": 'INTERMEDIATE',
    "bdg": 'bdg-b',
    "lessonsCount": 0,
    "hrs": '12h',
    "source": "Jeremy's IT Lab (YouTube)",
    "rating": '⭐ 5.0 (3,100 reviews)',
    "outcomes": [
      'Understand OSI 7-Layer Model and TCP/IP stack',
      'Master IPv4 subnetting and CIDR notation',
      'Configure Cisco routers and switches via IOS CLI'
    ],
    "lessons": []
  },
  {
    "id": 3,
    "cat": 'WEB DEVELOPMENT',
    "title": 'HTML & CSS — Modern Web Design',
    "desc": 'Build responsive websites using semantic HTML5, CSS Grid, Flexbox, and modern CSS variables.',
    "vid": 'mU6anWqZJcc',
    "level": 'BEGINNER',
    "bdg": 'bdg-g',
    "lessonsCount": 0,
    "hrs": '5h',
    "source": 'Dave Gray (YouTube)',
    "rating": '⭐ 4.9 (1,500 reviews)',
    "outcomes": [
      'Build structured web pages using HTML5 elements',
      'Style layouts with Flexbox and CSS Grid',
      'Create mobile-responsive web applications'
    ],
    "lessons": []
  },
  {
    "id": 4,
    "cat": 'ETHICAL HACKING',
    "title": 'Ethical Hacking & Penetration Testing',
    "desc": 'Learn Linux command line, Nmap scanning, Metasploit framework, and vulnerability assessment.',
    "vid": '3Kq1MIfTWCE',
    "level": 'ADVANCED',
    "bdg": 'bdg-o',
    "lessonsCount": 0,
    "hrs": '15h',
    "source": 'TCM Security (YouTube)',
    "rating": '⭐ 4.9 (2,900 reviews)',
    "outcomes": [
      'Master Nmap for network enumeration and port scanning',
      'Understand Metasploit and vulnerability exploitation',
      'Document security audit reports ethically'
    ],
    "lessons": []
  },
  {
    "id": 5,
    "cat": 'LINUX',
    "title": 'Linux Command Line Fundamentals',
    "desc": 'Master bash terminal commands, file permissions, processes, ssh, and system administration.',
    "vid": 'ZtqBQ68cfJc',
    "level": 'BEGINNER',
    "bdg": 'bdg-g',
    "lessonsCount": 0,
    "hrs": '7h',
    "source": 'freeCodeCamp (YouTube)',
    "rating": '⭐ 4.9 (2,100 reviews)',
    "outcomes": [
      'Navigate directories using cd, ls, and pwd',
      'Manage files, read logs, and manipulate text with grep',
      'Configure file permissions with chmod and chown'
    ],
    "lessons": []
  }
]

file_map = {
    0: "course_0_python.json",
    1: "course_1_cyber.json",
    2: "course_2_ccna.json",
    3: "course_3_webdev.json",
    4: "course_4_hacking.json",
    5: "course_5_linux.json"
}

# Read each JSON and assign lessons
for cid in range(6):
    try:
        with codecs.open(f"C:\\Users\\MACCIN _09\\.gemini\\antigravity\\scratch\\codesphere\\{file_map[cid]}", 'r', 'utf-8') as f:
            lessons_data = json.load(f)
            # Ensure IDs are integers
            for l in lessons_data:
                l['id'] = int(l['id'])
            courses_meta[cid]['lessons'] = lessons_data
            courses_meta[cid]['lessonsCount'] = len(lessons_data)
    except Exception as e:
        print(f"Error loading {file_map[cid]}: {e}")

json_str = json.dumps(courses_meta, indent=2)
final_js = f"const COURSES = {json_str};"

with codecs.open(html_file, 'r', 'utf-8') as f:
    content = f.read()

# Replace the block using regex.
pattern = r"const COURSES = \[.*?\];"
new_content = re.sub(pattern, lambda m: final_js, content, flags=re.DOTALL)

with codecs.open(html_file, 'w', 'utf-8') as f:
    f.write(new_content)

print("SUCCESS: Merged all subagent JSONs into the LMS.")
