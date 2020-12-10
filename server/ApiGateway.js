const axios = require('axios');

/**
 * Responsible for sending out api calls and storing responses
 */
class ApiGateway {
    constructor(endpoint){
        this.endpoint = endpoint;
    }

    async apiCall(request){

      let res = await axios.get(this.endpoint + request, {headers: {'Accept': 'application/vnd.vegvesen.nvdb-v3-rev1+json'}});

      let data = res.data.objekter;

      while (res.data.metadata.antall !== data.length) {
        res = await axios.get(res.data.metadata.neste.href, {headers: {'Accept': 'application/vnd.vegvesen.nvdb-v3-rev1+json'}});
        data = data.concat(res.data.objekter);
      }
      return data;
    }

    async apiCallSingle(request){
      let res = await axios.get(this.endpoint + request, {headers: {'Accept': 'application/vnd.vegvesen.nvdb-v3-rev1+json', 'User-Agent': 'NorkartTest'}});
      console.log(res)
      let data = res.data;
      return data;
    }
}

module.exports = ApiGateway;