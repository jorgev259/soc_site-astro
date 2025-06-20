/*
  Warnings:

  - You are about to drop the column `user` on the `requests` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `roles` table. All the data in the column will be lost.
  - Made the column `userID` on table `requests` required. This step will fail if there are existing NULL values in that column.

*/

DELETE FROM `requests` WHERE `userId` IS NULL;

-- AlterTable
ALTER TABLE `requests` DROP COLUMN `user`,
    MODIFY `userID` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
