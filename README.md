# Zero-Bot: The Future of Authentic Social Networking

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8)
![Status](https://img.shields.io/badge/Status-Prototype-orange)

![Zero-Bot Hero](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop)

> **"In a world of synthetic noise, be the signal."**

**Zero-Bot** is not just another social platform; it's a movement. We are building the world's first **Proof-of-Personhood (PoP)** native social network. 

🛑 **The Problem**: The internet is overrun by bots, farm-generated content, and AI noise.
✅ **The Solution**: An exclusive, verified space where **1 Account = 1 Human**. Guaranteed.

---

## ✨ Key Features

-   **🛡️ Sybil-Resistant Identity**: Integrated "Proof of Personhood" checks ensure every user is a unique living human. (Simulated in prototype).
-   **🌌 "Deep Space" UI**: A premium, glassmorphic dark mode interface designed for immersion and focus.
-   **⚡ Real-time Interactivity**: Instant posts, threaded comments, and live voting using local state optimizations.
-   **🗳️ Community Governance**: Decentralized subreddit-style communities (`/r/[slug]`) managed by verified humans.
-   **🔒 Privacy-Preserving**: Verify your humanity without revealing your real name. Anonymity meets Accountability.

---

## 🛠️ Tech Stack

Built with the latest and greatest in modern web development:

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
-   **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/) for beautiful components.
-   **State**: React Context API + LocalStorage for persistent client-side data.
-   **Icons**: [Lucide React](https://lucide.dev/).
-   **Linting**: ESLint + Prettier.

---

## 📂 Project Structure

```bash
zero-bot/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (main)/         # Authenticated routes (Feed, Communities)
│   │   └── login/          # Auth routes
│   ├── components/         # React components
│   │   ├── feed/           # Feed & PostCard components
│   │   ├── layout/         # Navbar & Sidebar
│   │   ├── ui/             # Shadcn/UI primitives
│   │   └── ...
│   ├── contexts/           # Global state (Auth, Data)
│   └── lib/                # Utilities & Helpers
├── public/                 # Static assets
└── ...
```

---

## 🚀 Getting Started

Ready to experience a bot-free world? Follow these steps:

### Prerequisites
-   Node.js 18.17 or later
-   npm, yarn, or pnpm

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/vishwapramuditha/zero-bot.git
    cd zero-bot
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Launch**
    Open [http://localhost:3005](http://localhost:3005) in your browser.

---

## 🗺️ Roadmap

-   [x] **Phase 1: Foundation** (Core UI, Auth Mock, Feed, Comments)
-   [ ] **Phase 2: Backend** (Supabase Integration, Real Database)
-   [ ] **Phase 3: Identity** (Integration with World ID / PolygonID)
-   [ ] **Phase 4: Mobile** (React Native App)
-   [ ] **Phase 5: Mainnet Launch**

---

## 🤝 Contributing

We believe in open source and community-driven development. Zero-Bot is built by humans, for humans.

**Lead Developer:**
**Vishwa Pramuditha**  
📧 [contact@vishwapramuditha.com](mailto:contact@vishwapramuditha.com)

### How to help?
1.  Fork the repo.
2.  Create a fresh branch (`git checkout -b feature/cool-idea`).
3.  Commit your code (`git commit -m 'Add cool idea'`).
4.  Push it (`git push origin feature/cool-idea`).
5.  Open a Pull Request!

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  <i>"Don't Trust. Verify."</i>
</p>
