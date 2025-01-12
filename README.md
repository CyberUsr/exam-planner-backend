Pașii pentru instalarea și rularea proiectului `exam-planner-backend` din GitHub:

---

### 1. **Clonează Repozitoriul**
Descarcă codul sursă local, utilizând următoarea comandă:  
```bash
git clone https://github.com/CyberUsr/exam-planner-backend.git
cd exam-planner-backend
```

---

### 2. **Instalează Dependențele**
Asigură-te că ai instalat [Node.js](https://nodejs.org/). După aceea, instalează pachetele necesare:  
```bash
npm install
```

---

### 3. **Configurează Variabilele de Mediu**
Creează un fișier `.env` în directorul principal și adaugă variabilele de mediu necesare.Mai jos este un exemplu:
```bash
POSTGRES_USER=exemplu_nickname
POSTGRES_PASSWORD=exemplu_parola
POSTGRES_DB=exemplu_db
POSTGRES_PORT=(ce_port_sa_folosesti)
DATABASE_URL=url-ul_ce_contine_baza_de_date

   ```
---

### 4. **Configurează Baza de Date**
Acest proiect folosește [Prisma](https://www.prisma.io/) pentru gestionarea bazei de date.  
1. Asigură-te că baza de date este configurată corect și funcționează.  
2. Generează clientul Prisma și aplică migrațiile:  
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```
3.Se instaleaza aplicatia [Doker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) si se lanseaza comanda
```bash
  docker compose up
   ```
4.Daca se doreste verificarea datelor din baza de date se aplica comanda de mai jos sau se instaleaza un program de gestiune a bazelor de date de ex [TablePlus](https://tableplus.com/download/).
  ```bash
   npx prisma studio
   ```
---

### 5. **Pornește Aplicația**
Lansează serverul de dezvoltare utilizând comanda:  
```bash
npm run start:dev
```
Backend-ul ar trebui să ruleze acum, de obicei pe `http://localhost:3000`.

---

### 6. **Testează Aplicația**
Pentru a rula testele și a verifica dacă totul funcționează corect:  
```bash
npm run test
```

---

### **7. Back up Baza de date**
In cazul in care se doreste sa se faca un back up bazei de date se poate utiliza un program de gestiune a db-urilor.
Pentru acest proiect s-a folosit TablePlus iar pasii pentru realizare back up-ului se pot gasii in acest [site](https://tableplus.com/blog/2018/08/postgresql-how-to-backup-and-restore-database.html).

---


---
###**Varianta de instalare Doker-izata**

Iată cum poți configura și instala aplicația folosind **Docker Compose** și **Tailscale**, conform informațiilor oferite:

---

### **1. Instalează Docker și Docker Compose**
Asigură-te că ai instalat [Docker](https://docs.docker.com/get-docker/) și [Docker Compose](https://docs.docker.com/compose/install/) pe mașina ta.

---

### **2. Instalează și Configurează Tailscale**
1. Urmează pașii pentru instalarea Tailscale:
   - **Linux**:
     ```bash
     curl -fsSL https://tailscale.com/install.sh | sh
     ```
   - **Windows/MacOS**: Descarcă aplicația din [pagina oficială Tailscale](https://tailscale.com/download).

2. Conectează-te la rețeaua Tailscale:
   ```bash
   tailscale up
   ```
   După autentificare, vei obține o adresă IP din rețeaua Tailscale (de exemplu, `100.x.x.x`).

---

### **3. Configurarea Backend-ului**

#### **3.1 Creează un fișier `.env` pentru variabilele de mediu**
Creează un fișier `.env` în directorul principal al proiectului backend (`exam-planner-backend`) cu următorul conținut:  

```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=exam_planner
DATABASE_URL=postgresql://admin:admin123@postgres:5432/exam_planner
TAILSCALE_IP=100.x.x.x  # Adresa IP Tailscale alocată
```

---

#### **3.2 Configurare `Dockerfile` pentru backend**
Asigură-te că `Dockerfile` din directorul `exam-planner-backend` este configurat corect. Fișierul tău ar trebui să arate astfel:

```dockerfile
FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g @nestjs/cli
COPY . .
EXPOSE 3003
CMD ["npm", "run", "start:dev"]
```

---

#### **3.3 Configurare `docker-compose.yml` pentru backend**
Utilizează următorul conținut pentru `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    container_name: exam-planner-backend
    build:
      context: ./exam-planner-backend
    environment:
      - DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      - TAILSCALE_IP=${TAILSCALE_IP}
    ports:
      - 3003:3003
    depends_on:
      - postgres
    networks:
      - exam-planner

  redis:
    container_name: exam-planner-redis
    image: redis
    ports:
      - 6378:6379
    volumes:
      - redis-examplanner-data:/data
    networks:
      - exam-planner
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      retries: 3
      timeout: 5s

  postgres:
    container_name: exam-planner-db
    image: postgres
    ports:
      - 5444:5432
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres-examplanner-data:/var/lib/postgresql/data
    networks:
      - exam-planner

  tailscale:
    container_name: tailscale
    image: tailscale/tailscale:latest
    privileged: true
    network_mode: "host"
    volumes:
      - /var/lib/tailscale:/var/lib/tailscale
    command: tailscaled
    restart: always

networks:
  exam-planner:
    driver: bridge

volumes:
  redis-examplanner-data:
    driver: local
  postgres-examplanner-data:
    driver: local
```

---

### **4. Configurarea Frontend-ului**

#### **4.1 Configurare `docker-compose-frontend.yml`**
Utilizează acest fișier pentru partea de frontend:

```yaml
version: "3.8"

services:
  frontend:
    container_name: exam-planner-frontend
    build:
      context: ./exam-planner-frontend
    ports:
      - "3000:3000" # Map container port 3000 to host port 3000
    networks:
      - exam-planner-frontend
    environment:
      - NODE_ENV=development # Set development environment
    command: npm run dev # Run the Next.js development server

networks:
  exam-planner-frontend:
    driver: bridge
```

---

### **5. Pornește Containerele**
1. În directorul `exam-planner-backend`, pornește backend-ul:
   ```bash
   docker-compose up -d
   ```

2. În directorul `exam-planner-frontend`, pornește frontend-ul:
   ```bash
   docker-compose -f docker-compose-frontend.yml up -d
   ```

---

### **6. Accesul prin Tailscale**
Pentru a accesa aplicația prin Tailscale:
- Frontend: `http://<TAILSCALE_IP>:3000`
- Backend: `http://<TAILSCALE_IP>:3003`

---


---

