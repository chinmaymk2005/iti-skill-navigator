# ITI Skill Navigator

A frontend prototype for the SEVA First Innovation Challenge, Maharashtra Zone. The project demonstrates a career-guidance and skill-development experience for ITI students using realistic sample data and browser localStorage. No backend or paid API credentials are required.

## Workspace layout

- `client/` contains the complete React/Vite frontend.
- `../server/` is intentionally reserved as an empty scaffold for future backend work.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

From the workspace root:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite. Create a student profile or use **Student Login → Continue with demo student**. Teacher access is available from **Teacher Login → Enter teacher dashboard**; no password is required for this prototype.

Production build:

```bash
cd client
npm run build
npm run preview
```

## Demonstration flows

- Register a student with a trade, academic year and preferred language.
- Take the 20-question aptitude and technical skill assessment and review the personalized analysis.
- Explore career pathways, sample Maharashtra job listings and the 15-day automotive learning programme.
- Ask the Skill Navigator demo mentor questions in English, Hindi or Marathi.
- Enter teacher demo access to review illustrative student analytics, individual reports and add/edit/delete learning modules.
- Use **Reset demo data** on the teacher dashboard to clear prototype data stored by this app in the current browser.

## Demo access

- Student: use **Continue with demo student** on the student login page. The seeded student is Aarav Patil (Diesel Mechanic).
- Teacher: select **Enter teacher dashboard** on the teacher login page.
- Optional seeded student profile mobile numbers: `9000000001` through `9000000009`. These profiles contain illustrative dashboard metrics; real assessment results replace the sample view after the student completes the quiz.

## Prototype limitations

- Registration, quiz results, progress, chat history and teacher-added modules are stored locally in the current browser. There is no shared backend, real account security or cross-device synchronization.
- The mentor is a rule-based demonstration service, not a live AI integration.
- Job listings, salaries and seeded teacher analytics are sample data and are not verified vacancies or guaranteed compensation.
- Lesson video areas are clearly marked placeholders; teacher-added video URLs are links only and are not embedded or verified.
- The student and teacher demo access flows are intentionally unauthenticated and must not be used for real student records.
