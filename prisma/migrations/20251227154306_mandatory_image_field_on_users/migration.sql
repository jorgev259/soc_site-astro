/*
  Warnings:

  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - Made the column `image` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `linkCategories` DROP FOREIGN KEY `linkCategories_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_ibfk_2`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `session_userId_fkey`;

-- DropIndex
DROP INDEX `account_userId_fkey` ON `account`;

-- DropIndex
DROP INDEX `linkCategories_ibfk_1` ON `linkCategories`;

-- DropIndex
DROP INDEX `ratings_ibfk_2` ON `ratings`;

-- DropIndex
DROP INDEX `session_userId_fkey` ON `session`;

-- AlterTable
ALTER TABLE `users` MODIFY `image` VARCHAR(255) NOT NULL,
    MODIFY `displayUsername` VARCHAR(191) NULL,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- AddForeignKey
ALTER TABLE `linkCategories` ADD CONSTRAINT `linkCategories_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
