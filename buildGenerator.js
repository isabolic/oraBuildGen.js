
    var
	//require libs
    PropertiesReader = require('properties-reader') ,
    fs               = require('fs')                ,
    Promise          = require('promise')           ,
    deferred         = require('deferred')          ,
    lineReader       = require('readline')          ,
    // config
    properties     = new PropertiesReader('db.mapping.properties') ,
    changelogChunk = null                                          ,
    buildFile      = null                                          ,
    recompileFile  = null                                          ,
    ddlKeyWords    = []                                            ,
    config         = null                                          ,
    invalidFile    = null                                          ;

/**
 * [createFile create new file]
 * @param  {String}   fileName [name of the newly file]
 * @param  {String}   content  [content of the newly file]
 * @param  {Function} callback [callback fn, if this is not provided, add def.]
 */
var createFile = function (fileName, content, callback) {

    if(callback === undefined){
        callback = 
            function(err) {
                if (err) {
                    throw err;
                }
                console.log("created '" + fileName + "' file...");
            }
    }

    fs.writeFile(fileName,
        content,
        callback
    );
};

var checkDirectory = function(directory, callback) {  
  fs.stat(directory, function(err, stats) {
    //Check if error defined and the error code is "not exists"
    if (err && err.errno === -2) {
      fs.mkdir(directory, callback);
    } else {
      callback(err);
    }
  });
}

/**
 * [loadConfig load config from json file]
 */
var loadConfig = function (){
    var fsObj = null, def = deferred();

    //global scope set
    config         = JSON.parse(fs.readFileSync("config.json")) ;
    ddlKeyWords    = config.ddlKeyWords                         ;
    recompileFile  = config.recompileFile                       ;
    changelogChunk = config.changelogChunk                      ;
    buildFile      = config.buildFile                           ;
    invalidFile    = config.invalidFile                         ;

    debugger;

    if(config.outputDir){
        checkDirectory(
            config.outputDir,
            function(err) {
                
                if (err) {
                    throw err;
                }
                
                buildFile     = config.outputDir + config.buildFile;
                invalidFile   = config.outputDir + config.invalidFile;
                recompileFile = config.outputDir + config.recompileFile;
                def.resolve();
            }
        );            
    } else {
        def.resolve();
    }

    return def.promise();

}

/**
 * [writeCallTestConnection write test call for connection to db]
 */
var writeCallTestConnection = function (){
    var 
    listOfDBUsers = getListOfMappedUsers(),
    callTest      = ""                    ;

    fs.appendFile(
            buildFile,
            config.commentVarifyConn,
            function(err) {
                if (err) {
                    throw err;
                }
                console.log("write line test connection on db...");
            }
        );
        
    for (var i = 0; i < listOfDBUsers.length; i++) {
                
        callTest += config.errorHandlerExit;

        callTest += config.logPrefix + config.connectTestBefore
                                             .replace("#DB#", properties.get("db.user." + listOfDBUsers[i]));
        
        callTest += config.connectTest
                          .replace("#DB#", properties.get("db.user." + listOfDBUsers[i]));

        callTest += config.logPrefix + config.connectTestAfter
                                             .replace("#DB#", properties.get("db.user." + listOfDBUsers[i]));

        if(i !== (listOfDBUsers.length - 1)){
            callTest += config.spaceChunk;    
        }

        fs.appendFile(
            buildFile,
            callTest,
            function(err) {
                if (err) {
                    throw err;
                }
            }
        );
        callTest = "";
    } 

    fs.appendFile(
            buildFile,
            config.commentVarifyConnEnd + config.spaceChunk,
            function(err) {
                if (err) {
                    throw err;
                }
            
            }
        );
}

/**
 * [writeInstallSpool write install spool to build file]
 */
