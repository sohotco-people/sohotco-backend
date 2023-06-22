-- DropIndex
DROP INDEX `project_proposals_on_users_project_id_fkey` ON `project_proposals_on_users`;

-- AlterTable
ALTER TABLE `project_proposals_on_users` MODIFY `requestor_name` VARCHAR(191) NOT NULL,
    MODIFY `respondent_name` VARCHAR(191) NOT NULL;
