-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_1`;

-- DropForeignKey
ALTER TABLE `discs` DROP FOREIGN KEY `discs_ibfk_1`;

-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_ibfk_1`;

-- DropForeignKey
ALTER TABLE `links` DROP FOREIGN KEY `links_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_ibfk_1`;

-- DropIndex
DROP INDEX `ostId` ON `comments`;

-- DropIndex
DROP INDEX `discs_ibfk_1` ON `discs`;

-- DropIndex
DROP INDEX `favorites_ibfk_1` ON `favorites`;

-- DropIndex
DROP INDEX `links_ibfk_1` ON `links`;

-- DropIndex
DROP INDEX `ratings_ibfk_1` ON `ratings`;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `discs` ADD CONSTRAINT `discs_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `links` ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`downloadId`) REFERENCES `downloads`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
