/*
  Warnings:

  - The primary key for the `project_proposals_on_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `project_proposals_on_users` table. All the data in the column will be lost.
  - Added the required column `id` to the `project_proposals_on_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestor_id` to the `project_proposals_on_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestor_name` to the `project_proposals_on_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `respondent_id` to the `project_proposals_on_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `respondent_name` to the `project_proposals_on_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `project_proposals_on_users` DROP FOREIGN KEY `project_proposals_on_users_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `project_proposals_on_users` DROP FOREIGN KEY `project_proposals_on_users_user_id_fkey`;

-- AlterTable
ALTER TABLE `project_proposals_on_users` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `requestor_id` INTEGER NOT NULL,
    ADD COLUMN `requestor_name` INTEGER NOT NULL,
    ADD COLUMN `respondent_id` INTEGER NOT NULL,
    ADD COLUMN `respondent_name` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);
