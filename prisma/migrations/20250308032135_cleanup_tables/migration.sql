/*
  Warnings:

  - You are about to drop the column `createdAt` on the `artist` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `artist` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `discs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `discs` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `downloads` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `downloads` table. All the data in the column will be lost.
  - You are about to drop the `Album_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `availables` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Album_Type` DROP FOREIGN KEY `Album_Type_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Album_Type` DROP FOREIGN KEY `Album_Type_ibfk_2`;

-- DropForeignKey
ALTER TABLE `availables` DROP FOREIGN KEY `availables_ibfk_1`;

-- AlterTable
ALTER TABLE `artist` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `discs` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `downloads` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- DropTable
DROP TABLE `Album_Type`;

-- DropTable
DROP TABLE `availables`;

-- DropTable
DROP TABLE `type`;