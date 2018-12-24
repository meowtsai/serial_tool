
function Serial_generator(size) {
    const strCandidate = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz'
    
    let code = [...Array(size)].map(i=>strCandidate[Math.random()*strCandidate.length|0]).join``;
    return code;
  }

  // export the class
  module.exports = Serial_generator;



