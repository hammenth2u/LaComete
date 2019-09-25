# Routes

| URL | Méthode HTTP | Controller | Méthode | Titre | Contenu | Commentaire |
|--|--|--|--|--|--|--|
| `/`| GET | MainController | home | La Comete | -- | Page d'Accueil|
| `/mentions-legales` | GET | MainController | legalMentions | Mentions Légales | Paragraphes sur les mentions légales | -- |
| `/contact` | GET | MainController | contact | Contact | Formulaire de contact |--|
| `/cdu` | GET | MainController | conditions | Condition générale d'utilisation | Paragraphe sur les conditions générales d'utilisation |--|
| `/a-propos` | GET | MainController | about | A Propos | Paragraphes à propos | -- |
|`/connexion`|POST|UserController|signinPost| - |traitement du formulaire de connexion|--|
|`/inscription`|GET|UserController|signup|Inscription|formulaire d'inscription|--|
|`/inscription`|POST|UserController|signupPost| - |traitement du formulaire d'inscription|--|
| `/deconnexion` |POST|UserController|logout| - | traitement de la déconnexion de l'utilisateur|--|
| `/mon-compte` | GET | UserController | userGet | Mon Compte | profil utilisateur avec modification d'informations | -- |
|`/parametres`|GET|UserController|settings|Mes Paramètres|formulaire avec les champs pré-remplis des paramètres du compte  + boutton enregistrer|--|
|`/parametres/edit`|POST|UserController|settingsUpdate| - | traitement du formulaire pour|--|
| `/mon-compte/mes-annonces` | GET | AdController | dreams | Mes Annonces | liste des rêves en ligne | -- |
| `/mon-compte/mes-annonces/{id}` | GET | AdController | adGet | [titre annonce] | contenu de l'annonce | -- |
| `/mon-compte/mes-annonces/{id}` | POST | AdController | adPost | [titre annonce] | possibilité de modifier le contenu de l'annonce | -- |
|`/mon-compte/mes-annonces/{id}/delete`|POST|AdController|missionDelete| - | - | supprime une mission à un id précis|
|`/mon-compte/mes-annonces/{id}/update`|POST|AdController|missionUpdate| - | - | modifie une mission à un id précis|
|`/ajouter/commentaire`|POST|CommentController|newComment| - | traitement de l'ajout d'un commentaire à l'annonce|--|
|`/annonce/a-ajouter`|GET|PostController|newAd| - | affichage du formulaire pour ajouter une annonce|--|
|`/ajouter/annonce`|Post|PostController|newAdPost| - | traitement de l'ajout d'un commentaire à l'annonce|--|
| `/resultats/?{categorie=category}&{location=location-coordonnées}&{format=format}` | SearchController | search | Résultats | résultats de recherche | récupération en GET de la catégorie, la localisation et le style d'affichage (carte ou liste) |
| `/resultats/{annonce-title}` | SearchController | searchAdvertisement | [titre/nom] | page Mission/Profil | page dédiée pour chaque annonce |

| `/favoris`| GET | FavoriteController | listFavorite | Mes Favoris | listing des favoris |--|
| `/favoris/{id}/delete`| POST | FavoriteController | deleteFavorite | - | listing des favoris |--|





##En étant visiteur
Accès à:
- /
- /mentions-legales
- /a-propos
- /contact
- /cdu
- /connexion (en get et post)
- /inscription (en get et post)
- /annonces/[titre] (sans le formulaire pour ajouter un com)


##En étant user
Les routes de visiteurs ++ :
- /deconnexion
- /annonces/[titre] (avec le formulaire pour ajouter un com)
- /mon-compte (avec toutes les infos du compte et un boutton pour modifier son profil) => tu arrives en cliquant sur le boutton sur la route /parametres
- /parametres (acces aux formulaire pour enregistrer les nouvelles données si clic sur enregistrer alors => /parametres/update)
- /parametres/update => traitement des modifications des paramètres du compte
- /missions => affiche la liste des missions proposées par un utilisateur (les siennes qu'il a créé) + il à accés à une petite croix (boutton de suppression) pour supprimer une mission à lui. Et un autre boutton édit pour modifier sa mission (si les besoins de la mission on changés où bien qu'il s'aperçoit qu'il a fait des erreurs)
- /missions/{id}/delete supprime une mission => si on clic sur la crois on supprime directement en avec cette route
- /missions/{id}/update modifie une mission => si on clic sur edit on arrive avant sur un formulaire pour modifier notre mission et seulement quand on clic sur enregistrer les modifications qu'on arrive à cette route
- /missions/{id}/modifs => route en GET avec formulaire pré-rempli de l'annonce précedante et avec toutes les informations
- /ajouter/commentaire => à la soumission du formulaire va ajouter le commentaire à une annonce précise, stockage du com en BDD lié à l'annonce et à l'utilisateur qui a posté le commentaire


##En étant admin
Les routes visiteurs + user classique ++:
- /admin/annonces/{id}/block => l'admin pourra à côté de chaque annonce avec un boutton pour bloquer une annonce ssi admin => dans la méthode changement de status à 0. Les annonces qui seront visibles par les autres utilisateurs auront un status à 1
- /admin/commentaires/ {id}/block => idem mes pour les commentaires. L'admin peut bloquer des commentaires.
=> 2 routes en  POST dans AdminController commentBlock et annonceBlock sont les méthodes de Controller

