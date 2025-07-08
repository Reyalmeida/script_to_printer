# 📡 API Endpoints

This Flask API receives data from a Google Apps Script webhook and triggers a local print job.

---

## 🖨️ POST /print

Receives a JSON payload and sends it to the default printer using Windows printing tools.

### ✅ Request

- **URL**: `/print`
- **Method**: `POST`
- **Content-Type**: `application/json`

### 🔄 Sample Request Body
### Response 200 ok, 500 error occurred while printing

```json
{
  "name": "Customer Doe",
  "phone": "(111)-111-1111",
  "Diagnostics":"yes/no",
  "Drop off (Parts/Vehicle)":"Parts"
}
