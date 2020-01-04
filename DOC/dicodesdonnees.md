# Dictionnaire de données


## User (`user`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant d'un user|
|username| VARCHAR(64) | NOT NULL |Le pseudonyme de l'utilisateur|
|firstname| VARCHAR(64) | NOT NULL |Le prénom de l'utilisateur|
|lastname| VARCHAR(64) | NOT NULL |Le nom de l'utilisateur|
|email| VARCHAR(80) | NOT NULL, UNIQUE |L'email de l'utilisateur|
|password| VARCHAR(255) | NOT NULL|Le mot de passe encodé de l'utilisateur|
|role| VARCHAR(255) | NOT NULL|Le role de l'utilisateur (USER par défaut, il peut avoir plusieurs rôles)|
|status| INT | NOT NULL, UNSIGNED |Le statut (actif ou non) de l'utilisateur|
| created At | Datetime | NOT NULL | Date de création d'un utilisateur|
| updated At | Datetime | NULL | Date de mise à jour des données d'un utilisateur|


## Annonce (`annonce`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant d'un projet|
| title | varchar(200) | NOT NULL | Titre de l'annonce |
| type | varchar(10) | NOT NULL | Type d'annonce |
| description | TEXT | NOT NULL | Description de l'annonce |
| need | TEXT | NOT NULL | Description des besoins |
| Author_id | INT | NOT NULL, UNSIGNED | Id de l'auteur |
| category | INT | NOT NULL | numéro de la catégorie |
| location | VARCHAR(100) | NOT NULL | localisation (région) |
| picture | varchar(255) | NOT NULL | Image uploadé ou par défaut pour projet |
| phone | INT(10) | UNSIGNED | Téléphone de l'auteur |
| email | varchar(255) |  | Email de l'auteur |
| website | varchar(255) |  | Site internet de l'auteur |
| status | INT | NOT NULL, UNSIGNED |Le statut (actif ou non) de l'utilisateur|
| created At | Datetime | NOT NULL | Date de publication du projet |
| updated At | Datetime | NULL | Date de mise à jour des informations du projet |

## Category (`category`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant d'une catégorie|
| name | varchar(20) | NOT NULL | Le nom de la catégorie |
| created At | Datetime | NOT NULL | Date de création de la catégorie |
| updated At | Datetime | NULL | Date de mise à jour de la catégorie |

## Comment (`comment`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant d'une commentaire |
| Content | TEXT | NOT NULL | Le contenu du commentaire |
| created At | Datetime | NOT NULL | Date de création du commentaire |
| updated At | Datetime | NULL | Date de mise à jour du commentaire |
| author_id | INT | NOT NULL, UNSIGNED | l'id de l'auteur |
| ad_id | INT | NOT NULL, UNSIGNED | l'id de l'annonce sur laquelle est posté le commentaire |
| status | INT | NOT NULL, UNSIGNED | Le statut (actif ou non) du commentaire |

## Favorite (`favorite`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT| L'id de la relation |
| created At | Datetime | NOT NULL | Date de mise en favori |
| updated At | Datetime | NULL | Date de mise à jour du statut de favori |
| user_id | INT | NOT NULL, UNSIGNED | l'id de l'utilisateur |
| ad_id | INT | NOT NULL, UNSIGNED | l'id de l'annonce concernée |