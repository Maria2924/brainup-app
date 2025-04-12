import {useLanguage} from "../utils/useLanguage";
import type {Activity, Assessment, Module, Question, Subject} from "../types/course";

export const JavaSubject = {
    id: "java",
    name: "Java",
    description: "Java is a widely used, object-oriented, " +
        "platform-independent programming language and software platform, " +
        "known for its simplicity, efficiency, and security, used to create  " +
        "various applications, from Android apps to enterprise software",
    assessments: [
        {
            id: "midterms",
            name: "Midterms Exam",
            score: null,
            questions: [
                {
                    id: "question-1",
                    text: "It is a software that can be used to write Java applications.",
                    type: "single_choice",
                    choices: [
                        { id: "webstorm", text: "Webstorm" },
                        { id: "goland", text: "Goland" },
                        { id: "intellij", text: "IntelliJ IDEA" },
                        { id: "rustrover", text: "RustRover" },
                    ]
                },
                {
                    id: "question-2",
                    text: "Write a code that outputs the following: Hello World",
                    type: "code",
                    language: useLanguage("java")
                },
                {
                    id: "question-3",
                    text: "Write a code in C that outputs the following: Hello World",
                    type: "code",
                    language: useLanguage("c")
                },
                {
                    id: "question-4",
                    text: "Write a code in Python that outputs the following: Hello World",
                    type: "code",
                    language: useLanguage("python")
                },
                {
                    id: "question-5",
                    text: "Write a code in Kotlin that outputs the following: Hello World",
                    type: "code",
                    language: useLanguage("kotlin")
                },
                {
                    id: "question-6",
                    text: "Write a code in C++ that outputs the following: Hello World",
                    type: "code",
                    language: useLanguage("cpp")
                },
            ]
        } as Assessment,
        {id: "pretest", name: "Pre-test", score: { received: 10, max: 50 }},
    ],
    activities: [
        {
            id: "calc",
            name: "Calculator App",
            status: "unanswered",
            text: "Your task is to create a Calculator App using only  Java. You may use NetBeans IDE, or other related  IDEs. It should be able to perform basic mathematical operations such as addition, subtraction, multiplication and division.",
        },
        {
            id: "console-log",
            name: "Console Logging",
            status: "submitted",
            text: "Your task is to create a simple Hello World application in Java."
        }
    ],
    modules: [
        {
            id: "java-basics",
            name: "Syntax of Java",
            attachments: [
                {
                    name: "syntax-of-java.pdf",
                    source: "https://staff.um.edu.mt/__data/assets/pdf_file/0010/57169/jn.pdf"
                }
            ],
            text: "In this module, you will learn about the syntax of Java and how it applies to Java applications."
        },
        {
            id: "java-advanced",
            name: "Setting up Java",
            attachments: [
                {
                    name: "java-installer.exe",
                    source: "https://www.java.com/en/download/manual.jsp"
                }
            ],
            text: "To set-up Java in your system, simply download the installer attached."
        },
    ]
} as Subject

export const PythonSubject: Subject = {
    id: "python",
    name: "Python",
    description: "Python is a high-level, interpreted, general-purpose programming language " +
        "emphasizing code readability with its notable use of significant indentation. " +
        "It's widely used in web development, data science, artificial intelligence, scripting, and more.",
    assessments: [
        {
            id: "python-midterms",
            name: "Python Midterms Exam",
            score: null,
            questions: [
                {
                    id: "question-1",
                    text: "Which software is a popular Integrated Development Environment (IDE) specifically known for Python development?",
                    type: "single_choice",
                    choices: [
                        { id: "vscode", text: "Visual Studio Code" },
                        { id: "pycharm", text: "PyCharm" },
                        { id: "sublime", text: "Sublime Text" },
                        { id: "atom", text: "Atom" },
                    ]
                },
                {
                    id: "question-2",
                    text: "Write Python code that outputs the following to the console: Hello World",
                    type: "code",
                    language: useLanguage("python") // Correctly uses the CodingLanguage object
                },
                {
                    id: "question-3",
                    text: "Write Java code that outputs the following: Hello World",
                    type: "code",
                    language: useLanguage("java") // Correctly uses the CodingLanguage object
                },
                {
                    id: "question-4",
                    text: "Write C code that outputs the following: Hello World",
                    type: "code",
                    language: useLanguage("c") // Correctly uses the CodingLanguage object
                },
                {
                    id: "question-5",
                    // Changed from JavaScript (invalid based on types) to Kotlin
                    text: "Write Kotlin code that outputs the following: Hello World",
                    type: "code",
                    language: useLanguage("kotlin") // Correctly uses the CodingLanguage object
                },
                {
                    id: "question-6",
                    text: "Write C++ code that outputs the following: Hello World",
                    type: "code",
                    language: useLanguage("cpp") // Correctly uses the CodingLanguage object
                },
            ] satisfies Question[] // `satisfies` can help ensure array elements match type
        } as Assessment, // Type assertion still useful here for the overall object shape
        {
            id: "python-final",
            name: "Python Final Project",
            // Score is present, indicating a completed/graded assessment
            score: { received: 85, max: 100 },
            // Added empty questions array to conform to the Assessment type
            questions: []
        } as Assessment,
    ],
    activities: [
        {
            id: "data-analysis",
            name: "Simple Data Analysis",
            status: "unanswered",
            text: "Your task is to use Python with the Pandas library to read a provided CSV file (data.csv), calculate the average of a specific column ('Value'), and print the result. Ensure you handle potential errors like the file not being found.",
        } as Activity,
        {
            id: "simple-script",
            name: "File Organizer Script",
            status: "submitted",
            text: "Create a Python script that organizes files in a specific directory based on their file extension (e.g., move all '.txt' files to a 'TextFiles' folder, '.jpg' to 'Images'). Use the `os` or `pathlib` module."
        } as Activity
    ],
    modules: [
        {
            id: "python-intro",
            name: "Introduction to Python",
            attachments: [
                {
                    name: "python-basics-cheatsheet.pdf",
                    source: "https://perso.limsi.fr/pointal/_media/python:cours:mementopython3-english.pdf"
                }
            ],
            text: "This module covers the fundamental syntax of Python, including variables, data types (integers, floats, strings, lists, dictionaries), basic operators, and control flow (if/else, for/while loops)."
        } as Module,
        {
            id: "python-env-setup",
            name: "Setting up Python Environment",
            attachments: [
                {
                    name: "Python Official Downloads",
                    source: "https://www.python.org/downloads/"
                },
                {
                    name: "venv-documentation.html",
                    source: "https://docs.python.org/3/library/venv.html"
                }
            ],
            text: "Learn how to install Python on your system (Windows, macOS, Linux). This module also introduces package management using pip and the concept of virtual environments (venv) for managing project dependencies."
        } as Module,
    ]
};

