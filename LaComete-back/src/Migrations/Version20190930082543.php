<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190930082543 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE annonce_category');
        $this->addSql('ALTER TABLE comment ADD status TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE annonce ADD category_id INT DEFAULT NULL, ADD status TINYINT(1) NOT NULL, ADD date_renew DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE annonce ADD CONSTRAINT FK_F65593E512469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('CREATE INDEX IDX_F65593E512469DE2 ON annonce (category_id)');
        $this->addSql('ALTER TABLE favorite DROP title');
        $this->addSql('ALTER TABLE user ADD firstname VARCHAR(100) NOT NULL, ADD lastname VARCHAR(100) NOT NULL, ADD status TINYINT(1) NOT NULL, ADD phone VARCHAR(20) DEFAULT NULL, ADD city VARCHAR(100) NOT NULL, ADD adress VARCHAR(255) NOT NULL, ADD postal_code VARCHAR(10) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE annonce_category (annonce_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_4B0417038805AB2F (annonce_id), INDEX IDX_4B04170312469DE2 (category_id), PRIMARY KEY(annonce_id, category_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE annonce_category ADD CONSTRAINT FK_4B04170312469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE annonce_category ADD CONSTRAINT FK_4B0417038805AB2F FOREIGN KEY (annonce_id) REFERENCES annonce (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE annonce DROP FOREIGN KEY FK_F65593E512469DE2');
        $this->addSql('DROP INDEX IDX_F65593E512469DE2 ON annonce');
        $this->addSql('ALTER TABLE annonce DROP category_id, DROP status, DROP date_renew');
        $this->addSql('ALTER TABLE comment DROP status');
        $this->addSql('ALTER TABLE favorite ADD title VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE user DROP firstname, DROP lastname, DROP status, DROP phone, DROP city, DROP adress, DROP postal_code');
    }
}
