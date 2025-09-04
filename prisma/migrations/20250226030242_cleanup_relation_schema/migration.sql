/*
  - Made the column `albumId` on table `discs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `albumId` on table `downloads` required. This step will fail if there are existing NULL values in that column.
  - Made the column `albumId` on table `favorites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `albumId` on table `linkCategories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `downloadId` on table `links` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score` on table `ratings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `albumId` on table `ratings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `ratings` required. This step will fail if there are existing NULL values in that column.
*/

SET FOREIGN_KEY_CHECKS = 0;

-- DropForeignKey
ALTER TABLE `animation` DROP FOREIGN KEY `animation_ibfk_1`;

-- DropForeignKey
ALTER TABLE `discs` DROP FOREIGN KEY `discs_ibfk_1`;

-- DropForeignKey
ALTER TABLE `downloads` DROP FOREIGN KEY `downloads_ibfk_1`;

-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_ibfk_1`;

-- DropForeignKey
ALTER TABLE `linkCategories` DROP FOREIGN KEY `linkCategories_ibfk_1`;

-- DropForeignKey
ALTER TABLE `links` DROP FOREIGN KEY `links_ibfk_1`;

-- DropForeignKey
ALTER TABLE `logs` DROP FOREIGN KEY `logs_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_ibfk_2`;

-- DropIndex
DROP INDEX `studioSlug` ON `animation`;

-- DropIndex
DROP INDEX `ostId` ON `discs`;

-- DropIndex
DROP INDEX `ostId` ON `downloads`;

-- DropIndex
DROP INDEX `ostId` ON `favorites`;

-- DropIndex
DROP INDEX `ostId` ON `linkCategories`;

-- DropIndex
DROP INDEX `downloadId` ON `links`;

-- DropIndex
DROP INDEX `username` ON `logs`;

-- DropIndex
DROP INDEX `ostId` ON `ratings`;

-- DropIndex
DROP INDEX `username` ON `ratings`;

-- AlterTable
ALTER TABLE `Album_Animation` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Album_Artist` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Album_Category` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Album_Classification` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Album_Game` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Album_Platform` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Album_Type` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Game_Platform` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Publisher_Game` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Series_Game` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Studio_Animation` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `User_Role` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
DELETE FROM `discs` WHERE `albumId` IS NULL;
ALTER TABLE `discs` MODIFY `albumId` INTEGER NOT NULL;

-- AlterTable
DELETE FROM `downloads` WHERE `albumId` IS NULL;
ALTER TABLE `downloads` MODIFY `albumId` INTEGER NOT NULL;

-- AlterTable
DELETE FROM `favorites` WHERE `albumId` IS NULL;
ALTER TABLE `favorites` MODIFY `albumId` INTEGER NOT NULL;

-- AlterTable
DELETE FROM `linkCategories` WHERE `albumId` IS NULL;
ALTER TABLE `linkCategories` MODIFY `albumId` INTEGER NOT NULL;

-- AlterTable
DELETE FROM `links` WHERE `downloadId` IS NULL;
ALTER TABLE `links` MODIFY `downloadId` INTEGER NOT NULL;

-- AlterTable
DELETE FROM `ratings` 
    WHERE `score` IS NULL 
    OR `albumId` IS NULL 
    OR `username` IS NULL;
ALTER TABLE `ratings`
    MODIFY `score` INTEGER NOT NULL,
    MODIFY `albumId` INTEGER NOT NULL,
    MODIFY `username` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `related_album` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `type`
    DROP COLUMN `updatedAt`,
    DROP COLUMN `createdAt`,
    MODIFY `name` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `SequelizeMeta`;

-- AddForeignKey
ALTER TABLE `discs` ADD CONSTRAINT `discs_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `downloads` ADD CONSTRAINT `downloads_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `linkCategories` ADD CONSTRAINT `linkCategories_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `links` ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`downloadId`) REFERENCES `downloads`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;