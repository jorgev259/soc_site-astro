/*
  Warnings:

  - You are about to alter the column `state` on the `requests` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `requests` MODIFY `state` ENUM('complete', 'hold', 'pending') NOT NULL;
