<div align="center">
  <h1>💸 Reimburse Flow</h1>
  <p>
    <strong>Modern reimbursement management system with role-based workflows</strong>
  </p>

  <p>
    <a href="https://github.com/nopaldzaki/reimburse-flow">
      <img src="https://img.shields.io/github/stars/nopaldzaki/reimburse-flow?style=social" />
    </a>
    <img src="https://img.shields.io/badge/Next.js-15-black" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-blue" />
    <img src="https://img.shields.io/badge/UI-Tailwind%20%2B%20Radix-38BDF8" />
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-usage">Usage</a> •
    <a href="#-roadmap">Roadmap</a>
  </p>
</div>

---

## ✨ Overview

**Reimburse Flow** is a role-based reimbursement system built to eliminate messy expense processes and replace them with a clean, structured, and trackable workflow.

From submission → review → approval → payout, everything is handled in one centralized platform with clear visibility for every role.

> No more Excel chaos. No more drama.

---

## 🚀 Features

### 🔐 Smart Role System (RBAC)

- User, Admin, Finance, Superadmin access
- Isolated dashboards & permissions
- Real workflow simulation

### 📊 Real-Time Tracking

- Monitor claim status instantly
- Clear progress from submission → payout

### 📈 Interactive Dashboard

- Visual insights with Recharts
- Activity monitoring per role

### 💼 Claim Workflow

- Submit reimbursement
- Review & approve system
- Organized history tracking

### 🎨 Modern UI/UX

- Clean, responsive layout
- Built with Tailwind + Radix
- Focused on usability, not just aesthetics

### 🌗 Theme System

- Dark / Light mode
- Consistent design system

---

## 🛠️ Tech Stack

| Category  | Tech                    |
| --------- | ----------------------- |
| Framework | Next.js 15 (App Router) |
| Language  | TypeScript              |
| Styling   | Tailwind CSS            |
| UI System | Radix UI / shadcn/ui    |
| State     | React Context API       |
| Charts    | Recharts                |
| Icons     | Lucide React            |

---

## 📦 Installation

```bash
git clone https://github.com/nopaldzaki/reimburse-flow.git
cd reimburse-flow
npm install
```

### Setup env

```bash
cp .env.example .env.local
```

### Run app

```bash
npm run dev
```

Open → http://localhost:3000

---

## ▶️ Usage

### 🔑 Auth

- `/login`

### 👤 User

- Dashboard → `/user/dashboard`
- Submit → `/user/submit`
- History → `/user/history`

### 🛠️ Admin

- Dashboard → `/admin/dashboard`
- Review → `/admin/review`

### 💰 Finance

- Dashboard → `/finance/dashboard`
- Payments → `/finance/payments`

### 🧠 Superadmin

- Full system access & control

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── (auth)/
│   └── (protected)/
├── components/
├── context/
├── hooks/
├── lib/
└── types/
```

---

## 🔐 Environment Variables

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## 🧪 Scripts

```bash
npm run lint
npm run build
```

---

## 🚧 Roadmap

- [ ] Backend integration (Prisma / Drizzle)
- [ ] Authentication (NextAuth / Auth.js)
- [ ] File upload (S3 / Supabase)
- [ ] Email notification system
- [ ] Unit testing

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature
git commit -m "feat: add something cool"
git push origin feature/your-feature
```

---

## 👤 Author

**Naufal Dzaki**  
https://github.com/nopaldzaki

---

<p align="center">
  Built with 💻, ☕, 🩷
</p>
