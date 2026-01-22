/*
  Warnings:

  - You are about to drop the column `createdAt` on the `publisher` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `publisher` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ratings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ratings` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `series` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `series` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `studio` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `studio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `publisher` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `ratings` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `series` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `studio` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
