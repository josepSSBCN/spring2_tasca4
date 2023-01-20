// QUERY 1: Escriu una consulta per mostrar tots els documents en la col·lecció Restaurants.
db.NovaYork.find();

// QUERY 2: Escriu una consulta per mostrar el restaurant_id, name, borough i cuisine per tots els documents en la col·lecció Restaurants.
db.NovaYork.find({}, {_id : 0, address: 0, grades: 0});

//QUERY 3: Escriu una consulta per mostrar el restaurant_id, name, borough i cuisine, però exclou el camp _id per tots els documents en la col·lecció Restaurants.
db.NovaYork.find({}, {_id : 0, address: 0, grades: 0});

//QUERY 4: Escriu una consulta per mostrar restaurant_id, name, borough i zip code, però exclou el camp _id per tots els documents en la col·lecció Restaurants.
db.NovaYork.find({}, {_id:0, grades : 0, cuisine: 0, "address.street": 0, "address.building":0, "address.coord":0});

//QUERY 5: Escriu una consulta per mostrar tots els restaurants que estan en el Bronx.
db.NovaYork.find({borough: 'Bronx'});

// QUERY 6: Escriu una consulta per mostrar els primers 5 restaurants que estan en el Bronx.
db.NovaYork.find({borough: 'Bronx'}).limit(5);
db.NovaYork.aggregate([{$match : {"borough":"Bronx"}},{$limit : 5}]);

// QUERY 7: Escriu una consulta per mostrar el pròxim 5 restaurants després de saltar els primers 5 del Bronx.
db.NovaYork.find({borough: 'Bronx'}).skip(5).limit(5);
db.NovaYork.aggregate([
  {$match : {"borough":"Bronx"}},
  {$skip : 5},
  {$limit : 5}
  ]);

// QUERY 8: Escriu una consulta per trobar els restaurants que tenen un score de més de 90.
db.NovaYork.find({"$expr":{$gt:[{"$sum":"$grades.score"},90]}},{totalScore:{"$sum":"$grades.score"}});

// QUERY 9: Escriu una consulta per trobar els restaurants que tenen un score de més de 80 però menys que 100.
db.NovaYork.find({"grades.score" : {$gt:90, $lt:100}});
db.NovaYork.find({$expr:{$and:[{$gt:[{$sum:"$grades.score"},90]},{$gt:[100,{$sum:"$grades.score"}]}]}},{totalScore:{"$sum":"$grades.score"}});

// QUERY 10: Escriu una consulta per trobar els restaurants que es localitzen en valor de latitud menys de -95.754168.
db.NovaYork.find({"address.coord.0" : {$lt:-95.754168}});

/* QUERY 11: Escriu una consulta de MongoDB per a trobar els restaurants que no preparen cap cuisine de 'American' i la seva 
qualificació és superior a 70 i longitud inferior a -65.754168. */
db.NovaYork.find({$and:[{"cuisine":{$not: /American/}}, {$expr:{$gt:[{$sum:"$grades.score"},70]}}, {"address.coord.0" : {$lt:-65.754168}}]});

/* QUERY 12: Escriu una consulta per trobar els restaurants que no preparen cap cuisine de 'American' i van aconseguir 
 un marcador més de 70 i localitzat en la longitud menys que -65.754168. Nota: Fes aquesta consulta sense utilitzar 
 $and operador.*/
db.NovaYork.find({"address.coord.0" : {$lt:-65.754168}, "cuisine":{$not: /American/}, $expr:{$gt:[{$sum:"$grades.score"},70]}});

/* QUERY 13: Escriu una consulta per trobar els restaurants que no preparen cap cuisine de 'American' i van obtenir un punt 
de grau 'A' no pertany a Brooklyn. S'ha de mostrar el document segons la cuisine en ordre descendent.*/
db.NovaYork.find({$and:[{"cuisine":{$not: /American/}}, {"grades.grade":"A"}, {"grades.score":{$gt:70}}, {"borough": {$ne: "Brooklyn"}}]}).sort({"cuisine":1});

/* QUERY 14: Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'Wil' com les tres primeres
 lletres en el seu nom.*/
db.NovaYork.find({"name":{$not:{$regex: /^Wil.*/}}},{address:0, grades:0, _id:0});

/* QUERY 15: Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'ces' com les últimes tres 
lletres en el seu nom.*/
db.NovaYork.find({"name":{$not:{$regex: /ces$/}}},{address:0, grades:0, _id:0});

/* QUERY 16: Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'Reg' com tres lletres 
en algun lloc en el seu nom.*/
db.NovaYork.find({"name":{$regex: /Reg/}},{address:0, grades:0, _id:0});

