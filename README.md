# Portfolio-Website
This is my Portfolio Website that gives an insight on my technical knowledge, achievements, services.
This is a milestone that showcases my strong foundation in the domain Full Stack Development.

## Admin panel

Copy `.env.example` to `.env`, set a long random `SESSION_SECRET`, and configure `ADMIN_USERNAME` and `ADMIN_PASSWORD`. The server hashes `ADMIN_PASSWORD` with bcrypt at runtime, so no password hash needs to be stored. Start the app and open `/admin/login`. The dashboard manages skills, projects, and achievements stored in MongoDB.

To migrate the skills and achievements that were previously hardcoded on the homepage, run:

```bash
npm run seed:content
```