export const NetworkingFundamentalsSubject: Subject = {
    id: "networking-fundamentals",
    name: "Networking Fundamentals",
    description: "Introduces the basic concepts of computer networking, including network types (LAN/WAN), " +
        "hardware components (routers, switches), protocols (TCP/IP, DNS, DHCP), " +
        "and the OSI and TCP/IP models.",
    assessments: [
        {
            id: "networking-quiz-1",
            name: "Networking Basics Quiz",
            score: null, // Assessment to be taken
            questions: [
                {
                    id: "net-q1",
                    text: "What is the primary function of a Router in a network?",
                    type: "single_choice",
                    choices: [
                        { id: "c1", text: "Connect devices within the same local network" },
                        { id: "c2", text: "Connect different networks together and route traffic between them" },
                        { id: "c3", text: "Amplify the network signal to extend range" },
                        { id: "c4", text: "Assign IP addresses to devices" },
                    ]
                },
                {
                    id: "net-q2",
                    text: "Which protocol is responsible for resolving domain names (like www.google.com) into IP addresses?",
                    type: "single_choice",
                    choices: [
                        { id: "c1", text: "HTTP (Hypertext Transfer Protocol)" },
                        { id: "c2", text: "TCP (Transmission Control Protocol)" },
                        { id: "c3", text: "DNS (Domain Name System)" },
                        { id: "c4", text: "DHCP (Dynamic Host Configuration Protocol)" },
                    ]
                },
                {
                    id: "net-q3",
                    text: "Which of the following is a common Private IP address range according to RFC 1918?",
                    type: "single_choice",
                    choices: [
                        { id: "c1", text: "8.8.8.0 / 24" },
                        { id: "c2", text: "172.16.0.0 / 12" }, // This covers 172.16.0.0 to 172.31.255.255
                        { id: "c3", text: "203.0.113.0 / 24" },
                        { id: "c4", text: "1.1.1.1 / 32" },
                    ]
                },
            ] satisfies Question[]
        } as Assessment,
        {
            id: "network-lab-report",
            name: "Network Configuration Lab",
            score: { received: 45, max: 50 }, // Example score for a graded lab
            questions: [] // Must include questions array, even if empty for scored assessment
        } as Assessment,
    ],
    activities: [
        {
            id: "ipconfig-activity",
            name: "Using ipconfig/ifconfig",
            status: "unanswered",
            text: "Open the command prompt (Windows) or terminal (macOS/Linux) and use the `ipconfig` (Windows) or `ifconfig`/`ip addr` (macOS/Linux) command. Identify your computer's IP address, subnet mask, and default gateway. Submit a screenshot or text capture of the output.",
        } as Activity,
        {
            id: "ping-activity",
            name: "Testing Connectivity with Ping",
            status: "submitted",
            text: "Use the `ping` command to test connectivity to a common website (e.g., `ping google.com`) and to your default gateway address found in the previous activity. Report the results, noting the round-trip times.",
        } as Activity
    ],
    modules: [
        {
            id: "net-intro",
            name: "Introduction to Networks",
            attachments: [
                {
                    name: "osi-vs-tcpip-model.pdf",
                    source: "https://www.example.com/network-models.pdf" // Placeholder link
                }
            ],
            text: "Learn about different types of networks (LAN, WAN, MAN), network topologies, and the fundamental models used to describe network communication (OSI and TCP/IP)."
        } as Module,
        {
            id: "net-protocols",
            name: "Core Network Protocols",
            attachments: [
                {
                    name: "protocols-explained.html",
                    source: "https://www.example.com/protocols-explained.html" // Placeholder link
                }
            ],
            text: "Deep dive into essential protocols: TCP, UDP, IP (v4 & v6), DNS, DHCP, and HTTP/HTTPS. Understand their purpose and how they work together."
        } as Module,
        {
            id: "net-hardware",
            name: "Network Hardware Components",
            attachments: [], // No attachments for this example module
            text: "Explore common networking hardware like routers, switches, hubs, firewalls, access points, NICs, and different types of cabling (Ethernet, Fiber Optic)."
        } as Module,
    ]
};

