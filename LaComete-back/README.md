/api/test:
    -méthode test qui retourne du json { "data": 123 }

/api/annonces:
    -méthode qui retourne toutes les annonces triées par ordre de crétion (createdAt) en json

/api/annonces/1/show:
    -méthode qui retoure (pour l'instant) tous les commentaires de l'annonce à l'id 1 en json et aussi les commentaires sont triées par ordre de création 