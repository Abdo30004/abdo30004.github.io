# Cyber & DevOps Infrastructure Portfolio

A highly interactive, visually striking portfolio designed for Cybersecurity, DevOps, and Infrastructure engineering. Built with **Next.js 15 (App Router)**, **React**, **Tailwind CSS v4**, and **Framer Motion**.

## 🚀 Features

- **Terminal-Style Identity Header:** Typewriter effects, active connection telemetry, and uptime stats.
- **CI/CD Pipeline Experience:** Career history formatted as a deployment pipeline with success/failure states.
- **Live Infrastructure Backgrounds:** Every project card has a bespoke, mathematically precise physics animation mimicking the project's architecture:
  - *MCTF Instancer:* Seamless Node Spawning & network lines.
  - *Docker Monitor:* A Docker whale perfectly riding a quadratic bezier sine wave.
  - *CVE Monitoring:* A spinning radar sweep with pinging blips.
  - *AquaSense:* Floating telemetry bubbles on a slow ocean wave.
- **100% Static Export:** Configured specifically for GitHub Pages deployment.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## 📦 Deployment (GitHub Pages)

This project is configured to automatically deploy to GitHub Pages using GitHub Actions. 
Any push to the `main` branch will trigger the `.github/workflows/nextjs.yml` workflow and deploy the static out folder.

## 📄 License

MIT License.
