SET FOREIGN_KEY_CHECKS = 0;

-- DropForeignKey
ALTER TABLE `logs` DROP FOREIGN KEY `logs_ibfk_1`;

-- DropIndex
DROP INDEX `logs_ibfk_1` ON `logs`;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;