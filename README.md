# 🚁 UAS Mission Control API

Backend system for managing drones (UAS), telemetry data, and real-time alert generation.

## Built with
- NestJS
- Prisma ORM
- PostgreSQL

---

## Overview

This project simulates a drone monitoring system where:

- Drones send telemetry data like location, speed, altitude
- The system stores telemetry history
- Alerts are automatically generated based on rules
- A script that mimics drone behavior

---

## Database (v1) concept

```
### Drone - Generic management
 
model Drone {
  id        String   @id @default(uuid())
  name      String
  status    String
  lastSeen  DateTime
  createdAt DateTime @default(now())

  telemetry Telemetry[]
  alerts    Alert[]
}

### Telemetry - data ingestion & processing

model Telemetry {
  id        String   @id @default(uuid())
  droneId   String
  lat       Float
  lng       Float
  speed     Float
  altitude  Float?
  createdAt DateTime @default(now())

  drone Drone @relation(fields: [droneId], references: [id])
}

### Alert - alert creation & querying  

model Alert {
  id        String   @id @default(uuid())
  droneId   String
  type      AlertType
  message   String
  severity  AlertSeverity
  createdAt DateTime @default(now())

  drone Drone @relation(fields: [droneId], references: [id])
}
```

---

## Data Flow

1. Drone sends telemetry → `POST /drones/:id/telemetry`  
2. Telemetry is stored (Telemetry data is directly attached to a drone)
3. Drone status is updated (ONLINE + lastSeen)  
4. Alerts are created automatically upon rule validation

---

## Alert Rules (V1)

- Speed > 80 → **HIGH alert**
- Speed < 5 → **MEDIUM alert**
- Altitude > 500 → **MEDIUM alert**
- Altitude < 100 → **HIGH alert**

1. These values are purely representative.

---

## API Routes

```
### Drones

GET    /drones
GET    /drones/:id
POST   /drones
PATCH  /drones/:id
DELETE /drones/:id


### Telemetry

POST   /drones/:id/telemetry
GET    /drones/:id/telemetry


### Alerts

GET    /alerts
GET    /alerts/:id
GET    /alerts/drone/:id
```

---

## Simulator

A js script which core concept is to:

- Fetch a drone by ID
- Initializes variables like speed, longigute, latitude and altitude
- Speed increases from 0 → 100 by 5 units per cycle (loop)  
- Lat/Lng randomized slightly  
- Altitude randomized  
- Posts to telemetry every 5 seconds

---

## Design Decisions for this version

### 1. Alerts 

- Generated automatically  
- Triggered by telemetry events  
- Event driven approach

---

### 2. Applied Separation of Concerns Pattern

**Before Alerts Module:**
```
Telemetry → Prisma → Alert
```

**After Alert Module:**
```
Telemetry → AlertsService → Prisma
```

### Prisma

Decided to adopt Prisma V7 ORM, which requires an adapter in order to connect to database. This is requires a different configuration than lts versions which are based on older architectures. 

---

## Setup

```
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

---

## "Testing"

1. Create a drone (just a name will do)
2. Grab uuid and paste it into the simulator
3. Run simulator "node scripts/simulator.js"

Check telemetry:
```
GET /drones/:id/telemetry
```

Check alerts:
```
GET /alerts/drone/:id
```

---

## Future Improvements (V2)

### Core Features
- Missions system  
- Drone health monitoring   
- Simulator reviews for like multi-drone support and end loop (fix) as it needs to be stopped manually at current time (v1). 
- Real time events with maybe websockets, emmitters or streaming updates(?)
- JWT authentication with role based access (admin/operator)
- A frontend interface
- Tests (E2E) 
- CI/CD pipeline explorarion

---

## 👨‍💻 Author

João Rebelo

---