var writeInstallSpool =  function (){
    var installSpoolCommand = config.errorHandlerContinue.join("") + 
                              config.newLine + 
                              config.installLog +  
                              config.spaceChunk;

    fs.appendFile(
            buildFile,
            installSpoolCommand,
            function(err) {
                if (err) {
                    throw err;
                }
            
            }
        );
}

/**
 * [writeSpooloff write "SPOOL OFF" command to appropriate file]
 * @param  {String} file [filepath]
 */
var writeSpooloff =  function (file){
    var installSpoolCommand = config.spoolOff +  config.spaceChunk;

    fs.appendFile(
            file,
            installSpoolCommand,
            function(err) {
                if (err) {
                    throw err;
                }
            
            }
        );
}

var getTimeStamp = function () {
    var date   = new Date(), datevalues;
    
    datevalues = [
       date.getDate(), 
       ".",
       date.getMonth()+1,
       ".",
       date.getFullYear(),
       " ",
       date.getHours(),
       ":",
       date.getMinutes(),
       ":",
       date.getSeconds(),
       " "
    ];

    return datevalues;
}

var p = new Promise(function(resolve, reject) {
    var header, def;
    def = loadConfig();
    
    def.done(function(){
        header = config.header.join("");
        header = header.replace("#TIME#", getTimeStamp().join("")); 
    
        createFile(
            buildFile, 
            header + config.spaceChunk, 
            function(err) {
                if (err) {
                    throw err;
                }
                console.log("created '" + buildFile + "' file...");
                writeInstallSpool();
                writeCallTestConnection();
                resolve();
            }
        );    
    })
        
});

/**
 * [checkIfApex check if mapped user is apex]
 * @param  {String} user [mapped user]
 */
var checkIfApex = function (user) {
    if(user.toUpperCase() === "APEX"){
        return true;
    } else {
        return false;
    }
}

/**
 * [writeCallRecompile build recompile file and add call]
 */
var writeCallRecompile = function (){
    var 
    listOfDBUsers     = getListOfMappedUsers(),
    recompileCommand  = "",
    fileName          = config.outputDir ? 
                        recompileFile.replace(config.outputDir, "") 
                        : recompileFile,
    header;
    
    header = config.header.join("");
    header = header.replace("#TIME#", getTimeStamp().join("")); 

    createFile(recompileFile, header);


    for (var i = 0; i < listOfDBUsers.length; i++) {
        
        if(i === 0){
            recompileCommand += config.spaceChunk + config.recompileSpool + config.spaceChunk;
        }

        // ignore apex mapped user
        if(checkIfApex(listOfDBUsers[i]) === true){
            continue;
        }

        recompileCommand += config.newLine + 
                            config.logPrefix + 
                            " " + 
                            config.logUserMsg.replace("#DB#", properties.get("db.user." + listOfDBUsers[i])) + 
                            config.spaceChunk;
        
        recompileCommand += config.connectCommand
                                  .join("")
                                  .replace("#DB#", properties.get("db.user." + listOfDBUsers[i]));
        

        recompileCommand += config.errorHandlerContinue.join("") + config.spaceChunk;
        recompileCommand += config.recompileCommand.replace("#USER#", listOfDBUsers[i]);

        recompileCommand += config.spaceChunk;

        fs.appendFile(
            recompileFile,
            recompileCommand,
            function(err) {
                if (err) {
                    throw err;
                }
                console.log("write line recompile objects list...");
            }
        );
        recompileCommand = "";
    } 

    writeSpooloff(recompileFile);

    // apend call to primary .sql file
    fs.appendFile(buildFile,
        config.logPrefix   + " " + fileName  + ";" + config.newLine +
        config.includeChar + " " + fileName  + ";" + config.spaceChunk,
        function(err) {
            if (err) {
                throw err;
            }
        }
    );
}

/**
 * [writeCallInvalid build invalid file and add call]
 */
