# 🧾 Admin Article API Documentation

> **Base URL**: `http://localhost:7000`

> 🔐 All routes require a valid JWT token except `/login`

---

## 🔐 Authentication

### `POST /api/admin/login`

Authenticate the admin and receive a JWT token.

#### Request Body

```json
{
  "email": "admin",
  "password": "your_password"
}
```

#### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Include this token as a Bearer token in the `Authorization` header for all protected routes.

---

## 📝 Create Article

### `POST /api/admin/article`

Create a new article.

- **Protected**: ✅
- **Content-Type**: `multipart/form-data`

#### Form Data Fields

| Field         | Type     | Required | Notes                                |
|---------------|----------|----------|--------------------------------------|
| `title`       | `string` | ✅       |                                      |
| `summary`     | `string` | ✅       |                                      |
| `author`      | `string` | ✅       |                                      |
| `readTime`    | `number` | ✅       | Estimated read time in minutes       |
| `tags`        | `string` | ✅       | JSON stringified array of tags       |
| `equations`   | `string` | ✅       | JSON stringified array of equations  |
| `attachments` | `file[]` | optional | Multiple files (images, PDFs, etc.)  |


#### Response

```json
{
  "id": "article-uuid",
  "title": "My Article",
  "summary": "Short summary",
  "author": "Ahmed",
  "tags": [...],
  "equations": [...],
  "attachments": [...]
}
```

---

## 📚 Get All Articles (Paginated)

### `GET /api/admin/`

- **Protected**: ✅

#### Query Parameters

| Param        | Type     | Required | Description                    |
|--------------|----------|----------|--------------------------------|
| `articleNum` | `number` | ✅       | Number of articles per page    |
| `page`       | `number` | ✅       | Page number (starting from 1)  |

#### Example

```
GET /api/admin/?articleNum=5&page=1
```

#### Response

```json
[
  {
    "id": "article-uuid",
    "title": "Article Title",
    ...
  }
]
```

---

## 📄 Get Article by ID

### `GET /api/admin/:id`

Retrieve a single article by its ID.

- **Protected**: ✅

#### Example

```
GET /api/admin/9462ef04-074b-488e-9a3e-05376f7a172f
```

#### Response

```json
{
  "id": "9462ef04-074b-488e-9a3e-05376f7a172f",
  "title": "My Article",
  ...
}
```

---

## ✏️ Update Article

### `PUT /api/admin/:id`

Update an article by ID.

- **Protected**: ✅
- **Content-Type**: `multipart/form-data`

> Must include all updated fields.

#### Response

```json
{
  "id": "article-uuid",
  "title": "Updated Title",
  ...
}
```

---

## ❌ Delete Article

### `DELETE /api/admin/:id`

Delete an article by ID.

- **Protected**: ✅

#### Example

```
DELETE /api/admin/9462ef04-074b-488e-9a3e-05376f7a172f
```

#### Response

```json
{
  "message": "Article deleted successfully"
}
```

---

## ✅ Authorization Header Format

```http
Authorization: Bearer <your_token>
```

Use this header in all protected routes.

---

## 📂 Uploads

Uploaded files are stored in `/uploads/`  
Access them like:

```
http://localhost:7000/uploads/<filename>
```