const { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP(fetchMyIP, (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  const coordsObject = {latitude: `${data['latitude']}`, longitude: `${data['longitude']}`};
  return coordsObject;
  
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

fetchISSFlyOverTimes({ latitude: '43.01470', longitude: '-81.30490' }, (error, fly) =>{
  if (error) {
    console.log("It didn't work!", error);
  }

  console.log(fly);
});
