# 🎯 Leads Finder - AI-Powered Web Quality Assessment Tool

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-yellow?style=for-the-badge&logo=python)](https://python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)](https://postgresql.org/)

## 📋 Overview

**Leads Finder** is an intelligent web quality assessment platform that combines SERP API data, PageSpeed Insights metrics, and AI-powered analysis to help SEO and marketing teams identify potential clients who need website optimization services.

The platform searches for businesses based on specific criteria, evaluates their website performance using multiple metrics, and provides comprehensive lead information including contact details, performance scores, and AI-generated insights to help marketing teams offer targeted improvement services.

## 🚀 Key Features

- **🔍 Advanced Lead Search**: Search for businesses using SERP API with customizable filters
- **📊 Performance Analysis**: Integrate PageSpeed Insights for comprehensive website evaluation
- **🤖 AI-Powered Insights**: OpenAI integration for intelligent website quality assessment
- **📞 Contact Discovery**: Automated extraction of business contact information
- **📈 Performance Metrics**: Detailed analysis of website speed, SEO, and user experience
- **📋 Lead Management**: Organize and track potential clients with detailed profiles
- **🔄 Search History**: Keep track of previous searches and results
- **📱 Responsive Design**: Modern, mobile-friendly interface built with React and Tailwind CSS

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS with Radix UI components
- **State Management**: React Hooks and Context
- **Routing**: React Router DOM
- **HTTP Client**: Axios for API communication
- **Forms**: React Hook Form with Zod validation

### Backend (FastAPI)
- **Framework**: FastAPI with Uvicorn ASGI server
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: Supabase integration
- **API Design**: RESTful API architecture
- **Data Validation**: Pydantic models
- **Migration**: Alembic for database schema management

## 🛠️ Technology Stack

### Frontend Dependencies
```json
{
  "react": "^19",
  "react-dom": "^19",
  "react-router-dom": "latest",
  "axios": "latest",
  "react-hook-form": "latest",
  "zod": "^3.24.1",
  "tailwindcss": "^3.4.17",
  "@radix-ui/react-*": "latest",
  "lucide-react": "^0.454.0",
  "recharts": "latest"
}
```

### Backend Dependencies
```python
# Core Framework
fastapi==0.104.1
uvicorn[standard]==0.24.0

# Database & ORM
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
alembic==1.12.1

# Data Validation
pydantic==2.5.0
pydantic-settings==2.1.0
email-validator==2.1.0

# HTTP & Web Scraping
httpx==0.25.2
requests==2.31.0
beautifulsoup4>=4.12.3
playwright>=1.44.0

# Search & Analysis
google-search-results>=2.0.2
openai>=1.23.2
pandas>=2.2.2

# Contact Discovery
python-whois>=0.8.0
phonenumbers>=8.13.59

# Utilities
python-dotenv==1.0.0
structlog==23.2.0
orjson==3.9.10
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL database
- SERP API key
- OpenAI API key
- PageSpeed Insights API key

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd leads_finder_react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL=postgresql://user:password@localhost/leads_finder
   SERP_API_KEY=your_serp_api_key
   OPENAI_API_KEY=your_openai_api_key
   PAGESPEED_API_KEY=your_pagespeed_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

4. **Database Setup**
   ```bash
   alembic upgrade head
   ```

5. **Start the server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## 📱 Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main application layout
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── ui/             # Radix UI components
├── pages/              # Application pages
│   ├── SearchPage.jsx  # Lead search interface
│   ├── LeadsPage.jsx   # Leads listing and management
│   ├── LeadDetailPage.jsx # Individual lead details
│   └── HistoryPage.jsx # Search history
├── services/           # API services
│   ├── api.js          # Main API client
│   ├── get_leads.js    # Lead search service
│   ├── search_history.js # History management
│   └── locations.js    # Location services
└── lib/                # Utility functions
```

## 🔄 Workflow

1. **Search Configuration**: Users input search criteria (location, business type, keywords)
2. **SERP Data Collection**: Backend queries SERP API for relevant business listings
3. **Website Analysis**: Each discovered website is analyzed using PageSpeed Insights
4. **Contact Extraction**: Automated extraction of business contact information
5. **AI Assessment**: OpenAI analyzes website quality and provides improvement recommendations
6. **Lead Generation**: Comprehensive lead profiles are created with all collected data
7. **Lead Management**: Marketing teams can review, filter, and manage potential clients

## 🎯 Use Cases

- **SEO Agencies**: Find businesses with poor website performance to offer optimization services
- **Web Development Companies**: Identify potential clients needing website improvements
- **Digital Marketing Teams**: Target businesses with specific performance issues
- **Sales Teams**: Generate qualified leads with detailed business information and pain points

## 🔧 API Endpoints

### Lead Search
- `POST /api/search/leads` - Search for leads based on criteria
- `GET /api/leads` - Retrieve all leads with filtering options
- `GET /api/leads/{id}` - Get detailed lead information

### Analysis
- `POST /api/analyze/website` - Analyze website performance
- `GET /api/analysis/{id}` - Retrieve analysis results

### History
- `GET /api/search/history` - Get search history
- `DELETE /api/search/history/{id}` - Delete search entry

## 🧪 Testing

### Frontend Testing
```bash
npm run test
```

### Backend Testing
```bash
pytest
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
```

### Backend (Docker)
```bash
docker build -t leads-finder-api .
docker run -p 8000:8000 leads-finder-api
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for SEO and Marketing professionals**