/* QUERY 17: Escriu una consulta per trobar els restaurants que pertanyen al Bronx i van preparar qualsevol plat americà o xinès.*/
db.NovaYork.find({$or:[{"cuisine":{$regex: /American/}},{"cuisine":{$regex: /Chinese/}}]});

/* QUERY 18: Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que pertanyen a Staten Island o Queens 
o Bronx o Brooklyn.*/
db.NovaYork.find({"borough": {"$in":["Staten Island", "Queens", "Bronx", "Brooklyn"]}},{_id: 0, adress: 0, grades: 0, });

/* QUERY 19: Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que no pertanyen a Staten Island 
o Queens o Bronx o Brooklyn.*/
db.NovaYork.find({"borough": {$not:{"$in":["Staten Island", "Queens", "Bronx", "Brooklyn"]}}},{_id: 0, adress: 0, grades: 0, });

/* QUERY 20: Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que aconsegueixin un marcador que no 
és més de 10. */
db.NovaYork.find({$expr:{$lt:[{"$sum":"$grades.score"},10]}},{_id: 0, address: 0, grades: 0});

/* QUERY 21: Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que preparen peix excepte 'American' i 
'Chinees' o el name del restaurant comença amb lletres 'Wil'. */
// I com ser quines cartes tenen peix i quines no.

/* QUERY 22: Escriu una consulta per trobar el restaurant_id, name, i grades per a aquells restaurants que aconsegueixin un grau "A" i un score 11 
en dades d'estudi ISODate "2014-08-11T00:00:00Z". */
$expr:{$eq:[{"$sum":"$grades.score"},11]}

/* QUERY 23: Escriu una consulta per trobar el restaurant_id, name i grades per a aquells restaurants on el 2n element de varietat de graus conté 
un grau de "A" i marcador 9 sobre un ISODate "2014-08-11T00:00:00Z".*/
db.NovaYork.find(
    {
      $and:[
        {"grades.1.grade":"A"},
        {"grades.1.score":9},
        {"ISODate":("2014-08-11T00:00:00Z")}
      ]
    },
    {_id: 0, address: 0, borough: 0, cusine: 0}
    );

/* QUERY 24: Escriu una consulta per trobar el restaurant_id, name, adreça i ubicació geogràfica per a aquells restaurants on el segon element 
del array coord conté un valor que és més de 42 i fins a 52.*/
db.NovaYork.find(
    {"address.coord.1":{$gt:42, $lt:52}},
    {_id: 0, "address.building": 0, "address.street": 0, "address.zipcode": 0, borough: 0, cusine: 0, grades: 0}
    );

/* QUERY 25: Escriu una consulta per organitzar el nom dels restaurants en ordre ascendent juntament amb totes les columnes.*/
db.NovaYork.find({}).sort({"name":1});

/* QUERY 26: Escriu una consulta per organitzar el nom dels restaurants en ordre descendent juntament amb totes les columnes.*/
db.NovaYork.find({}).sort({"name":-1});

/* QUERY 27: Escriu una consulta per organitzar el nom de la cuisine en ordre ascendent i pel mateix barri de cuisine. Ordre descendent.*/
// no entenc això de "pel mateix barri de cuisine"

/* QUERY 28: Escriu una consulta per saber totes les direccions que no contenen el carrer.*/
db.NovaYork.find({"address.street":{$exists: true, $eq:""}});

/* QUERY 29: Escriu una consulta que seleccionarà tots els documents en la col·lecció de restaurants on el valor del camp coord és Double.*/
db.NovaYork.find({"address.coord":{$exists: true, $type: 'double'}});

/* QUERY 30: Escriu una consulta que seleccionarà el restaurant_id, name i grade per a aquells restaurants que retornin 0 com a resta després 
de dividir el marcador per 7.*/
db.NovaYork.find({
  $expr:{$eq:[{$mod:[{$sum:"$grades.score"},7]},0]}
},
//{totalscore: {$sum:"$grades.score"}}
{_id:0, address:0, borough:0, cuisine:0}
);

/* QUERY 31: Escriu una consulta per trobar el name de restaurant, borough, longitud i altitud i cuisine per a aquells restaurants que 
contenen 'mon' com tres lletres en algun lloc del seu nom.*/
db.NovaYork.find({name:{$regex:/mon/}},{name:1, borough:1, "address.coord":1});

/* QUERY 32: Escriu una consulta per trobar el name de restaurant, borough, longitud i latitud i cuisine per a aquells restaurants que 
contenen 'Mad' com primeres tres lletres del seu nom.*/
db.NovaYork.find({name:{$regex:/^Mad/}},{name:1, borough:1, "address.coord":1, cuisine:1});


