<div align="center">
  <h1>💸 Reimburse Flow</h1>
  <p>
    A streamlined, role-based reimbursement management platform built with Next.js.
  </p>
  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-usage">Usage</a>
  </p>
</div>

---

## 📖 Description

**Reimburse Flow** is a modern web application designed to simplify and automate the expense reimbursement process within an organization.

It provides a seamless experience for employees to submit claims, while offering powerful dashboards for administrators and finance teams to review, track, and approve requests.

Built with performance and user experience in mind, the system uses **Role-Based Access Control (RBAC)** to ensure secure and tailored views for different organizational roles.

---

## 🚀 Features

- 🔐 **Role-Based Access Control (RBAC)**  
  Tailored interfaces and permissions for User, Admin, Finance, and Superadmin.

- 🛡️ **Secure Authentication**  
  Protected routes layout ensuring data privacy.

- 📊 **Intuitive Dashboards**  
  Customized analytics and activity feeds for each role.

- 💼 **Claim Management**  
  Easy submission, review, and tracking of reimbursement reports.

- 📱 **Responsive UI/UX**  
  Fully responsive design built with modern UI components.

- 🌗 **Theme Support**  
  Built-in Light and Dark mode toggles for better accessibility.

---

## 🛠️ Tech Stack

| Category       | Technology                   |
|----------------|----------------------------|
| Framework      | Next.js (App Router)       |
| Language       | TypeScript                 |
| Styling        | Tailwind CSS               |
| UI Components  | Radix UI / Custom UI       |
| Icons          | Lucide React               |
| Tooling        | ESLint, PostCSS            |

---

## 📦 Installation

### 1. Clone Repository
```bash
git clone https://github.com/nopaldzaki/reimburse-flow.git
cd reimburse-flow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` sesuai kebutuhan.

### 4. Run Development Server
```bash
npm run dev
```

Buka di browser: http://localhost:3000

---

## ⚙️ Configuration

- `next.config.ts` → konfigurasi Next.js  
- `theme-provider.tsx` → pengaturan tema  
- `globals.css` → styling global  

Untuk ubah tampilan:
- Edit `globals.css`
- Edit Tailwind config (jika ada)

---

## ▶️ Usage

### 🔑 Login
- `/login`

### 👤 User
- Submit → `/user/submit`
- History → `/user/history`

### 💰 Finance
- Payments → `/finance/payments`

### 🛠️ Admin
- Review → `/admin/review`

### 🧠 Superadmin
- Manage semua data & audit log

---

## 📂 Project Structure

```bash
reimburse-flow/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (protected)/
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   ├── shared/
│   │   └── ui/
│   ├── config/
│   └── lib/
├── package.json
└── tsconfig.json
```

---

## 🔐 Environment Variables

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=your_api_endpoint_here
AUTH_SECRET=your_auth_secret_key_here
```

---

## 🧪 Testing

```bash
npm run lint
npm run build
```

---

## 🚧 Roadmap

- [ ] Database integration (Prisma / Drizzle)
- [ ] NextAuth authentication
- [ ] Email notifications
- [ ] OCR receipt scanning
- [ ] Export PDF & Excel

---

## 🤝 Contributing

1. Fork repo  
2. Create branch  
```bash
git checkout -b feature/your-feature
```

3. Commit  
```bash
git commit -m "Add feature"
```

4. Push  
```bash
git push origin feature/your-feature
```

5. Pull Request  

---

## 📝 License

MIT License

---

## 👤 Author

Naufal Dzaki  
https://github.com/nopaldzaki  

---

<p align="center">Built with 💻 and ☕</p>
