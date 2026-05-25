/*
  Warnings:

  - You are about to drop the column `name` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `stockQuantity` on the `offers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "offers" DROP COLUMN "name",
DROP COLUMN "stockQuantity";
