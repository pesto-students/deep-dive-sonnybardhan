/* Q1 (*)
  Return the number of movies in the "movies" collection without using array.length
*/
const getMoviesCount = async (db) => {
  return db.collection('movies').count();
};

/* Q2 (*)
  Return the first movie with imdb rating = 9.2 and year = 1974.
  Also, use mongodb projections to only get title from mongodb as opposed
  to accessing title property from the object
*/
const movieRating = async (db) => {
  return db.collection('movieDetails').findOne( { $and: [ { "imdb.rating": 9 }, { "year": 1974 } ] }, {projection: {title: 1, _id: 0} });
};

/* Q3 (*)
  Return the number of movies written by all these people (exactly these people in this order):
  Roberto Orci
  Alex Kurtzman
  Damon Lindelof
  Gene Roddenberry
*/
const writersIntersection = async (db) => {
  return db.collection('movieDetails').find( {$and: [ {"writers": "Roberto Orci"}, {"writers": "Alex Kurtzman"}, {"writers": "Damon Lindelof"}, {"writers": "Gene Roddenberry"}  ] }).count()
};

/* Q4 (*)
  Return the number of movies written by any of the writers in Q3
*/
const writersUnion = async (db) => {
  return db.collection('movieDetails').find( {$or: [ {"writers": "Roberto Orci"}, {"writers": "Alex Kurtzman"}, {"writers": "Damon Lindelof"}, {"writers": "Gene Roddenberry"}  ] }).count()
};

/* Q5 (*)
  Return the number of movies in which actor is "Jackie Chan"
*/
const actor = async (db) => {
  return db.collection('movieDetails').find({ "actors": "Jackie Chan" }).count();
};

/* Q6 (*)
  Return the number of movies in which actor "Jackie Chan" is second
  in the array "actors"
*/
const positionalActor = async (db) => {
  return db.collection('movieDetails').find({ "actors.1": "Jackie Chan" }).count();
};

/* Q7 (*)
  Return the first movie with imdb rating greater than or equal to 9.0
  and less than or equal to 9.2
*/
const comparisonOperator = async (db) => {
  return db.collection('movieDetails').find({"imdb.rating": {$gte: 9, $lte: 9.2}}).count();
};

/* Q8 (*)
  Return the number of movies which have an actual rating opposed to
  being "UNRATED" or having no "rated" field at all
*/
const trimUnrated = async (db) => {
  return db.collection('movieDetails').find({ $and: [ {"rated": { $exists: true }}, {"rated": {$ne: "UNRATED"}}]}).count();
};

/* Q9 (*)
  Return number of movies in which "tomato" field exists but "tomato.rating" does not
*/
const unratedByTomato = async (db) => {
  return db.collection('movieDetails').find({ $and: [ {"tomato": { $exists: true }}, {"tomato.rating": { $exists: false}}]}).count();
};

/* Q10 (*)
  Return number of movies with higher imdb rating >= 9.0 OR
  metacritic >= 90
*/
const goodMovies = async (db) => {
  return db.collection('movieDetails').find({ $or: [ {"imdb.rating": { $gte: 9.0 }}, {"metacritic": { $gte: 90}}]}).count();
};

/* Q11 (*)
  Return number of movies where tomato field exists AND
  is equal to null
*/
//'should return title of the movie whose plot contains the words: Master Yoda'


const regexSearch = async (db) => {
  const temp = await db.collection('movieDetails').find({ "plot": { $regex: /Master Yoda/i } }).project({title: 1, _id: 0}).toArray();
  return temp[0];
};

/* Q12 (*)
  Return number of movies where 'Adventure' and 'Action'
  as genres in any order
*/
const arrayAll = async (db) => {
   // dbcollection.('movieDetails').find( { "genres": { $all: ["Action", "Adventure"] } } ).count();
  return db.collection('movieDetails').find({ $and: [ {"genres": "Action"}, {"genres": "Adventure"}]}).count();
  
};

/* Q13 (*)
  Return number of movies that were filmed in exactly 4 countries
*/
const fieldArraySize = async (db) => {
  return db.collection('movieDetails').find({ "countries": {$size: 4} }).count();
};

/* Q14 (*)
  return Add afield called "myRating" = 90 to the movie "Iron Man 3" in collection.('movieDetails') collection
*/
const addField = async (db) => {
  return db.collection('movieDetails').updateOne({ 
    title: "Iron Man 3"
  }, { 
    $set: { myRating: 90}
  });
};

/* Q15 (*)
  Increment the metacritic rating by 5 for the movie "Gone Girl" with a single query.
  Note: Do not use find() or findOne() to look for the current metacritic rating for "Gone Girl"
*/
const incrementalUpdate = async (db) => {
  return db.collection('movieDetails').updateOne({
    title: "Gone Girl"
  }, {
    $inc: {
      "metacritic": 5
    }
  });
};

module.exports = {
  getMoviesCount,
  movieRating,
  writersIntersection,
  writersUnion,
  actor,
  positionalActor,
  comparisonOperator,
  trimUnrated,
  unratedByTomato,
  goodMovies,
  regexSearch,
  arrayAll,
  fieldArraySize,
  addField,
  incrementalUpdate,
} ;