# Yahiaoui Abderrahmane — Cybersecurity & Infrastructure Portfolio

A highly interactive, visually striking portfolio designed specifically to mirror the environments of Cybersecurity, DevOps, and Infrastructure engineering.

Built with **Next.js 15 (App Router)**, **React**, **Tailwind CSS v4**, and **Framer Motion**.

## 🌐 Live Site
👉 **[abdo30004.github.io](https://abdo30004.github.io/)**

---

## 🚀 Core Features

### 1. Terminal-Style Identity Header
The landing section isn't just text; it's a simulated connection terminal. It features typewriter boot-sequence effects, live-updating network latency/uptime statistics, and simulated telemetry to instantly establish the engineering aesthetic.

### 2. CI/CD Pipeline Career Timeline
Instead of a boring list of bullet points, career history and roles are formatted as an interactive deployment pipeline (`Deploying to production...`). Roles like *Cyber Security Instructor* and *CTF Infra Lead* are treated as successful pipeline stages (e.g., `[PASS]`, `[OK]`), giving a unique nod to DevOps workflows.

### 3. Live "Physics-Driven" Infrastructure Backgrounds
Every single project card features a bespoke, mathematically precise animation that runs infinitely in the background, tailored directly to the project's architecture:
- **MCTF Instancer:** Features a simulated Docker Compose control node that infinitely spawns child containers (labeled `#1`, `#2`, etc.) along horizontal network rails with perfect collision-free physics.
- **Docker Monitor:** A classic Docker whale perfectly locked onto the geometry of a moving quadratic bezier sine wave, bobbing up and down exactly in phase with the water's surface.
- **CVE Monitoring Tool:** A spinning, conic-gradient radar sweep with pinging blips to represent active vulnerability scanning.
- **AquaSense:** Slowly floating telemetry data bubbles (`pH: 7.2`, `T: 24C`) on a slow, layered ocean wave.

### 4. Zero-Overlap Geometry
The UI relies heavily on absolute positioning and `z-index` layering to ensure that the dynamic background animations seamlessly weave *behind* the text but *over* the structural card borders, creating a genuine sense of depth.

### 5. Discord / OpenGraph Embed Support
Fully configured for gorgeous social sharing. Dropping the link in Discord or Twitter will unfurl a beautiful, AI-generated command-center preview image and rich meta descriptions.

### 6. 100% Static Export
Optimized for zero-server hosting. The entire application compiles down to static HTML/CSS/JS and is deployed seamlessly to GitHub Pages.

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server locally
npm run dev
```

## 📦 Deployment (GitHub Pages)

This project is configured to automatically deploy to GitHub Pages using GitHub Actions. 
Any push to the `main` branch will trigger the `.github/workflows/nextjs.yml` workflow and deploy the static `out` folder.

## 📄 License
MIT License.
