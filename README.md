# Tour Management System

A tour management system built with Node.js, Express, TypeScript, Sequelize ORM, and MySQL.

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MySQL (Sequelize ORM)
- **Template Engine**: Pug
- **File Upload**: Multer + Cloudinary
- **Environment**: dotenv
- **Dev Tools**: nodemon, ts-node

## Installation

### 1. Clone the project

```bash
git clone <repository-url>
cd Tour-Management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following content:

```env
PORT
DATABASE_NAME
DB_USER=root
DB_PASSWORD
DB_HOST
DB_PORT

CLOUD_NAME
CLOUD_KEY
CLOUD_SECRET
```

**Notes**:
- `DB_HOST` and `DB_PORT` depend on your MySQL configuration
- Cloudinary configuration is used for tour image uploads

### 4. Initialize Database

Create a MySQL database named `tour_management` (or the name you set in `.env`):

```sql
CREATE DATABASE tour_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Tables will be created automatically by Sequelize when the application runs.

### 5. Run the Project

**Development mode** (with nodemon auto-reload):

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
Tour-Management/
├── configs/           # Database and system configuration
├── controllers/       # Business logic (client + admin)
├── helpers/           # Helper functions (Cloudinary upload, slug generation)
├── middlewares/       # Middlewares (file upload)
├── models/            # Sequelize models (Tour, Category, Order...)
├── routes/            # Routing (client + admin)
├── views/             # Pug templates (client + admin)
├── public/            # Static files (css, js, images)
├── index.ts           # Entry point
├── package.json
├── tsconfig.json
```

## Main Routes

### Client
- `/` - Home page
- `/tours/:slugCategory` - Tour list by category
- `/tours/detail/:slug` - Tour detail
- `/cart` - Shopping cart
- `/order` - Booking

### Admin (prefix: `/admin`)
- `/admin/dashboard` - Dashboard
- `/admin/tours` - Tour management (CRUD)
- `/admin/categories` - Category management (CRUD)

## Important Notes

1. **Tour Images**: Supports two formats in the database:
   - JSON array string: `["url1", "url2"]`
   - Single URL string: `"https://example.com/image.jpg"`
   - Code automatically handles both formats

2. **Tour Slug**: Auto-generated from title + timestamp on creation

3. **Soft Delete**: Records are not hard deleted; instead `deleted = true` is set

4. **Cloudinary**: Requires a Cloudinary account for image uploads (configure in .env)

## Scripts

```bash
npm start          # Run development (nodemon + ts-node)
npm run build      # Compile TypeScript (if build script exists)
```
