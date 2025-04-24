# WebScraper

A powerful web scraping application built with Node.js, Express, MongoDB, and Playwright that extracts, processes, and stores data from websites.


## Features

- **Automated Web Scraping**: Extract data from websites with Playwright's headless browser
- **Scheduled Scraping**: Configure periodic scraping tasks with cron jobs
- **Data Storage**: Persist scraped data in MongoDB
- **RESTful API**: Access and manage scraped data through Express endpoints
- **Customizable Targets**: Define scraping targets with selectors and transformation rules
- **Proxy Support**: Rotate IP addresses to avoid rate limiting
- **Error Handling**: Robust error recovery and logging

## Tech Stack

- **Node.js**: Runtime environment
- **Express**: Web server framework
- **MongoDB**: Database for storing scraped data
- **Playwright**: Browser automation for scraping
- **Mongoose**: MongoDB object modeling

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/webscraper.git
cd webscraper

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string and other config

# Start the application
npm start
```

## Usage

### API Endpoints

- `GET /api/scrapers`: List all scraper configurations
- `POST /api/scrapers`: Create a new scraper configuration
- `GET /api/scrapers/:id`: Get a specific scraper configuration
- `PUT /api/scrapers/:id`: Update a scraper configuration
- `DELETE /api/scrapers/:id`: Delete a scraper configuration
- `POST /api/scrapers/:id/run`: Trigger a scraper manually
- `GET /api/data`: Query scraped data

### Example Scraper Configuration

```json
{
  "name": "Product Scraper",
  "url": "https://example.com/products",
  "selectors": {
    "products": ".product-item",
    "title": ".product-title",
    "price": ".product-price",
    "description": ".product-description"
  },
  "schedule": "0 0 * * *",
  "proxy": true
}
```

## Project Structure

```
webscraper/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # API controllers
│   ├── models/        # MongoDB models
│   ├── routes/        # Express routes
│   ├── scrapers/      # Scraping logic
│   ├── services/      # Business logic
│   ├── utils/         # Helper functions
│   └── app.js         # Express application
├── .env               # Environment variables
├── package.json       # Dependencies
└── README.md          # Documentation
```

## Configuration

Adjust the application settings in the `.env` file:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/webscraper
MAX_CONCURRENT_SCRAPES=5
DEFAULT_USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64)
PROXY_API_KEY=your_proxy_api_key
```
