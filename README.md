# BSV AdW Website (bsvadw.de)

This repository contains the source code and deployment scripts for the [BSV AdW](https://www.bsvadw.de) website.

## Project Structure

The project is divided into two main parts:

- **`site/`**: The Next.js source code for the website.
- **`home/`**: Contains the static exported site and public assets.
  - `home/html/`: The destination for the static build (`site/out` is synced here).
  - `home/public/`: Stores shared public assets, including downloaded `.ics` calendar files.

## Development

### Prerequisites
- Node.js (for the website)
- Python 3 (for sync scripts)

### Website Setup
1. Navigate to the `site` directory:
   ```bash
   cd site
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

### Build Process
To generate the static version of the site:
```bash
cd site
npm run build
```
This command does two things:
1. Runs `next build` to generate a static export in `site/out/`.
2. Uses `rsync` to sync the contents of `site/out/` to `../home/html/`.

## Sync & Deployment

The project uses a Python script (`sync.py`) to handle synchronization with the production server via FTPS.

### Environment Variables
A `.env` file (or exported environment variables) is required for the sync scripts:
- `FTPS_URL`: The FTPS connection string (e.g., `ftps://user:pass@host:port`).
- `HEIMSPIELE_HALLE1`, `TERMINE_HALLE2`, `TERMINE_HALLE1`, `TERMINE_JUGEND`: URLs to the respective `.ics` calendar files.

### Sync Scripts
- **`sync.py`**: The main synchronization logic.
  - `./sync.py pull_ics`: Downloads latest calendars to `site/public/` and `home/public/`.
  - `./sync.py push_ics`: Uploads the downloaded `.ics` files to the production server.
  - `./sync.py push`: Uploads the entire static site from `home/html/` to the production server.
- **`sync.sh`**: A wrapper to run `sync.py` within the local Python virtual environment.
- **`cron_push_ics.sh`**: A script designed to be run via cron that pulls and then pushes the ICS files.

### Automation
A `crontab` file is included in the root, showing the scheduled task for updating calendars:
```cron
55 * * * * bash /path/to/cron_push_ics.sh
```
This updates the calendars on the production server every hour at minute 55.

## Testing the Contact Form

The contact form in `site/pages/kontakt.js` sends data to `home/html/index.php`. To test this locally:

### 1. Prerequisites
- PHP 7.4+ or 8.x
- Composer (dependencies are already in `home/html/php/vendor`)

### 2. Environment Setup
The PHP script requires environment variables. Create or update `home/html/.env`:
```env
MAIL_TO="your-email@example.com"
SMTP_USERNAME="your-gmail@gmail.com"
SMTP_PASSWORD="your-app-password"
TMP="/tmp/bsvadw_php"
```
*Note: The script uses Gmail SMTP by default.*

### 3. Start Local PHP Server
Run the following command from the project root:
```bash
cd home/html
TMP=/tmp/bsvadw_php php -S localhost:3001
```

### 4. Run a Test Request
You can use the provided `test_kontakt.py` script (requires `requests`) to simulate a form submission:
```bash
python3 test_kontakt.py
```
This script automatically calculates the required daily checksum and sends a POST request to the local PHP server.

## Technologies Used
- **Frontend**: Next.js (Static Export), React, Tailwind CSS, Sass.
- **Calendar**: FullCalendar with iCalendar integration.
- **Scripts**: Python 3, Bash.
