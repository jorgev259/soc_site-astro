/*
  Warnings:

  - You are about to drop the `albumHistories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `albumHistories` DROP FOREIGN KEY `albumHistories_ibfk_1`;

-- DropForeignKey
ALTER TABLE `albumHistories` DROP FOREIGN KEY `albumHistories_ibfk_2`;

-- DropTable
DROP TABLE `albumHistories`;
