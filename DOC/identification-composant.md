# Templates

- nav bar --> présentation 
    titre + liens changeant si user connecté ou non

- footer --> présentation (affiche simplement des liens)


# Pages générales

## Home

- Search bars --> container
    1 input list
    1 input text
    + 1 submit

- intro --> présentation

- carousel --> présentation ???

## Autres pages générales 

    --> pages de présentation (texte + images fixes)


# User Pages

## SignIn / SignUp

inputs + submit

-> doit communiquer avec la BDD 

## AdsList / Favorites

affichage des annonces postées/mises en favorites par l'user 

affiche des composants < Ad /> + bouton "modifier" pour les annonces postées

communique avec la BDD

--> composant de présentation ??? 

## NewAdForm

formulaire de soumission d'une annonce
input + submit
-> doit communiquer avec la BDD

## Settings 

formulaire de modification des données utilisateur
input + submit
-> doit communiquer avec la BDD

# Search Pages

## Ad 

composant de présentation (affiche des données en fonction de l'id)

## Results

### ResultApp

    - search bars (voir Home)
    - toggle
    - map ou list
--> présentation

### List

Doit afficher des miniatures d'annonces avec image + titre en fonction de leur localisation et/ou catégorie
--> présentation

### Map

Doit afficher une carte avec des marqueurs pour les annonces correspondant à la recherche
Au clic sur un marqueur on affiche la miniature
Au clic sur la miniature on affiche l'annonce
--> ???