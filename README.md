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
###**Varianta de instalare Doker-izata**

```bash
```

---

