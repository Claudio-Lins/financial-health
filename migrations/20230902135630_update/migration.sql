/*
  Warnings:

  - You are about to drop the column `bankAccount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `entity` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `receipt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recurring` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "bankAccount",
DROP COLUMN "entity",
DROP COLUMN "location",
DROP COLUMN "notes",
DROP COLUMN "paymentMethod",
DROP COLUMN "receipt",
DROP COLUMN "recurring";
