import codecs
import re

html_file = r"C:\Users\MACCIN _09\.gemini\antigravity\scratch\codesphere\codesphere-ui-demo.html"

new_courses = """const COURSES = [
  {
    id: 0,
    cat: 'PYTHON',
    title: 'Python for Beginners — Full Course',
    desc: 'Master Python programming from zero. Covers variables, control flow, functions, lists, dictionaries, and file I/O.',
    vid: 'rfscVS0vtbw',
    level: 'BEGINNER',
    bdg: 'bdg-g',
    lessonsCount: 5,
    hrs: '8h',
    source: 'freeCodeCamp (YouTube)',
    rating: '⭐ 4.9 (2,400 reviews)',
    outcomes: [
      'Write clean Python code for automation and scripts',
      'Understand variables, data types, lists, and dictionaries',
      'Use loops and conditional statements effectively',
      'Build real-world projects and handle errors cleanly'
    ],
    lessons: [
      {
        id: 0,
        title: '1.1 Introduction to Python & Setup',
        vid: 'YYXdXT2l-Gg',
        reading: `
          <h3>The Power of Python</h3>
          <p>Python is an interpreted, high-level, and dynamically typed programming language created by Guido van Rossum in 1991. It is universally loved for its clean, English-like syntax which emphasizes code readability. Unlike languages that use heavy boilerplate and curly braces, Python relies on whitespace and indentation to define code blocks.</p>
          <div class="note-box">💡 <strong>Why Python?</strong> Python powers major platforms like Instagram, Spotify, and Netflix. It is the dominant language in Artificial Intelligence (AI), Machine Learning (ML), and Data Science.</div>
          <h4>Setting Up Your Environment</h4>
          <p>To run Python locally, you need the Python Interpreter. Most developers write Python using IDEs (Integrated Development Environments) like <strong>VS Code</strong> or <strong>PyCharm</strong>.</p>
          <ul>
            <li>Download Python from <code>python.org</code> and check "Add Python to PATH" during installation.</li>
            <li>Open your terminal and type <code>python --version</code> to verify it's installed.</li>
          </ul>
          <h4>Your First Program</h4>
          <p>The traditional way to start learning any language is to make it output "Hello, World!". In Python, this requires just one line of code using the built-in <code>print()</code> function.</p>
          <div class="code-block"><span class="cm"># This is a comment. The interpreter ignores it.</span><br/><span class="fn">print</span>(<span class="str">"Hello, CodeSphere!"</span>)</div>
          <p><strong>Under the hood:</strong> The <code>print()</code> function takes a string argument (text wrapped in quotes) and outputs it directly to the standard console output.</p>
        `,
        quiz: [
          { q: 'What character is used to write a comment in Python?', opts: ['//', '/*', '#'], ans: 2 },
          { q: 'Which of these is NOT a typical use case for Python?', opts: ['Data Science', 'Low-level OS Drivers', 'Web Backends'], ans: 1 }
        ]
      },
      {
        id: 1,
        title: '1.2 Variables and Data Types',
        vid: 'k9TUPpGqYTo',
        reading: `
          <h3>Variables: Storing Information</h3>
          <p>A variable is like a container for storing data values. In Python, you don't need to declare a variable's type explicitly; the type is inferred dynamically when you assign a value using the <code>=</code> operator.</p>
          <div class="code-block">
            <span class="cm"># Variable assignments</span><br/>
            player_name = <span class="str">"Neo"</span><br/>
            player_score = <span class="str">1000</span><br/>
            is_alive = <span class="kw">True</span>
          </div>
          <h4>Core Data Types</h4>
          <ul>
            <li><strong>Integers (int):</strong> Whole numbers without a decimal point. Example: <code>42</code>, <code>-10</code></li>
            <li><strong>Floating-Point (float):</strong> Numbers with a decimal point. Example: <code>3.14</code>, <code>0.001</code></li>
            <li><strong>Strings (str):</strong> Text data wrapped in single <code>' '</code> or double <code>" "</code> quotes.</li>
            <li><strong>Booleans (bool):</strong> Represents truth values: <code>True</code> or <code>False</code>.</li>
          </ul>
          <h4>Type Checking and Conversion</h4>
          <p>You can check the type of a variable using <code>type()</code>, and convert between types using casting functions like <code>int()</code>, <code>str()</code>, and <code>float()</code>.</p>
          <div class="code-block">
            age_string = <span class="str">"25"</span><br/>
            age_number = <span class="fn">int</span>(age_string) <span class="cm"># Converts string to integer</span><br/>
            <span class="fn">print</span>(<span class="fn">type</span>(age_number)) <span class="cm"># Outputs: &lt;class 'int'&gt;</span>
          </div>
        `,
        quiz: [
          { q: 'Which data type represents text in Python?', opts: ['Integer', 'Boolean', 'String'], ans: 2 },
          { q: 'How do you check the data type of a variable x?', opts: ['typeof(x)', 'type(x)', 'check(x)'], ans: 1 }
        ]
      },
      {
        id: 2,
        title: '1.3 Working with Lists and Dictionaries',
        vid: 'W8KRlNvCQAL',
        reading: `
          <h3>Data Structures: Lists</h3>
          <p>A <strong>List</strong> is an ordered, mutable collection of items. Lists can contain items of different data types and are defined using square brackets <code>[]</code>.</p>
          <div class="code-block">
            inventory = [<span class="str">"sword"</span>, <span class="str">"shield"</span>, <span class="str">"health potion"</span>]<br/>
            <span class="cm"># Accessing elements (0-indexed)</span><br/>
            <span class="fn">print</span>(inventory[<span class="str">0</span>]) <span class="cm"># Outputs: sword</span><br/><br/>
            <span class="cm"># Adding an element</span><br/>
            inventory.<span class="fn">append</span>(<span class="str">"magic ring"</span>)
          </div>
          <h4>Understanding Dictionaries</h4>
          <p>A <strong>Dictionary</strong> stores data in key-value pairs, making it highly efficient for lookups. It is similar to JSON objects in JavaScript. Dictionaries are defined using curly braces <code>{}</code>.</p>
          <div class="code-block">
            user_profile = {<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="str">"username"</span>: <span class="str">"hacker01"</span>,<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="str">"level"</span>: <span class="str">99</span>,<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="str">"is_admin"</span>: <span class="kw">False</span><br/>
            }<br/><br/>
            <span class="cm"># Accessing dictionary values</span><br/>
            <span class="fn">print</span>(user_profile[<span class="str">"username"</span>]) <span class="cm"># Outputs: hacker01</span>
          </div>
          <div class="note-box">💡 <strong>Pro Tip:</strong> Use <code>.get()</code> method on dictionaries (e.g., <code>user_profile.get('email')</code>) to avoid crashing your program if the key doesn't exist. It will return <code>None</code> instead of a KeyError.</div>
        `,
        quiz: [
          { q: 'What index is used to access the FIRST element in a Python list?', opts: ['1', '0', '-1'], ans: 1 },
          { q: 'Which brackets are used to define a dictionary?', opts: ['[] Square brackets', '{} Curly braces', '() Parentheses'], ans: 1 }
        ]
      },
      {
        id: 3,
        title: '1.4 Control Flow: If/Else & Loops',
        vid: 'dZLYlNCE5cw',
        reading: `
          <h3>Conditional Logic</h3>
          <p>Control flow allows your program to make decisions. The <code>if</code>, <code>elif</code>, and <code>else</code> statements execute specific blocks of code depending on whether a condition evaluates to True or False.</p>
          <div class="code-block">
            temperature = <span class="str">75</span><br/>
            <span class="kw">if</span> temperature > <span class="str">90</span>:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">print</span>(<span class="str">"It's too hot!"</span>)<br/>
            <span class="kw">elif</span> temperature > <span class="str">65</span>:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">print</span>(<span class="str">"Perfect weather."</span>)<br/>
            <span class="kw">else</span>:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">print</span>(<span class="str">"It's cold!"</span>)
          </div>
          <h4>Looping with For and While</h4>
          <p>Loops are used to repeat code automatically. A <strong>for loop</strong> iterates over a sequence (like a list or a string), while a <strong>while loop</strong> continues executing as long as a condition remains True.</p>
          <div class="code-block">
            <span class="cm"># For Loop Example</span><br/>
            users = [<span class="str">"Alice"</span>, <span class="str">"Bob"</span>, <span class="str">"Charlie"</span>]<br/>
            <span class="kw">for</span> user <span class="kw">in</span> users:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">print</span>(<span class="str">f"Welcome {user}"</span>)<br/><br/>
            <span class="cm"># While Loop Example</span><br/>
            count = <span class="str">0</span><br/>
            <span class="kw">while</span> count < <span class="str">3</span>:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">print</span>(count)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;count += <span class="str">1</span>
          </div>
          <p>Python strictly enforces indentation to define where a loop or if-statement block begins and ends. Always use 4 spaces consistently.</p>
        `,
        quiz: [
          { q: 'Which keyword is used to check multiple alternative conditions?', opts: ['else if', 'elif', 'elseif'], ans: 1 },
          { q: 'Which loop is best for iterating over every item in a known list?', opts: ['while loop', 'for loop', 'do-while loop'], ans: 1 }
        ]
      },
      {
        id: 4,
        title: '1.5 Functions and Modular Code',
        vid: '9Os0o3wzS_I',
        reading: `
          <h3>Defining Reusable Functions</h3>
          <p>A function is a block of organized, reusable code that performs a single, related action. Functions provide better modularity and a high degree of code reuse. In Python, you define a function using the <code>def</code> keyword.</p>
          <div class="code-block">
            <span class="kw">def</span> <span class="fn">calculate_damage</span>(base_attack, weapon_modifier):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="cm"># Calculate total damage</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;total = base_attack * weapon_modifier<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> total<br/><br/>
            <span class="cm"># Calling the function</span><br/>
            strike = calculate_damage(<span class="str">50</span>, <span class="str">1.5</span>)<br/>
            <span class="fn">print</span>(<span class="str">f"You hit for {strike} damage!"</span>)
          </div>
          <h4>Function Parameters and Return Values</h4>
          <ul>
            <li><strong>Parameters:</strong> Variables listed inside the parentheses in the function definition. They act as inputs.</li>
            <li><strong>Return statement:</strong> Exits a function, optionally passing back an expression to the caller.</li>
          </ul>
          <h4>Scope and Modules</h4>
          <p>Variables created inside a function are <em>local</em> to that function. Variables created outside are <em>global</em>.</p>
          <p>Python also supports <strong>modules</strong>—you can import external Python files or libraries (like <code>import math</code> or <code>import random</code>) to access built-in tools without rewriting them yourself.</p>
        `,
        quiz: [
          { q: 'Which keyword creates a function in Python?', opts: ['function', 'create', 'def'], ans: 2 },
          { q: 'What does the return keyword do?', opts: ['Restarts the script', 'Passes a value back to the caller and exits the function', 'Prints to the console'], ans: 1 }
        ]
      }
    ]
  },
  {
    id: 1,
    cat: 'CYBERSECURITY',
    title: 'Cybersecurity Essentials',
    desc: 'Understand network security, attack vectors, cryptography, firewalls, and defense strategies.',
    vid: 'inWWhr5tnEA',
    level: 'BEGINNER',
    bdg: 'bdg-g',
    lessonsCount: 4,
    hrs: '6h',
    source: 'NetworkChuck (YouTube)',
    rating: '⭐ 4.8 (1,800 reviews)',
    outcomes: [
      'Understand CIA Triad (Confidentiality, Integrity, Availability)',
      'Analyze network attack vectors and phishing tactics',
      'Understand firewalls, VPNs, and modern security protocols'
    ],
    lessons: [
      {
        id: 0,
        title: '1.1 Intro to Cybersecurity & CIA Triad',
        vid: 'inWWhr5tnEA',
        reading: `
          <h3>The CIA Triad</h3>
          <p>The foundation of information security consists of three core principles, universally known as the CIA Triad. Every security policy and control is designed to protect one or more of these pillars:</p>
          <ul>
            <li><strong>Confidentiality:</strong> Protecting data from unauthorized access. Only authorized individuals, processes, or systems should view sensitive information. Implemented via Encryption, Passwords, and Biometrics.</li>
            <li><strong>Integrity:</strong> Ensuring data cannot be modified undetected. Data must remain accurate and trustworthy over its lifecycle. Implemented via Hashing (e.g., SHA-256) and Digital Signatures.</li>
            <li><strong>Availability:</strong> Ensuring systems remain accessible to legitimate users when needed. Defending against Denial of Service (DoS) attacks. Implemented via Redundancy, Load Balancing, and Backups.</li>
          </ul>
          <div class="note-box">💡 <strong>Example:</strong> A ransomware attack primarily destroys Availability (you can't access your files) and can breach Confidentiality if data is stolen before being encrypted.</div>
        `,
        quiz: [
          { q: 'What does the "I" in CIA Triad stand for?', opts: ['Internet', 'Integrity', 'Inspection'], ans: 1 },
          { q: 'Encrypting data primarily ensures which CIA principle?', opts: ['Availability', 'Confidentiality', 'Speed'], ans: 1 }
        ]
      },
      {
        id: 1,
        title: '1.2 Firewalls & Traffic Filtering',
        vid: 'bPVaOlJ6ln0',
        reading: `
          <h3>Firewalls Explained</h3>
          <p>A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization’s previously established security policies. It acts as a barrier between a trusted internal network and an untrusted external network (like the Internet).</p>
          <h4>Types of Firewalls</h4>
          <ul>
            <li><strong>Packet Filtering:</strong> Inspects packets and allows/denies them based on source/destination IP addresses and ports (Layer 3/4).</li>
            <li><strong>Stateful Inspection:</strong> Tracks the active state and characteristics of network connections, providing better security than simple packet filtering.</li>
            <li><strong>Next-Generation Firewalls (NGFW):</strong> Include deep packet inspection (DPI), intrusion prevention systems (IPS), and application awareness (Layer 7).</li>
          </ul>
          <div class="code-block">
            <span class="cm"># Example iptables firewall rule to block all incoming traffic on Port 23 (Telnet)</span><br/>
            iptables -A INPUT -p tcp --dport <span class="str">23</span> -j DROP
          </div>
        `,
        quiz: [
          { q: 'What is the primary role of a firewall?', opts: ['Speed up internet', 'Filter network traffic', 'Store passwords'], ans: 1 },
          { q: 'Which firewall type tracks the active state of connections?', opts: ['Stateful Inspection', 'Stateless', 'Proxy'], ans: 0 }
        ]
      },
      {
        id: 2,
        title: '1.3 Encryption & Cryptography Basics',
        vid: 'kXwmdP1Tqxk',
        reading: `
          <h3>The Science of Cryptography</h3>
          <p>Cryptography is the practice of securing communication from adversaries. It relies heavily on mathematical algorithms to convert plaintext (readable) into ciphertext (unreadable).</p>
          <h4>Symmetric vs Asymmetric Encryption</h4>
          <ul>
            <li><strong>Symmetric Encryption:</strong> Uses a single, shared secret key to both encrypt and decrypt data. It is extremely fast and used for bulk data (e.g., AES-256). The main challenge is securely sharing the key.</li>
            <li><strong>Asymmetric Encryption:</strong> Uses a mathematically linked pair of keys—a Public Key (shared with everyone) and a Private Key (kept secret). Anyone can encrypt data using your Public Key, but only you can decrypt it using your Private Key (e.g., RSA, ECC).</li>
          </ul>
          <h4>Hashing</h4>
          <p>Unlike encryption, hashing is a one-way mathematical function. It takes an input of any size and produces a fixed-size string of characters. It is used to verify Integrity and securely store passwords (e.g., SHA-256, bcrypt).</p>
        `,
        quiz: [
          { q: 'How many keys are used in Asymmetric Encryption?', opts: ['1 Key', '2 Keys (Public & Private)', '3 Keys'], ans: 1 },
          { q: 'Which algorithm is a one-way function used for storing passwords?', opts: ['AES', 'RSA', 'Hashing (e.g. SHA-256)'], ans: 2 }
        ]
      },
      {
        id: 3,
        title: '1.4 Phishing & Social Engineering',
        vid: '7_LPdttKXPc',
        reading: `
          <h3>Human Attack Vectors</h3>
          <p>Despite heavy technical defenses, humans remain the weakest link in security. Social engineering is the psychological manipulation of people into performing actions or divulging confidential information.</p>
          <h4>Common Tactics</h4>
          <ul>
            <li><strong>Phishing:</strong> Fraudulent emails masquerading as reputable entities to steal login credentials or install malware.</li>
            <li><strong>Spear Phishing:</strong> Highly targeted phishing attacks aimed at a specific individual or organization, often using personal information gathered from social media.</li>
            <li><strong>Whaling:</strong> Spear phishing directed specifically at high-profile targets like CEOs or CFOs.</li>
            <li><strong>Baiting:</strong> Leaving physical media (like an infected USB drive) in a conspicuous place, hoping an employee will plug it into a corporate computer.</li>
          </ul>
          <div class="note-box">💡 <strong>Defense Strategy:</strong> Regular security awareness training and enforcing Multi-Factor Authentication (MFA) are the best defenses against social engineering.</div>
        `,
        quiz: [
          { q: 'What is spear phishing?', opts: ['Targeted phishing aimed at specific individuals', 'A wireless attack', 'A virus scan'], ans: 0 }
        ]
      }
    ]
  },
  {
    id: 2,
    cat: 'NETWORKING',
    title: 'Cisco CCNA 200-301 — Networking Course',
    desc: 'Learn IP addressing, IPv4/IPv6 subnetting, VLANs, routing protocols (OSPF), and Cisco IOS commands.',
    vid: 'H8W9oMNSuwo',
    level: 'INTERMEDIATE',
    bdg: 'bdg-b',
    lessonsCount: 4,
    hrs: '12h',
    source: "Jeremy's IT Lab (YouTube)",
    rating: '⭐ 5.0 (3,100 reviews)',
    outcomes: [
      'Understand OSI 7-Layer Model and TCP/IP stack',
      'Master IPv4 subnetting and CIDR notation',
      'Configure Cisco routers and switches via IOS CLI'
    ],
    lessons: [
      {
        id: 0,
        title: '1.1 Network Fundamentals & OSI Model',
        vid: 'H8W9oMNSuwo',
        reading: `
          <h3>The 7 Layers of the OSI Model</h3>
          <p>The Open Systems Interconnection (OSI) model is a conceptual framework used to understand and standardize how different network protocols communicate. It consists of 7 layers:</p>
          <ul>
            <li><strong>1. Physical:</strong> Cables, hubs, and physical electrical signals (Bits).</li>
            <li><strong>2. Data Link:</strong> MAC addresses and switches (Frames).</li>
            <li><strong>3. Network:</strong> IP addresses and routers (Packets).</li>
            <li><strong>4. Transport:</strong> TCP/UDP, reliability, and ports (Segments).</li>
            <li><strong>5. Session:</strong> Establishes and terminates connections.</li>
            <li><strong>6. Presentation:</strong> Data formatting, encryption, and compression.</li>
            <li><strong>7. Application:</strong> High-level protocols like HTTP, DNS, FTP.</li>
          </ul>
          <div class="note-box">💡 <strong>Mnemonic:</strong> <strong>P</strong>lease <strong>D</strong>o <strong>N</strong>ot <strong>T</strong>hrow <strong>S</strong>ausage <strong>P</strong>izza <strong>A</strong>way</div>
        `,
        quiz: [
          { q: 'Which OSI layer handles IP Addresses?', opts: ['Layer 2 (Data Link)', 'Layer 3 (Network)', 'Layer 4 (Transport)'], ans: 1 }
        ]
      },
      {
        id: 1,
        title: '1.2 IPv4 Subnetting Basics',
        vid: 'qiQR5rTSshw',
        reading: `
          <h3>Subnetting Concepts</h3>
          <p>Subnetting is the practice of dividing a single large network into multiple smaller, more efficient sub-networks (subnets). This reduces broadcast traffic and improves security.</p>
          <h4>The Subnet Mask</h4>
          <p>An IPv4 address is 32 bits long. The subnet mask determines which portion of the IP address represents the Network, and which represents the Host. For example, a <code>/24</code> subnet mask (CIDR notation) means the first 24 bits are the network, leaving 8 bits for hosts (up to 254 usable IPs).</p>
          <div class="code-block">
            IP Address:   <span class="str">192.168.1.50</span><br/>
            Subnet Mask:  <span class="str">255.255.255.0</span> (/24)<br/>
            Network ID:   <span class="str">192.168.1.0</span><br/>
            Broadcast:    <span class="str">192.168.1.255</span>
          </div>
        `,
        quiz: [
          { q: 'What is the default subnet mask for a /24 network?', opts: ['255.255.255.0', '255.255.0.0', '255.0.0.0'], ans: 0 }
        ]
      },
      {
        id: 2,
        title: '1.3 Virtual LANs (VLANs) & Trunking',
        vid: '6Enj9R-Jz58',
        reading: `
          <h3>VLANs on Cisco Switches</h3>
          <p>A Virtual LAN (VLAN) allows you to logically segment a network on a single physical switch, creating separate broadcast domains. For example, you can have HR on VLAN 10 and Engineering on VLAN 20, and they will not be able to talk directly without a router.</p>
          <h4>Trunk Ports vs Access Ports</h4>
          <ul>
            <li><strong>Access Port:</strong> Belongs to a single VLAN. Used to connect end devices like PCs and printers.</li>
            <li><strong>Trunk Port:</strong> Carries traffic for multiple VLANs across a single physical link (usually between switches). It uses the <strong>802.1Q</strong> standard to tag Ethernet frames with a VLAN ID.</li>
          </ul>
        `,
        quiz: [
          { q: 'Which protocol tags Ethernet frames for VLAN trunking?', opts: ['HTTP', '802.1Q', 'TCP'], ans: 1 }
        ]
      },
      {
        id: 3,
        title: '1.4 Dynamic Routing: OSPF Protocol',
        vid: '512-H1C8Jcw',
        reading: `
          <h3>Dynamic Routing with OSPF</h3>
          <p>OSPF (Open Shortest Path First) is an Interior Gateway Protocol (IGP) used to route traffic within an autonomous system (a single organization's network).</p>
          <p>Unlike static routing where admins manually enter paths, OSPF is a <strong>link-state</strong> routing protocol. Routers exchange information about their links and run Dijkstra's Shortest Path First (SPF) algorithm to calculate the best route to every destination.</p>
          <div class="note-box">💡 <strong>Metric:</strong> OSPF chooses the best path based on <strong>Cost</strong>, which is inversely proportional to the link's bandwidth. A 10Gbps fiber link has a much lower cost than a 100Mbps ethernet link, making it the preferred path.</div>
        `,
        quiz: [
          { q: 'What metric does OSPF use to choose the best route?', opts: ['Hop count', 'Cost (based on bandwidth)', 'Delay'], ans: 1 }
        ]
      }
    ]
  },
  {
    id: 3,
    cat: 'WEB DEVELOPMENT',
    title: 'HTML & CSS — Modern Web Design',
    desc: 'Build responsive websites using semantic HTML5, CSS Grid, Flexbox, and modern CSS variables.',
    vid: 'mU6anWqZJcc',
    level: 'BEGINNER',
    bdg: 'bdg-g',
    lessonsCount: 4,
    hrs: '5h',
    source: 'Dave Gray (YouTube)',
    rating: '⭐ 4.9 (1,500 reviews)',
    outcomes: [
      'Build structured web pages using HTML5 elements',
      'Style layouts with Flexbox and CSS Grid',
      'Create mobile-responsive web applications'
    ],
    lessons: [
      {
        id: 0,
        title: '1.1 HTML5 Basics & Semantic Tags',
        vid: 'mU6anWqZJcc',
        reading: `
          <h3>Semantic HTML5 Structure</h3>
          <p>HTML (HyperText Markup Language) is the skeleton of every website. Modern HTML5 introduced <strong>semantic tags</strong>—elements that clearly describe their meaning to both the browser and the developer. This dramatically improves SEO and web accessibility.</p>
          <h4>Core Semantic Elements</h4>
          <ul>
            <li><code>&lt;header&gt;</code>: Introductory content or navigational links.</li>
            <li><code>&lt;nav&gt;</code>: Main navigation menu.</li>
            <li><code>&lt;main&gt;</code>: The primary, unique content of the document.</li>
            <li><code>&lt;article&gt;</code>: Independent, self-contained content (like a blog post).</li>
            <li><code>&lt;footer&gt;</code>: Copyright data, links, or contact info at the bottom.</li>
          </ul>
        `,
        quiz: [
          { q: 'Which tag is best suited for top site navigation?', opts: ['<div class="nav">', '<nav>', '<sidebar>'], ans: 1 }
        ]
      },
      {
        id: 1,
        title: '1.2 CSS Selectors & Box Model',
        vid: 'pQN-pnXPaVg',
        reading: `
          <h3>The CSS Box Model</h3>
          <p>CSS (Cascading Style Sheets) dictates the visual design of a website. The most crucial concept in CSS is the Box Model. Every HTML element is essentially a rectangular box composed of four layers:</p>
          <ul>
            <li><strong>Content:</strong> The actual text or image.</li>
            <li><strong>Padding:</strong> Transparent space <em>inside</em> the border, pushing the content inward.</li>
            <li><strong>Border:</strong> A line that goes around the padding and content.</li>
            <li><strong>Margin:</strong> Transparent space <em>outside</em> the border, separating the element from other elements.</li>
          </ul>
        `,
        quiz: [
          { q: 'Which property creates space INSIDE an element border?', opts: ['margin', 'padding', 'gap'], ans: 1 }
        ]
      },
      {
        id: 2,
        title: '1.3 Flexbox Layout Guide',
        vid: '1PnVor36_40',
        reading: `
          <h3>Flexible Box Module (Flexbox)</h3>
          <p>Flexbox is a 1-dimensional layout model designed to distribute space dynamically along a single row or column. It makes centering elements incredibly easy.</p>
          <div class="code-block">
            .container {<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;display: flex;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;justify-content: center; <span class="cm">/* Aligns horizontally on main axis */</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;align-items: center;     <span class="cm">/* Aligns vertically on cross axis */</span><br/>
            }
          </div>
        `,
        quiz: [
          { q: 'Which property centers flex items horizontally in a standard row layout?', opts: ['justify-content: center', 'align-items: center', 'text-align: center'], ans: 0 }
        ]
      },
      {
        id: 3,
        title: '1.4 Responsive CSS Grid',
        vid: 'G3e-cpLfu0E',
        reading: `
          <h3>CSS Grid Templates</h3>
          <p>Unlike Flexbox, CSS Grid is a 2-dimensional layout system that handles both rows and columns simultaneously. It is perfect for constructing complex page layouts.</p>
          <div class="code-block">
            .grid-container {<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;display: grid;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;grid-template-columns: <span class="str">repeat(3, 1fr)</span>; <span class="cm">/* Creates 3 equal width columns */</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;gap: <span class="str">20px</span>;<br/>
            }
          </div>
        `,
        quiz: [
          { q: 'How do you create a 3 equal column grid layout?', opts: ['grid-template-columns: repeat(3, 1fr)', 'grid: 3 cols', 'display: 3-cols'], ans: 0 }
        ]
      }
    ]
  },
  {
    id: 4,
    cat: 'ETHICAL HACKING',
    title: 'Ethical Hacking & Penetration Testing',
    desc: 'Learn Linux command line, Nmap scanning, Metasploit framework, and vulnerability assessment.',
    vid: '3Kq1MIfTWCE',
    level: 'ADVANCED',
    bdg: 'bdg-o',
    lessonsCount: 4,
    hrs: '15h',
    source: 'TCM Security (YouTube)',
    rating: '⭐ 4.9 (2,900 reviews)',
    outcomes: [
      'Master Nmap for network enumeration and port scanning',
      'Understand Metasploit and vulnerability exploitation',
      'Document security audit reports ethically'
    ],
    lessons: [
      {
        id: 0,
        title: '1.1 Intro to PenTesting & Legal Scope',
        vid: '3Kq1MIfTWCE',
        reading: `
          <h3>Ethical Hacking Rules of Engagement</h3>
          <p>A Penetration Test (PenTest) is an authorized, simulated cyberattack on a computer system to evaluate its security. The difference between a hacker and an ethical hacker is exactly one thing: <strong>Permission</strong>.</p>
          <h4>The Scope of Work (SoW)</h4>
          <p>Before launching a single port scan, you must have a legally binding, written authorization document known as the Rules of Engagement (RoE) or Scope of Work. This defines exactly what IP ranges, systems, and social engineering tactics you are permitted to test, and which systems are strictly off-limits (like production databases or third-party cloud hosts).</p>
        `,
        quiz: [
          { q: 'What is strictly required before starting a security penetration test?', opts: ['A fast PC', 'Written authorization / Scope', 'An IP scanner'], ans: 1 }
        ]
      },
      {
        id: 1,
        title: '1.2 Nmap Reconnaissance & Scanning',
        vid: 'fNzpcB7iRxo',
        reading: `
          <h3>Network Enumeration with Nmap</h3>
          <p>Nmap (Network Mapper) is the industry-standard open-source tool for network discovery and security auditing. It allows you to find live hosts, discover open ports, identify running services, and even detect operating system versions.</p>
          <h4>Common Nmap Flags</h4>
          <ul>
            <li><code>-sS</code>: SYN Stealth Scan (fast, relatively quiet)</li>
            <li><code>-sV</code>: Probe open ports to determine service and version info</li>
            <li><code>-O</code>: Enable OS detection</li>
            <li><code>-p-</code>: Scan all 65,535 ports instead of just the top 1,000</li>
          </ul>
          <div class="code-block">
            <span class="cm"># Comprehensive scan against a target IP</span><br/>
            nmap -sV -sC -p- -T4 <span class="str">192.168.1.10</span>
          </div>
        `,
        quiz: [
          { q: 'Which Nmap flag performs a service version scan to find out what software is running?', opts: ['-sS', '-sV', '-O'], ans: 1 }
        ]
      },
      {
        id: 2,
        title: '1.3 Metasploit Exploitation Framework',
        vid: 'dz7Ntp7KQGA',
        reading: `
          <h3>Using Metasploit (msfconsole)</h3>
          <p>The Metasploit Framework is a ruby-based platform used to develop, test, and execute exploit code against a remote target. It comes pre-installed on Kali Linux.</p>
          <p>Metasploit contains thousands of modules divided into:</p>
          <ul>
            <li><strong>Exploits:</strong> Code that takes advantage of a specific vulnerability.</li>
            <li><strong>Payloads:</strong> Code that runs on the target system after a successful exploit (like a reverse shell).</li>
            <li><strong>Auxiliary:</strong> Scanners and fuzzers that don't execute a payload.</li>
          </ul>
          <div class="code-block">
            <span class="cm"># Start Metasploit</span><br/>
            msfconsole<br/>
            <span class="cm"># Select an exploit module</span><br/>
            use exploit/windows/smb/ms17_010_eternalblue
          </div>
        `,
        quiz: [
          { q: 'Which command launches the Metasploit console in Kali Linux?', opts: ['nmap', 'msfconsole', 'hydra'], ans: 1 }
        ]
      },
      {
        id: 3,
        title: '1.4 Password Auditing & Cracking',
        vid: 'WnN0eI3rOno',
        reading: `
          <h3>Hash Cracking Concepts</h3>
          <p>When you dump a database, passwords are rarely stored in plain text. They are hashed using algorithms like MD5, SHA-1, or bcrypt. To recover the password, you must crack the hash.</p>
          <h4>Offline Attacks</h4>
          <p>Tools like <strong>Hashcat</strong> and <strong>John the Ripper</strong> perform offline attacks against hashed lists. They use massive dictionary files (like <code>rockyou.txt</code>) and brute-force rules to guess billions of passwords per second utilizing modern GPUs.</p>
        `,
        quiz: [
          { q: 'Which tool is widely used for GPU-accelerated offline hash cracking?', opts: ['Wireshark', 'Hashcat', 'Nmap'], ans: 1 }
        ]
      }
    ]
  },
  {
    id: 5,
    cat: 'LINUX',
    title: 'Linux Command Line Fundamentals',
    desc: 'Master bash terminal commands, file permissions, processes, ssh, and system administration.',
    vid: 'ZtqBQ68cfJc',
    level: 'BEGINNER',
    bdg: 'bdg-g',
    lessonsCount: 4,
    hrs: '7h',
    source: 'freeCodeCamp (YouTube)',
    rating: '⭐ 4.9 (2,100 reviews)',
    outcomes: [
      'Navigate directories using cd, ls, and pwd',
      'Manage files, read logs, and manipulate text with grep',
      'Configure file permissions with chmod and chown'
    ],
    lessons: [
      {
        id: 0,
        title: '1.1 Navigation & Essential Commands',
        vid: 'ZtqBQ68cfJc',
        reading: `
          <h3>Mastering the Terminal</h3>
          <p>Linux is the operating system powering most of the world's web servers, smartphones (Android), and cloud infrastructure. Learning the Command Line Interface (CLI) is mandatory for developers and sysadmins.</p>
          <h4>Core Navigation</h4>
          <div class="code-block">
            pwd    <span class="cm"># Print Working Directory: shows where you are</span><br/>
            ls -la <span class="cm"># List all files (including hidden ones) with detailed info</span><br/>
            cd ..  <span class="cm"># Move up one directory level</span><br/>
            cd ~   <span class="cm"># Move to your home directory</span>
          </div>
        `,
        quiz: [
          { q: 'Which command shows your current working directory absolute path?', opts: ['dir', 'pwd', 'whereami'], ans: 1 }
        ]
      },
      {
        id: 1,
        title: '1.2 File Permissions & Chmod',
        vid: 'v_1yAOX8hR8',
        reading: `
          <h3>Linux File Permissions</h3>
          <p>Every file and directory in Linux has three permission types for three classes of users:</p>
          <ul>
            <li><strong>Classes:</strong> Owner (u), Group (g), Others (o)</li>
            <li><strong>Permissions:</strong> Read (r=4), Write (w=2), Execute (x=1)</li>
          </ul>
          <h4>Using chmod</h4>
          <p>You change permissions using the <code>chmod</code> command, often via octal numbers (adding the r, w, x values together).</p>
          <div class="code-block">
            <span class="cm"># Gives owner rwx (4+2+1=7), group rx (4+1=5), others rx (4+1=5)</span><br/>
            chmod <span class="str">755</span> script.sh
          </div>
        `,
        quiz: [
          { q: 'What octal value represents Read (r) permission in Linux?', opts: ['1', '2', '4'], ans: 2 }
        ]
      },
      {
        id: 2,
        title: '1.3 Text Processing: Grep & Cut',
        vid: 'lqFq4vD5oV4',
        reading: `
          <h3>Searching Texts and Logs</h3>
          <p>Piping (<code>|</code>) and searching text streams is where Linux excels. The <code>grep</code> command filters input and prints lines containing a specific pattern.</p>
          <div class="code-block">
            <span class="cm"># Search for "error" case-insensitively in syslog</span><br/>
            grep -i <span class="str">"error"</span> /var/log/syslog<br/><br/>
            <span class="cm"># Find all active listening ports using netstat and grep</span><br/>
            netstat -tulnp | grep LISTEN
          </div>
        `,
        quiz: [
          { q: 'Which command searches for patterns inside text files or piped output?', opts: ['find', 'grep', 'cat'], ans: 1 }
        ]
      },
      {
        id: 3,
        title: '1.4 Process Management: Ps & Kill',
        vid: 'tK9Oc6AEnxc',
        reading: `
          <h3>Managing Linux Processes</h3>
          <p>Every running program in Linux is a process assigned a unique Process ID (PID). When a program freezes or consumes too much memory, you must manage it via the terminal.</p>
          <ul>
            <li><code>top</code> or <code>htop</code>: Interactive process viewers that show real-time CPU/RAM usage.</li>
            <li><code>ps aux</code>: Snapshots all currently running processes for all users.</li>
            <li><code>kill &lt;PID&gt;</code>: Sends a polite termination signal (SIGTERM 15) to a process.</li>
            <li><code>kill -9 &lt;PID&gt;</code>: Sends a forced, immediate termination signal (SIGKILL 9).</li>
          </ul>
        `,
        quiz: [
          { q: 'Which command displays a static snapshot of all running processes in Linux?', opts: ['ps aux', 'list-proc', 'show'], ans: 0 }
        ]
      }
    ]
  }
];"""

with codecs.open(html_file, 'r', 'utf-8') as f:
    content = f.read()

# Replace the block using regex.
pattern = r"const COURSES = \[.*?\];"
new_content = re.sub(pattern, new_courses, content, flags=re.DOTALL)

with codecs.open(html_file, 'w', 'utf-8') as f:
    f.write(new_content)

print("SUCCESS: Deeply expanded and detailed all reading notes using regex.")