export const OperatingSystemsSubject: Subject = {
    id: "os-concepts",
    name: "Operating Systems Concepts",
    description: "Covers the fundamental principles of operating systems, including their role in managing hardware resources, " +
        "process management, memory management, file systems, and user interfaces. Examples include Windows, macOS, and Linux.",
    assessments: [
        {
            id: "os-quiz-1",
            name: "OS Fundamentals Quiz",
            score: null, // Assessment to be taken
            questions: [
                {
                    id: "os-q1",
                    text: "What is the core component of an operating system that manages the system's resources (CPU, memory, devices)?",
                    type: "single_choice",
                    choices: [
                        { id: "c1", text: "User Interface (UI)" },
                        { id: "c2", text: "File System" },
                        { id: "c3", text: "Kernel" },
                        { id: "c4", text: "Application Programming Interface (API)" },
                    ]
                },
                {
                    id: "os-q2",
                    text: "Which of these is NOT a primary function of a typical operating system?",
                    type: "single_choice",
                    choices: [
                        { id: "c1", text: "Process Management" },
                        { id: "c2", text: "Web Browse" }, // This is an application function
                        { id: "c3", text: "Memory Management" },
                        { id: "c4", text: "Device Management" },
                    ]
                },
                {
                    id: "os-q3",
                    text: "What is the term for the ability of an operating system to run multiple tasks or processes concurrently?",
                    type: "single_choice",
                    choices: [
                        { id: "c1", text: "Multitasking" },
                        { id: "c2", text: "Virtualization" },
                        { id: "c3", text: "File Indexing" },
                        { id: "c4", text: "Disk Defragmentation" },
                    ]
                },
            ] satisfies Question[]
        } as Assessment,
        {
            id: "os-lab-linux-vm",
            name: "Linux Virtual Machine Setup",
            score: { received: 18, max: 20 }, // Example score for graded setup task
            questions: [] // Must include questions array
        } as Assessment,
    ],
    activities: [
        {
            id: "os-process-explorer",
            name: "Exploring System Processes",
            status: "unanswered",
            text: "Use Task Manager (Windows), Activity Monitor (macOS), or `top`/`htop` (Linux) to view running processes. Identify the processes consuming the most CPU and memory. Take a screenshot and briefly describe your findings.",
        } as Activity,
        {
            id: "os-file-permissions",
            name: "Understanding File Permissions (Linux/macOS)",
            status: "submitted",
            text: "Using a Linux or macOS terminal, create a file using `touch testfile.txt`. Use `ls -l testfile.txt` to view its permissions. Use `chmod` to change the permissions (e.g., `chmod 600 testfile.txt`) and view them again. Describe the meaning of the permission string (e.g., `rw-r--r--`).",
        } as Activity
    ],
    modules: [
        {
            id: "os-intro",
            name: "What is an Operating System?",
            attachments: [
                {
                    name: "os-basics-explained.pdf",
                    source: "https://www.example.com/os101.pdf" // Placeholder link
                }
            ],
            text: "Learn the definition of an OS, its history, main functions (resource abstraction, process/memory/device management), and different types (desktop, server, mobile, embedded)."
        } as Module,
        {
            id: "os-process-mem",
            name: "Process and Memory Management",
            attachments: [],
            text: "Understand how the OS manages running applications (processes/threads), scheduling algorithms, and how memory is allocated and protected (virtual memory, paging)."
        } as Module,
        {
            id: "os-filesystems",
            name: "File Systems and Storage",
            attachments: [
                {
                    name: "common-filesystems.html",
                    source: "https://www.example.com/filesystems.html" // Placeholder link
                }
            ],
            text: "Explore how data is organized on storage devices. Learn about directories, file metadata, permissions, and common file systems like NTFS, FAT32, ext4, HFS+, APFS."
        } as Module,
        {
            id: "os-cli-gui",
            name: "User Interfaces: CLI vs GUI",
            attachments: [],
            text: "Compare and contrast Command-Line Interfaces (CLI) and Graphical User Interfaces (GUI). Learn basic shell commands for navigation and file manipulation."
        } as Module,
    ]
};
