# CivicConnect API Reference

## Base URL
`https://api.civicconnect.app/v1`

## Authentication
Most endpoints require an API key. Contact support@civicconnect.app to request an API key.

---

## Representative Endpoints

### Get Representatives by Address
`GET /representatives?address=:address`

**Parameters:**
- `address` (required): Physical address to search for representatives

**Response:**
```json
[
  {
    "name": "John Smith",
    "role": "U.S. Senator",
    "party": "Democratic Party",
    "photoUrl": "https://example.com/photo.jpg",
    "contact": {
      "email": "john.smith@senate.gov",
      "phone": "(202) 224-1234",
      "website": "https://smith.senate.gov"
    }
  }
]
