# CivicConnect - Empowering Civic Engagement
![IMG_20250806_010229](https://github.com/user-attachments/assets/1dbc7c99-8cd9-4d87-a93c-54224ca6a1d6)


CivicConnect is a comprehensive platform designed to empower citizens to engage with their government, understand policies, and make their voices heard. Founded by Elon Masai, this project bridges the gap between citizens and their representatives through intuitive technology.

## Features
![IMG_20250806_010251](https://github.com/user-attachments/assets/4efe0816-c502-4c4c-9aa2-3b5b99c042a6)


### 🏛️ Representative Finder
- Geolocation-based search for elected officials
- Detailed profiles with contact information
- Direct messaging and meeting scheduling

### 📜 Policy Explorer
- Multi-level complexity explanations (Basic, Intermediate, Advanced)
- Visual impact analysis of proposed legislation
- Policy simulation tools
- ![Screenshot_2025-08-06-00-39-59-12](https://github.com/user-attachments/assets/af328b63-b93c-4286-b8f2-2de933f92310)


### ✊ Action Center
- Contact representatives with pre-written templates
- Schedule in-person or virtual meetings
- Community action tools and voting resources

### 📊 Engagement Tracking
- Visual analytics of civic participation
- Achievement badges and progress tracking
- Personalized engagement recommendations
- ![Screenshot_2025-08-06-00-40-09-47](https://github.com/user-attachments/assets/efa7e81d-8142-4de0-a07c-083402e2698e)


## Technologies

**Frontend:**
- React.js (Web)
- React Native (Mobile)
- Redux (State Management)
- Chart.js (Data Visualization)

**Backend:**
- Node.js
- Express
- PostgreSQL
- Google Civic API

**DevOps:**
- Docker
- GitHub Actions
- Netlify (Web Hosting)
- Heroku (API Hosting)

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm (v6+)
- PostgreSQL (v12+)
- React Native CLI (for mobile development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/elonmasai7/civicconnect.git
cd civicconnect
```

2. Install dependencies:
```bash
# For web application
cd web
npm install

# For mobile application
cd ../mobile
npm install

# For API server
cd ../api
npm install
```

3. Set up environment variables:
```bash
# Create .env files in each directory
# Example for API:
cp api/.env.example api/.env
```

4. Start the development servers:
```bash
# In separate terminals:
cd api && npm run dev
cd web && npm start
cd mobile && npm run android # or npm run ios
```

## Project Structure

```
civicconnect/
├── api/                   # Backend server (Node.js/Express)
├── mobile/                # Mobile application (React Native)
├── web/                   # Web application (React.js)
├── docs/                  # Documentation and assets
├── docker-compose.yml     # Docker configuration
└── README.md              # Project documentation
```

## Contributing

We welcome contributions from the community! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

Please read our [Contribution Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Elon Masai** - Project Founder  
[elonmasai7@gmail.com](mailto:elonmasai7@gmail.com)  
[LinkedIn](https://linkedin.com/in/elonmasai)  
[Twitter](https://twitter.com/elonmasai7)

Project Link: [https://github.com/elonmasai7/civicconnect](https://github.com/elonmasai7/civicconnect)

## Acknowledgments

- Inspired by the need for more transparent and accessible government
- Built with support from the open source community
- Special thanks to all contributors and beta testers

---

**CivicConnect - Making Democracy Accessible to All**  
Founded by Elon Masai © 2025