var writeCallInvalid = function(){
    var 
    listOfDBUsers     = getListOfMappedUsers(),
    fileName          = config.outputDir ? invalidFile.replace(config.outputDir, "") : recompileFile,
    getInvalidCommand = "",
    header;
    
    header = config.header.join("");
    header = header.replace("#TIME#", getTimeStamp().join("")); ;

    createFile(invalidFile, header);

    for (var i = 0; i < listOfDBUsers.length; i++) {

        if(i === 0){
            getInvalidCommand += config.spaceChunk + config.InvalidSpool + config.spaceChunk;
        }

        // ignore apex mapped user
        if(checkIfApex(listOfDBUsers[i]) === true){
            continue;
        }
       
        
        getInvalidCommand += config.newLine + 
                             config.logPrefix + 
                             " " + 
                             config.logUserMsg.replace("#DB#", properties.get("db.user." + listOfDBUsers[i])) +
                             config.spaceChunk;

        getInvalidCommand += config.connectCommand
                                .join("")
                                .replace("#DB#", properties.get("db.user." + listOfDBUsers[i]));

        getInvalidCommand += config.errorHandlerContinue.join("") + config.spaceChunk;

        getInvalidCommand += config.exportSQL;

        fs.appendFile(
            invalidFile,
            getInvalidCommand,
            function(err) {
                if (err) {
                    throw err;
                }
                console.log("write line export invalid objects list...");
            }
        );
        getInvalidCommand = "";
    }

    writeSpooloff(invalidFile);

     // apend call to primary .sql file
    fs.appendFile(buildFile,
        config.logPrefix   + " " + fileName  + ";" + config.newLine +
        config.includeChar + " " + fileName  + ";" + config.spaceChunk,
        function(err) {
            if (err) {
                throw err;
            }
        }
    );
}

/**
 * [getListOfMappedUsers get list of mapped user]
 * @return {Array} [list of db users]
 */
var getListOfMappedUsers = function() {
    var users     = properties.getByRoot("db.user"),
    listOfDBUsers = [];

    for (var key in users) {
        listOfDBUsers.push(key);
    }

    return listOfDBUsers;
}

var  tryToSetConnection = function(line, lastConnectedUser){
    var connectCommand    = "", 
        noUserFound       = true,
        listOfDBUsers     = getListOfMappedUsers();

    for (var i = 0; i < listOfDBUsers.length; i++) {
        if (line.toUpperCase().indexOf(listOfDBUsers[i].toUpperCase() + ".") > -1 && 
            lastConnectedUser !== listOfDBUsers[i]) {

            connectCommand += config.connectCommand
                                    .join("")
                                    .replace("#DB#", properties.get("db.user." + listOfDBUsers[i]));

            connectCommand += config.errorHandlerContinue.join("") + config.spaceChunk;

            lastConnectedUser = listOfDBUsers[i];

            if (connectCommand !== "") {
                line = "\n" + connectCommand + line;
                connectCommand = "";
            }

            
            noUserFound = false;

            break;
        }
    }
    
    return  {"line" : line, "noUserFound": noUserFound};
}

