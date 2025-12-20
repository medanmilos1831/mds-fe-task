# Users Management Application

Modern web aplikacija za upravljanje korisnicima sa naprednim funkcionalnostima pretraživanja, filtriranja i sortiranja podataka.

## 📋 Sadržaj

- [Funkcionalnosti](#-funkcionalnosti)
- [Tehnologije](#-tehnologije)
- [Instalacija i pokretanje](#-instalacija-i-pokretanje)
- [Arhitektura projekta](#-arhitektura-projekta)
- [Struktura foldera](#-struktura-foldera)
- [Tehničke odluke](#-tehničke-odluke)
- [API integracija](#-api-integracija)

## ✨ Funkcionalnosti

### Prikaz podataka

- **Tabela korisnika** - prikaz svih korisnika sa svim relevantnim podacima (ime, prezime, email, država, uloga)
- **Responsive dizajn** - automatski prelazak između tabele (desktop) i kartica (mobile uređaji)
- **Avatar prikaz** - prikaz profilnih slika korisnika sa fallback opcijom

### Paginacija

- **Server-side paginacija** za optimalne performanse i skalabilnost
- Izbor broja stavki po stranici: **10, 25, 50**
- Navigacija između stranica sa jasnim indikatorima
- Prikaz ukupnog broja rezultata

### Filtriranje

- **Filter po državi** - dropdown lista sa svim dostupnim državama
- **Filter po ulozi** - dropdown lista sa svim dostupnim ulogama
- Automatsko resetovanje paginacije pri promeni filtera
- **Server-side filtriranje** za brzo pretraživanje velikih skupova podataka

### Sortiranje

- Sortiranje po **imenu, prezimenu, email-u**
- Sortiranje po **državi i ulozi**
- **Ascending/descending** redosled
- Vizuelna indikacija trenutnog sortiranja u tabeli

### Brisanje korisnika

- Dugme za brisanje na svakom redu tabele i kartici
- **Confirmation dialog** sa detaljima korisnika pre brisanja
- Fetch najnovijih podataka korisnika pre brisanja (optimistic updates)
- Success/error notifikacije nakon akcije
- Automatsko osvežavanje liste nakon uspešnog brisanja

### URL State Management

- **Svi parametri pretrage reflektovani u URL query string-u**
- Mogućnost **direktnog linkovanja** specifičnih prikaza
- **Očuvanje stanja** pri osvežavanju stranice
- Podrška za **browser back/forward** navigaciju
- Primer URL-a: `/?page=2&pageSize=25&role=Administrator&country=Serbia&sort=lastName&order=asc`

## 🛠 Tehnologije

### Core

- **React 19.2** - UI framework sa najnovijim features
- **TypeScript 5.9** - statička tipizacija za pouzdaniji kod
- **Vite 7.2** - ultra brz build tool i development server

### State Management

- **React Query (TanStack Query) 5.90** - server state management, caching i invalidation
- **React Router 6.30** - routing i URL state management
- **Custom Context Providers** - za query params i globalni state

### UI Library

- **Ant Design 6.1** - kompletna UI component library
- Responsive komponente out-of-the-box
- Built-in accessibility features
- Konzistentni dizajn sistem

### HTTP Client

- **Axios 1.13** - HTTP requests sa interceptorima
- Custom error handling
- Automatska transformacija response-a za paginaciju

### Additional Libraries

- **@med1802/scoped-observer** - observer pattern implementacija za event-driven komunikaciju

## 🚀 Instalacija i pokretanje

### Preduslovi

- **Node.js 16.x** ili viša verzija
- **npm** ili **yarn** package manager

### 1. Backend (JSON Server)

Prvo je potrebno pokrenuti backend JSON Server koji služi kao REST API.

```bash
# Pozicioniraj se u backend folder
cd mds_fe_users

# Instaliraj zavisnosti
npm install

# Pokreni server (automatski seed + start)
npm run start
```

Server će biti dostupan na **`http://localhost:3000`**

**Dostupni endpoint-i:**

- `GET /users` - lista korisnika (sa paginacijom, filterima, sortiranjem)
- `GET /users/:id` - pojedinačni korisnik
- `DELETE /users/:id` - brisanje korisnika
- `GET /countries` - lista država
- `GET /roles` - lista uloga

### 2. Frontend aplikacija

```bash
# Pozicioniraj se u frontend folder
cd mds-fe-users-app

# Instaliraj zavisnosti
npm install

# Pokreni development server
npm run dev
```

Aplikacija će biti dostupna na **`http://localhost:5173`**

## 🏗 Arhitektura projekta

Projekat koristi **slojevitu arhitekturu** sa jasnom separacijom odgovornosti (Separation of Concerns). Aplikacija je organizovana u četiri glavna sloja:

### 1. UI Components Layer (Prezentacioni sloj)

- **Komponente**: Pages, Components, Hooks
- **Odgovornost**:
  - Prezentaciona logika i rendering
  - Handling user interakcija
  - Prikaz podataka i UI state management
- **Primeri**: `UsersPage`, `UsersTable`, `Filters`, `UserCard`

### 2. Providers Layer (Context sloj)

- **Komponente**: QueryParamsProvider, QueryClientProvider
- **Odgovornost**:
  - Globalni state management kroz React Context
  - Deljenje funkcionalnosti kroz celu aplikaciju
  - Wrapping aplikacije sa potrebnim providerima
- **Primeri**: `QueryParamsProvider`, `createReactQuery`

### 3. Infrastructure Layer (Business logika sloj)

- **Komponente**: Repositories, Clients (Modal, QueryParams)
- **Odgovornost**:
  - Business logika i koordinacija
  - Dependency Injection container
  - Centralizovana konfiguracija svih servisa
- **Primeri**: `userRepository`, `modalClient`, `queryParamsClient`

### 4. Data Layer (Komunikacioni sloj)

- **Komponente**: Axios, Interceptors, Error Client
- **Odgovornost**:
  - HTTP komunikacija sa backend API-jem
  - Error handling i transformacija response-a
  - Request/response interceptors
- **Primeri**: `createAxios`, `requestInterceptor`, `responseInterceptor`

### Glavni principi

**1. Repository Pattern**

- Apstrakcija data access logike
- Lako testiranje i mock-ovanje
- Centralizovani API pozivi

**2. Infrastructure Layer**

- Dependency Injection container
- Centralizovana konfiguracija svih servisa
- Singleton pattern za globalne instance

**3. Observer Pattern**

- Event-driven komunikacija između komponenti
- Decoupling kroz publisher-subscriber model
- Koristi se za modal management

**4. Provider Pattern**

- Context API za deljenje state-a
- Izbegavanje prop drilling-a
- Type-safe pristup context-u

## 💡 Tehničke odluke

### 1. Repository Pattern

**Zašto:**

- **Separacija data access logike** od UI komponenti
- Lakše testiranje - mock-ujemo repositories umesto axios direktno
- Centralizovani API pozivi - jedna tačka promene
- Type-safe API contract

**Implementacija:**

```typescript
// repositories/user/user.repository.ts
const createUserRepository = (api: ApiClientType) => {
  return {
    getUsers: (params: any) => api.get<IResponseWithPagination<IUser>>(...),
    getUser: (id: number) => api.get<IUser>(...),
    removeUser: (id: number) => api.remove<void>(...)
  };
};
```

### 2. Infrastructure Layer (Dependency Injection)

**Zašto:**

- **Centralizovana konfiguracija** svih zavisnosti
- Singleton pattern - jedna instanca za sve komponente
- Lakše testiranje i zamena implementacija
- Jasna struktura zavisnosti

**Implementacija:**

```typescript
// infrastructure/index.ts
const createInfrastructure = () => {
  const httpClient = createAxios();
  const userRepository = createUserRepository(httpClient);
  const modalClient = createModalClient();

  return {
    userRepository,
    countryRepository,
    roleRepository,
    modalClient,
    createQueryParamsClient,
  };
};

export const infrastructure = createInfrastructure();
```

### 3. Query Params Client

**Zašto:**

- **URL kao source of truth** za state aplikacije
- Bookmarking i deljenje linkova sa filterima
- Browser back/forward podrška
- Server-side rendering ready

**Implementacija:**

- Automatska transformacija client → server query params
- Mapiranje `page` → `_page`, `pageSize` → `_limit`, itd.
- Reset paginacije pri promeni filtera
- Type-safe API

### 4. Observer Pattern za Modale

**Zašto:**

- **Decoupling** - komponente ne moraju znati jedna za drugu
- Event-driven komunikacija
- Centralizovano modal state management
- Lako dodavanje novih modala

**Implementacija:**

```typescript
// Otvaranje modala iz bilo koje komponente
modalClient.openModal({
  modalName: MODAL_NAMES.REMOVE_USER,
  data: user,
});

// Listening u modal komponenti
modalClient.subscribe(modalName, ({ open, data }) => {
  // Handle modal state
});
```

### 5. React Query za Server State

**Zašto:**

- **Automatic caching** - smanjuje broj API poziva
- Background refetching - uvek fresh data
- **Optimistic updates** - instant UI feedback
- Built-in loading i error states
- Cache invalidation strategije

**Key features korišćene:**

- `useQuery` za GET requests
- `useMutation` za DELETE requests
- `invalidateQueries` za cache refresh
- Dependency tracking sa query keys

### 6. Axios Interceptors

**Zašto:**

- **Centralizovana transformacija** response-a
- Automatsko parsiranje paginacije iz headera
- Konzistentno error handling
- Jedan konfiguracioni point

**Response interceptor:**

- Čita `X-Total-Count` header
- Pretvara response u `{ result, page, pageSize, total }` format
- Error responses transformiše u `{ message, status, code, data }`

### 7. TypeScript Path Alias (`@/`)

**Zašto:**

- Čitljiviji importi
- Lakše refactoring
- Nema relativnih putanja (`../../../`)

```typescript
// Umesto:
import { infrastructure } from "../../../infrastructure";

// Koristimo:
import { infrastructure } from "@/infrastructure";
```

### 8. Responsive Design Strategy

**Desktop (≥768px):**

- Table prikaz sa svim kolonama
- Inline sortiranje
- Pagination kontrole ispod tabele

**Mobile (<768px):**

- Card prikaz korisnika
- Touch-friendly dugmad
- Vertical layout
- Iste pagination kontrole

**Implementacija:**

```css
.mobile-view {
  display: block;
}
.desktop-view {
  display: none;
}

@media (min-width: 768px) {
  .mobile-view {
    display: none;
  }
  .desktop-view {
    display: block;
  }
}
```

## 🔌 API integracija

### Base URL

```
http://localhost:3000
```

### Endpoints korišćeni

#### 1. GET /users

Lista korisnika sa paginacijom, filterima i sortiranjem.

**Query parametri:**

- `_page` - broj stranice (npr. 1, 2, 3...)
- `_limit` - broj stavki po stranici (10, 25, 50)
- `role.name` - filter po ulozi (npr. "Administrator")
- `country.name` - filter po državi (npr. "Serbia")
- `_sort` - polje za sortiranje (npr. "lastName")
- `_order` - redosled sortiranja ("asc" ili "desc")

**Response:**

- Body: Array of users
- Headers: `X-Total-Count` - ukupan broj rezultata

**Primer:**

```
GET /users?_page=1&_limit=10&role.name=Administrator&_sort=lastName&_order=asc
```

#### 2. GET /users/:id

Detalji pojedinačnog korisnika.

**Koristi se:**

- Pre brisanja korisnika (fetch fresh data)
- Za prikaz u modal-u

#### 3. DELETE /users/:id

Brisanje korisnika.

**Response:**

- Status 200 - uspešno obrisano
- Status 404 - korisnik ne postoji

#### 4. GET /countries

Lista svih država (za filter dropdown).

#### 5. GET /roles

Lista svih uloga (za filter dropdown).

### Error Handling

Aplikacija hendluje sledeće HTTP status kodove:

| Status | Code                  | Message                                    |
| ------ | --------------------- | ------------------------------------------ |
| 400    | BAD_REQUEST           | Bad request                                |
| 401    | NOT_AUTHENTICATED     | You are not authenticated                  |
| 403    | NOT_AUTHORIZED        | You are not authorized to remove this user |
| 404    | USER_NOT_FOUND        | User not found                             |
| 500    | INTERNAL_SERVER_ERROR | Internal server error                      |
| 502    | BAD_GATEWAY           | Bad gateway                                |
| 503    | SERVICE_UNAVAILABLE   | Service unavailable                        |
| 504    | GATEWAY_TIMEOUT       | Gateway timeout                            |

Svi errori se prikazuju korisniku kroz **Ant Design notification** sistem.

## 📱 Responsive breakpoints

```css
Mobile: < 768px
Desktop: ≥ 768px
```

## 🎨 UI/UX Features

- **Loading states** - spinner tokom učitavanja podataka
- **Empty states** - poruka kada nema rezultata
- **Error notifications** - toast poruke za greške
- **Success notifications** - potvrda uspešnih akcija
- **Confirmation dialogs** - prevencija slučajnog brisanja
- **Visual feedback** - hover efekti, disabled states
- **Keyboard navigation** - accessibility support

## 📝 Best Practices implementirane

1. ✅ **TypeScript** - type safety kroz celu aplikaciju
2. ✅ **Separation of Concerns** - jasna podela odgovornosti
3. ✅ **DRY principle** - reusable komponente i hooks
4. ✅ **Single Responsibility** - svaka funkcija ima jednu odgovornost
5. ✅ **Error Boundaries** - graceful error handling
6. ✅ **Lazy Loading** - code splitting za bolje performanse
7. ✅ **Memoization** - React Query caching
8. ✅ **Custom Hooks** - reusable business logika
9. ✅ **Path Alias** - readable import paths

## 📄 License

Private project - no license.

---

**Autor:** Milos  
**Verzija:** 1.0.0  
**Datum:** 2025
