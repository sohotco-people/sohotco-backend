/*
  Warnings:

  - You are about to drop the `position_on_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `position_on_users` DROP FOREIGN KEY `position_on_users_position_id_fkey`;

-- DropForeignKey
ALTER TABLE `position_on_users` DROP FOREIGN KEY `position_on_users_user_id_fkey`;

-- DropTable
DROP TABLE `position_on_users`;

-- CreateTable
CREATE TABLE `positions_on_users` (
    `user_id` INTEGER NOT NULL,
    `position_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `position_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `positions_on_users` ADD CONSTRAINT `positions_on_users_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `positions_on_users` ADD CONSTRAINT `positions_on_users_position_id_fkey` FOREIGN KEY (`position_id`) REFERENCES `position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
