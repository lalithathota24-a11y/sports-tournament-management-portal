# Sports Tournament Management Portal

A beginner-friendly React + JSON Server capstone project.

## Requirements
- Node.js (LTS) installed
- VS Code

## Run the project

1. Extract this ZIP file.
2. Open the extracted `SportsTournament` folder in VS Code.
3. Open Terminal > New Terminal and run:

   ```bash
   npm install
   ```

4. Open a **second terminal** in VS Code. In the first terminal run:

   ```bash
   npm run server
   ```

   JSON Server runs at http://localhost:3000

5. In the second terminal run:

   ```bash
   npm run dev
   ```

6. Open the local URL shown by Vite, usually http://localhost:5173

## API endpoints
- GET /tournaments and GET /tournaments/:id
- POST /tournaments, PUT /tournaments/:id, DELETE /tournaments/:id
- The same CRUD routes are available for teams, players, matches and results.

## Notes
- Data is stored in `db.json`.
- Use the Edit button to load an existing record by ID and update it.
- Use the Delete button to remove a record.
- The dashboard counts refresh when the dashboard page is opened. Reload the dashboard after making changes on another page.
