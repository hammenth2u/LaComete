---------------------------------------------------------------------------------------------------------
##Mocodo

USER: username, email, password, birthday, avatar, role, created_at, updated_at
create, 11 ANNONCE, 0N USER
:

commentate, 11 COMMENT, 0N USER
ANNONCE: type, title, description, picture, location, created_at, updated_at
have, 1N CATEGORY, 1N ANNONCE

COMMENT: content, created_at, updated_at
reply , 0N ANNONCE, 11 COMMENT
CATEGORY: name, created_at, updated_at

---------------------------------------------------------------------------------------------------------

##Relations

Un PROJECT peut être associé un 1 seul USER 
Un USER peut être associé à 0 ou plusieurs PROJECT
PROJECT -- 11 --- df --- 0N -- USER
NB: (pour symfo en partant de PROJECT (1N)-> ManyToOne
USER (N1)->OneToMany)

Un COMMENT peut être associé à un seul USER
Un USER peut être associé à 0 ou plusieurs COMMENT
COMMENT -- 11 --- df --- 0N -- USER
NB: (pour symfo en partant de COMMENT (1N)-> ManyToOne
USER (N1)->OneToMany)

Une CATEGORY peut être associé à 1 ou plusieurs PROJECT
Un PROJECT peut avoir 1 ou plusieurs CATEGORY
PROJECT -- 1N --- df --- 1N -- CATEGORY
NB: (pour symfo en partant de PROJECT ou CATEGORY (NN) ->ManyToMany)

Un PROJECT peut avoir 0 ou plusieurs COMMENT
Un COMMENT est associé à un seul PROJECT
PROJECT -- 0N --- df --- 11 -- COMMENT
NB: (pour symfo en partant de COMMENT (1N)-> ManyToOne
PROJECT (N1)->OneToMany)

