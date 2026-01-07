# ppaw_back

Aplicație backend pentru convertorul de imagini.

## Cerințe de sistem

- **Node.js** (versiunea 18 sau mai nouă)
- **npm** (gestionar de pachete)
- **PostgreSQL** (versiunea 12 sau mai nouă)

## Pași pentru configurare și lansare

### 1. Clonare repository

```bash
git clone https://github.com/Arekuso-kun/ppaw_back.git
cd ppaw_back
```

### 2. Instalare dependințe

```bash
npm install
```

### 3. Configurare bază de date

Creați o bază de date PostgreSQL folosind **pgAdmin** sau linia de comandă:

**Varianta A - Folosind pgAdmin:**

1. Deschideți pgAdmin și conectați-vă la serverul PostgreSQL
2. Click dreapta pe "Databases" → "Create" → "Database"
3. Introduceți numele: `ppaw_db`
4. Click "Save"

**Varianta B - Folosind linia de comandă:**

```sql
CREATE DATABASE ppaw_db;
```

### 4. Configurare variabile de mediu

Creați un fișier `.env` în directorul rădăcină al proiectului și adăugați următoarea configurație:

```env
# Configurare bază de date (OBLIGATORIU)
DATABASE_URL="postgresql://postgres:parola@localhost:5432/ppaw_db?schema=public"

# Configurare email pentru notificări (OPȚIONAL)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_FROM=your-email@gmail.com
MAIL_TO=admin@example.com
```

**Note:**

- **DATABASE_URL** (obligatoriu): Înlocuiți `postgres`, `parola` și `ppaw_db` cu datele dumneavoastră PostgreSQL
- **Configurare email** (opțional): Necesară doar dacă doriți notificări prin email pentru erori
  - Pentru Gmail, trebuie să generați o parolă de aplicație (App Password) din setările contului Google
  - `MAIL_FROM` - adresa de email de la care se trimit notificările
  - `MAIL_TO` - adresa de email unde se primesc notificările de erori

### 5. Aplicare migrări bază de date

Rulați migrările pentru a crea structura bazei de date:

```bash
npx prisma migrate deploy
```

### 6. Populare date inițiale (opțional)

Pentru a adăuga date de test în baza de date:

```bash
npx prisma db seed
```

### 7. Lansare server

Pentru a porni serverul:

```bash
node app.js
```

Aplicația va fi disponibilă la adresa: `http://localhost:3000`

## Tehnologii utilizate

- **Node.js** - Runtime JavaScript
- **Express** 5.1.0 - Framework web
- **Prisma** 6.18.0 - ORM pentru PostgreSQL
- **PostgreSQL** - Bază de date relațională
- **Sharp** 0.34.5 - Procesare imagini
- **Winston** 3.19.0 - Sistem de logging
- **Nodemailer** 7.0.11 - Trimitere email-uri
