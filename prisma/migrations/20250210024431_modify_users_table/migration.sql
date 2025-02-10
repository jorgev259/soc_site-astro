-- DropForeignKey
ALTER TABLE `User_Role` DROP FOREIGN KEY `User_Role_ibfk_1`;

-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `albumHistories` DROP FOREIGN KEY `albumHistories_ibfk_1`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_ibfk_2`;

-- DropForeignKey
ALTER TABLE `forgors` DROP FOREIGN KEY `forgors_ibfk_1`;

-- DropForeignKey
ALTER TABLE `logs` DROP FOREIGN KEY `logs_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_ibfk_2`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `submissions` DROP FOREIGN KEY `submissions_ibfk_1`;

-- DropIndex
DROP INDEX `account_userId_fkey` ON `account`;

-- DropIndex
DROP INDEX `session_userId_fkey` ON `session`;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    RENAME COLUMN `username` TO `id`,
    ADD COLUMN `username` VARCHAR(255) NOT NULL,
    DROP COLUMN `password`,
    ADD COLUMN `emailVerified` BOOLEAN NOT NULL,
    ADD COLUMN `image` VARCHAR(255) NULL,
    ADD COLUMN `name` VARCHAR(20) NOT NULL,
    ADD PRIMARY KEY (`id`);

UPDATE `users` SET username=id;    
UPDATE `users` SET emailVerified=1;    

DELETE FROM `users` WHERE `email` in (
	SELECT `email` FROM (
		SELECT `email` FROM `users`
		GROUP BY `email`
		HAVING COUNT(*) > 1
	)  t
);

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);

SET FOREIGN_KEY_CHECKS=0;
-- AddForeignKey
ALTER TABLE `User_Role` ADD CONSTRAINT `User_Role_ibfk_1` FOREIGN KEY (`userUsername`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `albumHistories` ADD CONSTRAINT `albumHistories_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `forgors` ADD CONSTRAINT `forgors_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `submissions` ADD CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`userUsername`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;