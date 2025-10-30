/*
  Warnings:

  - You are about to drop the column `stripeInvoiceId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `stripeId` on the `Subscription` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "MikrotikDevice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "mac" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "port" INTEGER NOT NULL DEFAULT 8728,
    "status" TEXT NOT NULL DEFAULT 'offline',
    "model" TEXT,
    "version" TEXT,
    "uptime" TEXT,
    "cpu" REAL,
    "memory" REAL,
    "interfaces" INTEGER,
    "lastSeen" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subscriptionId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "paidAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Invoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("amount", "createdAt", "dueDate", "id", "paidAt", "status", "subscriptionId") SELECT "amount", "createdAt", "dueDate", "id", "paidAt", "status", "subscriptionId" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE TABLE "new_Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "planName" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Subscription" ("createdAt", "id", "planName", "price", "status", "updatedAt", "userId") SELECT "createdAt", "id", "planName", "price", "status", "updatedAt", "userId" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
