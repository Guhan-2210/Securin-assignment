# CVE Application

## Overview

The CVE Application is a web-based platform designed to manage and display Common Vulnerabilities and Exposures (CVE) data. It consists of a frontend built with React and Vite, and a backend powered by Express and MongoDB. The application provides features such as filtering CVEs by various criteria, viewing detailed CVE information, and an API for accessing CVE data.

## Output Screenshots
![localhost_5173_cves_list (1)](https://github.com/user-attachments/assets/bdeea753-22eb-4893-8c96-7b3a1a292db1)
![localhost_5173_cves_list (2)](https://github.com/user-attachments/assets/e17f3201-3dc8-4fb3-83d2-07a2ca88214f)


## Features

- **Frontend**: Built with React and Vite, providing a responsive and interactive user interface.
- **Backend**: Developed using Express and MongoDB, offering a robust API for CVE data management.
- **Filtering**: Users can filter CVEs by ID, year, score range, and modification date.
- **Detailed View**: View comprehensive details of individual CVEs, including metrics and references.
- **API Documentation**: Swagger UI is integrated for easy API exploration and testing.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Express, MongoDB, Mongoose
- **API Documentation**: Swagger
- **Task Scheduling**: Node-cron
- **Logging**: Winston

## Logical approach
1. Consuming CVE Information from API
- Set up HTTP client (Axios) to communicate with NVD API
- Create a service layer to handle API interactions
- Transform raw API data into a structured format suitable for database storage
- Implement robust error handling for API failures
- Use environment variables for configuration management
- Create a MongoDB schema to define data structure
   
2. Chunked Response Handling
- Implement pagination logic using startIndex and resultsPerPage parameters
- Create a recursive function to fetch all pages
- Add delay between requests to respect API rate limits
- Track progress and handle pagination state
- Implement retry mechanism for failed requests

3. Data Cleansing & De-duplication
- Use upsert operations to prevent duplicates
- Transform and normalize data before storage
- Handle missing or invalid data with default values

4. Periodic Synchronization
- Implement scheduling system using node-cron
- Configure sync intervals through environment variables
- Create logging system for sync operations
   
5. API Development for Filtering
- Design RESTful API endpoints for each filter type:
-  **CVE ID lookup**
-  **Year-based filtering**
-  **Score range filtering**
-  **Modified date filtering**
-  Implement query optimization for MongoDB
-  Implement pagination for large result sets

6. UI Visualization
- Create component hierarchy:
  - Dashboard component
  - Filter section
  - Results table
  - Pagination controls
- Implement state management for:
  - Filter criteria
  - Search results
  - Pagination state
  - Loading states
  - Error handling
- Create responsive design using Tailwind CSS
- Ensure accessibility compliance

7. API Documentation
- Implement Swagger/OpenAPI documentation
- Document:
 - Endpoint descriptions
 - Request/response formats
 - Authentication requirements

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install frontend dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```

4. **Environment Variables**:
   Create a `.env` file in the `backend` directory with the following variables:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/cve_db
   NVD_API=https://services.nvd.nist.gov/rest/json/cves/2.0
   SYNC_INTERVAL=0 0 * * *  # Midnight daily
   PORT=3000
   ```

## Running the Application

### Backend

1. **Start the backend server**:
   ```bash
   cd backend
   npm start
   ```

2. **Access API documentation**:
   Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser.

### Frontend

1. **Start the frontend development server**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Open the application**:
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- **frontend**: Contains the frontend code.
  - `src/components`: React components for the application.
  - `src/pages`: Page components for routing.
  - `src/index.css`: Tailwind CSS configuration.

- **backend**: Contains the backend code.
  - `models`: Mongoose models for MongoDB.
  - `routes`: Express routes for API endpoints.
  - `controllers`: Logic for handling API requests.
  - `services`: Services for data fetching and processing.
  - `config`: Configuration files for environment variables and database connection.

