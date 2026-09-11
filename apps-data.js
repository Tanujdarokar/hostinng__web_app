/**
 * ===================================================================
 * APPS DATA STORE
 * ===================================================================
 * To add a new app, simply copy an object structure below and fill in
 * your app details. The website will automatically render the new app card,
 * search tags, category filters, and detail modal.
 * 
 * Fields:
 * - id: Unique slug or ID
 * - name: App title
 * - tagline: Short punchy one-liner for the card preview
 * - category: Category name (used for filtering tabs)
 * - icon: URL or SVG data URI for the app icon
 * - version: Current APK version string (e.g. "v1.0.0")
 * - updatedDate: Date of the latest release (e.g. "Sep 08, 2026")
 * - size: Download size in MB (e.g. "18.5 MB")
 * - minAndroid: Minimum Android version (e.g. "Android 8.0+")
 * - apkUrl: Direct download link (e.g. GitHub Releases URL or direct file)
 * - githubUrl: (Optional) GitHub repository link
 * - featured: Boolean (if true, shows a "Featured" badge)
 * - description: Detailed description of what the app does
 * - features: Array of key features highlighted in the modal
 * - screenshots: Array of screenshot image URLs
 * - changelog: Array of recent update bullet points
 * ===================================================================
 */

const APPS_DATA = [
  {
    id: "ai-study-assist",
    name: "AI Study Assist",
    tagline: "Intelligent AI learning companion for instant topic explanations, summaries, mock quizzes & flashcards.",
    category: "Education",
    icon: "assets/icons/ai-study-assist.svg",
    version: "v1.0.0",
    updatedDate: "Sep 08, 2026",
    size: "18.5 MB",
    minAndroid: "Android 8.0+ (Oreo)",
    apkUrl: "https://github.com/Tanujdarokar/AI-Study-Assist/releases/download/v1.0.0/AI-Study-Assist-v1.0.0.apk",
    githubUrl: "https://github.com/Tanujdarokar",
    featured: true,
    description: "AI Study Assist is an intelligent mobile learning companion designed to help students, scholars, and lifelong learners master any subject. Powered by state-of-the-art AI, the app provides instant topic explanations tailored to any complexity level (e.g. 'Explain like I'm 5'), automated study material summarization, customized mock quizzes with instant evaluation, and smart spaced-repetition flashcards. Featuring an eye-friendly AMOLED dark mode and clean daylight theme, personal scholar dashboard, and prompt suggestion shortcuts to make studying intuitive, focused, and enjoyable.",
    features: [
      "🧠 Explain Topic: Break down complex concepts into simple, intuitive explanations tailored to your learning pace",
      "📖 Smart Summarizer: Condense textbooks, research articles, and lecture notes into concise key takeaways",
      "📝 Mock Quiz Generator: Test your mastery on any topic with dynamic AI-generated practice questions",
      "🗂️ Interactive Flashcards: Spaced-repetition flashcard deck for rapid recall and long-term memory retention",
      "💬 Instant AI Study Assistant: Ask AI anything on the fly from the bottom bar with one-tap suggested prompt shortcuts",
      "🌓 Seamless Dark & Light Mode: Fluid theme toggling between AMOLED night study mode and crisp day theme",
      "👤 Scholar Account & Dashboard: Track your study progress, search history, saved study materials, and PRO membership status"
    ],
    screenshots: [
      "assets/screenshots/splash.png",
      "assets/screenshots/dashboard_dark.png",
      "assets/screenshots/dashboard_light.png",
      "assets/screenshots/create_account.png",
      "assets/screenshots/drawer_menu.png"
    ],
    changelog: [
      "Official launch of AI Study Assist v1.0.0 for Android",
      "Complete AI learning suite: Explain Topic, Summarize, Mock Quiz, and Flashcards",
      "One-tap prompt inspiration card ('Explain Quantum Physics like I'm 5') and quick-ask bar",
      "OLED Dark mode & Day Light mode with instant switch support",
      "Account registration and scholar navigation drawer with study history and material bookmarks"
    ]
  },
  {
    id: "women-sos",
    name: "Women SOS",
    tagline: "Women safety, quick emergency alerts, and trusted location sharing.",
    category: "Safety",
    icon: "assets/Women SOS/Screenshot 2026-01-18 060245.png",
    version: "v1.0.0",
    updatedDate: "Sep 08, 2026",
    size: "16.4 MB",
    minAndroid: "Android 8.0+ (Oreo)",
    apkUrl: "https://github.com/Tanujdarokar",
    githubUrl: "https://github.com/Tanujdarokar",
    featured: false,
    description: "Women SOS is a safety-focused mobile experience designed to help women send emergency help quickly, share live location, and contact trusted people during urgent situations. The app focuses on fast response, confidence, and personal safety awareness through a clean workflow.",
    features: [
      "🚨 One-tap emergency SOS for fast help",
      "📍 Live location sharing with trusted contacts",
      "📞 Quick-call and message safety support flow",
      "🛡️ Safety dashboard to manage emergency contacts",
      "🌎 Location-aware awareness and response experience"
    ],
    screenshots: [
      "assets/Women SOS/Screenshot 2026-01-18 060245.png",
      "assets/Women SOS/Screenshot 2026-01-18 060311.png",
      "assets/Women SOS/Screenshot 2026-01-18 060338.png",
      "assets/Women SOS/Screenshot 2026-01-18 060357.png",
      "assets/Women SOS/Screenshot 2026-01-18 060413.png"
    ],
    changelog: [
      "Women SOS app project added to the showcase",
      "Emergency SOS and trusted contact flow included",
      "Live safety location sharing and dashboard flow"
    ]
  },
  {
    id: "talent-match-ai",
    name: "Talent Match AI",
    tagline: "AI-driven talent discovery, skill matching, and recruitment workflows.",
    category: "AI",
    icon: "assets/Talent Match AI/Screenshot 2026-07-08 102209.png",
    version: "v1.0.0",
    updatedDate: "Sep 08, 2026",
    size: "19.2 MB",
    minAndroid: "Android 8.0+ (Oreo)",
    apkUrl: "https://github.com/Tanujdarokar",
    githubUrl: "https://github.com/Tanujdarokar",
    featured: true,
    description: "Talent Match AI connects people with opportunities using intelligent matching between skills, career interests, and job requirements. The app is built to help learners, recruiters, and skill seekers discover better-fit opportunities faster.",
    features: [
      "🤖 AI skill and opportunity matching",
      "📄 Candidate profile and talent pool workflow",
      "🎯 Job recommendation dashboard",
      "📈 Skill-based career discovery experience",
      "💬 Smart recruitment and talent insight flow"
    ],
    screenshots: [
      "assets/Talent Match AI/Screenshot 2026-07-08 102209.png",
      "assets/Talent Match AI/Screenshot 2026-07-08 102224.png",
      "assets/Talent Match AI/Screenshot 2026-07-08 102239.png",
      "assets/Talent Match AI/Screenshot 2026-07-08 102300.png",
      "assets/Talent Match AI/Screenshot 2026-07-08 102314.png"
    ],
    changelog: [
      "Talent Match AI project added to the showcase",
      "AI-based skill recommendation and career matching flow",
      "Recruitment profile and talent dashboard experience"
    ]
  },
  {
    id: "interview-pro",
    name: "Interview Pro",
    tagline: "Interview preparation, practice, and performance coaching workspace.",
    category: "Career",
    icon: "assets/Interview Pro/WhatsApp Image 2026-05-30 at 9.42.05 AM.jpeg",
    version: "v1.0.0",
    updatedDate: "Sep 08, 2026",
    size: "17.8 MB",
    minAndroid: "Android 8.0+ (Oreo)",
    apkUrl: "https://github.com/Tanujdarokar",
    githubUrl: "https://github.com/Tanujdarokar",
    featured: false,
    description: "Interview Pro helps learners prepare for interviews with guided practice, structured question sets, and performance feedback. The app helps turn interview readiness into a repeatable daily practice habit.",
    features: [
      "🗣️ Practice interview question flows",
      "📚 Topic-wise preparation and mock questions",
      "📊 Interview performance tracking",
      "🎯 Confidence and answer quality guidance",
      "💼 Career readiness workflow"
    ],
    screenshots: [
      "assets/Interview Pro/WhatsApp Image 2026-05-30 at 9.42.05 AM (1).jpeg",
      "assets/Interview Pro/WhatsApp Image 2026-05-30 at 9.42.05 AM.jpeg",
      "assets/Interview Pro/WhatsApp Image 2026-05-30 at 9.42.06 AM (1).jpeg",
      "assets/Interview Pro/WhatsApp Image 2026-05-30 at 9.42.06 AM.jpeg",
      "assets/Interview Pro/WhatsApp Image 2026-05-30 at 9.42.07 AM.jpeg"
    ],
    changelog: [
      "Interview Pro project added to the showcase",
      "Interview preparation flow and question experience",
      "Career-focused practice and score tracking UI"
    ]
  },
  {
    id: "login-signup-clone",
    name: "Login Signup Clone",
    tagline: "A polished login and signup UI experience with responsive authentication screens.",
    category: "Web",
    icon: "assets/icons/ai-study-assist.svg",
    version: "v1.0.0",
    updatedDate: "Sep 11, 2026",
    size: "Web App",
    minAndroid: "Web App",
    apkUrl: "",
    githubUrl: "https://github.com/Tanujdarokar/login_signup_clone",
    websiteUrl: "https://tanujdarokar.github.io/login_signup_clone/",
    featured: false,
    description: "Login Signup Clone is a clean authentication UI project showcasing a responsive login and signup experience with modern web form structure, smooth visual hierarchy, and polished page styling for a public-facing landing experience.",
    features: [
      "🔐 Login and signup experience",
      "🌐 Responsive web authentication UI",
      "💼 Modern form layout and visual polish",
      "📱 Mobile-friendly design structure",
      "⚙️ Frontend UI project for authentication workflows"
    ],
    screenshots: [],
    changelog: [
      "Login Signup Clone project added to the showcase",
      "Website project linked with GitHub Pages",
      "Authentication UI clone project added to the app catalog"
    ]
  },
  {
    id: "e-commerce-flutter-app",
    name: "E-commerce",
    tagline: "A clean Flutter shopping experience with product browsing, categories, and order-ready screens.",
    category: "Shopping",
    icon: "assets/icons/ai-study-assist.svg",
    version: "v1.0.0",
    updatedDate: "Sep 11, 2026",
    size: "Flutter App",
    minAndroid: "Android 8.0+",
    apkUrl: "assets/E-commerce/Screenshot 2026-09-11 102231.png",
    githubUrl: "https://github.com/Tanujdarokar",
    featured: false,
    description: "E-commerce is a Flutter shopping UI experience showcasing product discovery, store categories, visual product cards, cart interactions, and polished commerce flows for a modern online shopping app.",
    features: [
      "🛍️ Product browsing and category layout",
      "📦 Shopping cart and checkout-ready UI",
      "🎨 Modern Flutter commerce screen design",
      "📱 Responsive shopping experience",
      "🌐 App showcase UI for online commerce"
    ],
    screenshots: [
      "assets/E-commerce/Screenshot 2026-09-11 102231.png",
      "assets/E-commerce/Screenshot 2026-09-11 102256.png",
      "assets/E-commerce/Screenshot 2026-09-11 102310.png",
      "assets/E-commerce/Screenshot 2026-09-11 102327.png",
      "assets/E-commerce/Screenshot 2026-09-11 102338.png",
      "assets/E-commerce/Screenshot 2026-09-11 102402.png"
    ],
    changelog: [
      "E-commerce Flutter UI showcase added",
      "Product browsing and sales screen flow included",
      "Flutter UI screenshots added to the project assets"
    ]
  },
  {
    id: "ai-face-assistant",
    name: "AI Face Assistant",
    tagline: "A face-first AI assistant experience for visual recognition, prompts, and smart guidance.",
    category: "AI",
    icon: "assets/icons/ai-study-assist.svg",
    version: "v1.0.0",
    updatedDate: "Sep 11, 2026",
    size: "22.1 MB",
    minAndroid: "Android 8.0+ (Oreo)",
    apkUrl: "https://github.com/Tanujdarokar/AI-Face-Assistant/releases/download/v1.0.0/AI-Face-Assistant-v1.0.0.apk",
    githubUrl: "https://github.com/Tanujdarokar/AI-Face-Assistant",
    featured: true,
    description: "AI Face Assistant is a visual AI experience built around face recognition, smart prompts, and interactive guidance for everyday personal assistant workflows. The app is designed to combine user-friendly face experiences with practical AI productivity and assistance features.",
    features: [
      "🤖 AI face-based interactive assistant",
      "📷 Visual recognition and profile matching UI",
      "⚡ Fast prompt and action assistance",
      "💬 Guided conversational workflow",
      "🌎 Smart assistant experience for daily productivity"
    ],
    screenshots: [],
    changelog: [
      "AI Face Assistant project added to the showcase",
      "GitHub repository added to the project data",
      "AI assistant app entry added with download-ready APK metadata"
    ]
  },
  {
    id: "carbon-footprint",
    name: "Carbon Foot Print",
    tagline: "A carbon awareness app for tracking emissions, smart sustainability goals, and eco daily actions.",
    category: "Sustainability",
    icon: "assets/icons/ai-study-assist.svg",
    version: "v1.0.0",
    updatedDate: "Sep 11, 2026",
    size: "24.6 MB",
    minAndroid: "Android 8.0+ (Oreo)",
    apkUrl: "https://github.com/Tanujdarokar/carbonFootPrint/releases/download/v1.0.0/carbonFootPrint-v1.0.0.apk",
    githubUrl: "https://github.com/Tanujdarokar/carbonFootPrint",
    featured: false,
    description: "Carbon Foot Print is a sustainability-focused mobile experience designed to help people understand their personal environmental impact through daily activity, emissions awareness, and greener lifestyle choices.",
    features: [
      "🌍 Carbon impact and sustainability dashboard",
      "📉 Emission tracking and activity awareness",
      "🌱 Eco-friendly habit recommendations",
      "📊 Daily impact summary and goal planning",
      "♻️ Green lifestyle and footprint improvement flow"
    ],
    screenshots: [],
    changelog: [
      "Carbon Foot Print project added to the showcase",
      "Sustainability workflow and impact dashboard included",
      "Carbon awareness project added with direct APK metadata"
    ]
  },
  {
    id: "smart-management-web",
    name: "Smart Management Web",
    tagline: "A smart web dashboard for management, operations, and business visibility.",
    category: "Web",
    icon: "assets/icons/ai-study-assist.svg",
    version: "v1.0.0",
    updatedDate: "Sep 11, 2026",
    size: "Web App",
    minAndroid: "Web App",
    apkUrl: "",
    githubUrl: "https://github.com/Tanujdarokar/smart_management_web",
    websiteUrl: "https://tanujdarokar.github.io/smart_management_web/",
    featured: false,
    description: "Smart Management Web is a management dashboard project for business operations, workflow visibility, and smarter planning. The site presents a polished web experience for monitoring tasks, processes, and project coordination in a modern management workflow.",
    features: [
      "📊 Management dashboard interface",
      "🌐 Smart web experience for business workflows",
      "⚙️ Organized operations and activity visibility",
      "📈 Reporting and planning dashboard layout",
      "💼 Modern workflow coordination experience"
    ],
    screenshots: [],
    changelog: [
      "Smart Management Web project added to the showcase",
      "Website project linked with GitHub Pages",
      "Web dashboard project added to the app catalog"
    ]
  }
];

// Site configuration & author info
const SITE_CONFIG = {
  authorName: "Tanuj Darokar",
  authorBio: "Crafting fast, beautiful, and AI-powered mobile experiences with Flutter & Dart.",
  githubUrl: "https://github.com/Tanujdarokar",
  linkedinUrl: "https://www.linkedin.com/in/tanuj-darokar/",
  twitterUrl: "https://x.com",
  email: "tanujdarokar@gmail.com",
  repoUrl: "https://github.com/Tanujdarokar"
};
