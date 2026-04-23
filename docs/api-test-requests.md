# API Test Requests

Base URL for local backend:

```text
http://localhost:5000/api
```

For protected grievance routes, add this header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## 1. Register Student

```http
POST /api/register
Content-Type: application/json
```

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "password": "student123"
}
```

## 2. Login Student

```http
POST /api/login
Content-Type: application/json
```

```json
{
  "email": "aarav@example.com",
  "password": "student123"
}
```

## 3. Add Grievance

```http
POST /api/grievances
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

```json
{
  "title": "Internal marks not updated",
  "description": "My AI internal assessment marks are not visible on the student portal.",
  "category": "Academic",
  "status": "Pending"
}
```

## 4. Get All Grievances

```http
GET /api/grievances
Authorization: Bearer YOUR_JWT_TOKEN
```

## 5. Get Grievance By ID

```http
GET /api/grievances/GRIEVANCE_ID
Authorization: Bearer YOUR_JWT_TOKEN
```

## 6. Update Grievance

```http
PUT /api/grievances/GRIEVANCE_ID
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

```json
{
  "title": "Internal marks not updated",
  "description": "Marks have still not been updated after one week.",
  "category": "Academic",
  "status": "Resolved"
}
```

## 7. Delete Grievance

```http
DELETE /api/grievances/GRIEVANCE_ID
Authorization: Bearer YOUR_JWT_TOKEN
```

## 8. Search Grievance By Title

```http
GET /api/grievances/search?title=marks
Authorization: Bearer YOUR_JWT_TOKEN
```
