IPL T20 Live Dashboard
Task Overview:
Build a responsive dashboard application that displays real-time IPL T20 match information
sourced from iplt20.com. The application should showcase upcoming matches, live match
details (when available), the current points table, and the full match schedule. A mobile-first
design is highly encouraged.
Tech Stack:
● Next.js & React: Leverage Next.js for server-side rendering (SSR) or static site
generation (SSG) as needed.
● TypeScript: Write all code in TypeScript.
● Tailwind CSS: Style the application using Tailwind CSS.
● Node.js API Route: Create an API endpoint (e.g., /api/scrape) to handle data
scraping or fetching from iplt20.com.
Tasks
● Data Scraping / Fetching:
○ Scrape the website to extract the following information (recommended):
■ Upcoming Matches / Live Match: Display current live match details (if
a match is in progress) or upcoming matches with match timings,
teams, and venue details.
■ Points Table: Present the latest points table including wins, losses,
points, and net run rate.
■ Schedule: Show a complete match schedule.
○ If there are any issues in scrapping, use dummy data (structured properly)
○ Ensure the implementation updates the data periodically to reflect real-time
changes.
○ Clearly document your scraping methodology and any challenges you
encountered.
● Core Functionality:
○ Live/Upcoming Match Display: Present a prominent view for live match
information (as much as you can). If no match is live, display upcoming match
details.
○ Points Table: Display the IPL points table with clear visual cues for team
standings and performance metrics.
○ Match Schedule: Provide a user-friendly schedule view that lists all matches
with dates, times, and participating teams.
● User Interface:
○ Create a visually appealing and intuitive interface that organizes data
effectively. You can take inspiration from espncricinfo.
○ Prioritize a mobile-first design ensuring a seamless experience on
smartphones and tablets.
Bonus Features (Optional):
● Caching: Implement caching mechanisms to minimize unnecessary scraping or API
calls.
● Realtime Notifications: Add notifications for significant match events (e.g., key
wickets, milestones).
● Historical Data: Provide insights into previous matches or team performance
statistics.
● Enhanced Data Visualization: Incorporate charts or graphs to represent data trends
or performance metrics.
Submission Guidelines:
● Repository: Push your project to a public GitHub repository.
● README: Ensure your repository includes a detailed README with setup and run
instructions.
● Demo (Optional): Provide a link to a live demo (using Vercel, Netlify, etc.) if available