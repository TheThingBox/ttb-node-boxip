module.exports = function(RED) {
  "use strict";
  var exec = require('ttbd-exec');

  function main(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    var opt = {hydra_exec_host: "mosquitto"};

    this.on('input', function (msg) {
      var ip = "127.0.0.1";
      exec('hostname -I', opt, function(err, stdout, stderr){
        if(!stdout){
          let ips = stdout.split(' ').filter(e => !e.startsWith('169.254') && !e.startsWith('172.'))
          if(ips.length !== 0){
            ip = ips[0]
          }
        }
        msg.boxip = ip;
        msg.payload = msg.boxip;
        msg.message = "The IP Address is " + msg.boxip;
        node.send(msg);
      })
    });
  }
  RED.nodes.registerType("boxip", main);
}