p.then(function() {

    var 
        lR                = null,
        connectCommand    = "",
        multipleLine      = "",
        listOfDBUsers     = getListOfMappedUsers(),
        lastConnectedUser = null,
        noUserFound       = true,
        log, isDDL        = false,
        ret;
        //tryToSetConnection;

    lR = lineReader.createInterface({
        input: fs.createReadStream(changelogChunk)
    });

    /*tryToSetConnection = function(line){
        
        for (var i = 0; i < listOfDBUsers.length; i++) {
            if (line.toUpperCase().indexOf(listOfDBUsers[i].toUpperCase() + ".") > -1 && 
                lastConnectedUser !== listOfDBUsers[i]) {

                connectCommand += config.connectCommand
                                        .join("")
                                        .replace("#DB#", properties.get("db.user." + listOfDBUsers[i]));

                connectCommand += config.errorHandlerContinue.join("") + config.spaceChunk;

                lastConnectedUser = listOfDBUsers[i];

                if (connectCommand !== "") {
                    line = "\n" + connectCommand + line;
                    connectCommand = "";
                }

                
                noUserFound = false;

                break;
            }
        }
    
        return line;
    }*/

    writeCallInvalid();
      
    lR.on("line", function(line) {
        
        if (line.startsWith("@")) {

            // apex components/pages etc..
            if (line.toUpperCase().indexOf("APEX") > -1 && lastConnectedUser !== "apex") {
                connectCommand += config.connectCommand
                    .join("")
                    .replace("#DB#", properties.get("db.user.apex"));

                connectCommand += config.errorHandlerContinue.join("") + config.spaceChunk;

                lastConnectedUser = "apex";
                noUserFound = false;
            }

            if (lastConnectedUser === "apex") {
                noUserFound = false;
            }

            // since is a include (package, gen_scripts.. etc) try to get user 
            for (var i = 0; i < listOfDBUsers.length; i++) {
                if (line.toUpperCase().indexOf(listOfDBUsers[i].toUpperCase() + "/") > -1 && lastConnectedUser !== listOfDBUsers[i]) {
                    connectCommand += config.connectCommand
                        .join("")
                        .replace("#DB#", properties.get("db.user." + listOfDBUsers[i]));

                    connectCommand += config.errorHandlerContinue.join("") + config.spaceChunk;

                    lastConnectedUser = listOfDBUsers[i];
                    noUserFound = false;
                }

                if (line.indexOf(listOfDBUsers[i] + "/") > -1 && lastConnectedUser === listOfDBUsers[i]) {
                    noUserFound = false;
                }
            }

            if (noUserFound === true) {
                console.log("for line : '" + line + "'...user not found");
            }

            line =  config.newLine +
                    config.logPrefix + " " +    // because some devs sets "@hrmbl/pack..." for include needs to be space between like "@ hrmbl/pack.."
            		line.replace(config.includeChar, "").trim() + 
            		config.newLine +
            		config.includeChar +  " " + // because some devs sets "@hrmbl/pack..." for include needs to be space between like "@ hrmbl/pack.."
            		line.replace(config.includeChar, "").trim();

            if (connectCommand !== "") {
                line = config.newLine + connectCommand + line;
                connectCommand = "";
            }

            line += config.newLine;
            line += "/";
	        line += config.spaceChunk;	        

        } else {
            for (var i = 0; i < ddlKeyWords.length; i++) {
                if (line.toUpperCase().indexOf(ddlKeyWords[i]) > -1) {
                    isDDL = true;
                    
                    
                    if(line.indexOf(";") > -1){                    
                        line = multipleLine + line;
                        multipleLine = "";

                        line += config.notifyDDL;                        
                        line += "/";
                        line += "\n";

                        isDDL = false;
                        
                        ret     = tryToSetConnection(line, lastConnectedUser);

                        line        = ret.line;
                        noUserFound = ret.noUserFound;

                    }else {
                        multipleLine += line;
                        line = "";
                    }
                }
            }

            /*if(line.indexOf(";") > -1 && isDDL === true && multipleLine !== ""){
                line = multipleLine + line;
                multipleLine = "";

                line += "\n";
                line += config.notifyDDL;
                line += "/";
                line += "\n";
                isDDL = false; 

                line = tryToSetConnection(line);
                
            }else if(isDDL === true && multipleLine !== ""){
                multipleLine += line;
                line = "";
            }

            if (multipleLine !== ""){
                multipleLine += "\n";
            }*/

            if(line !== ""){
                line += "\n";    
            }            
        }

        if(line !== ""){
            fs.appendFile(
                buildFile,
                line,
                function(err) {
                    if (err) {
                        throw err;
                    }
                }
            );
        }
        noUserFound = true;

    }).on("close", function() {
        writeCallRecompile();
        fs.appendFile(
            buildFile,
            config.exit.join(""),
            function(err) {
                if (err) {
                    throw err;
                }
            }
        );
    })
});
