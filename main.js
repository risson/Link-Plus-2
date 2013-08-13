/*Onclick event for outlineButton*/
function outlineClick(e) {
  if (e.target.id=="outlineButton") {
 
  findAllLinks(document);
  $('#outlineButton').hide();

  //Listen to click event to  all link elements
  allLinkClick();

  //Show alias when hover over link
  showAlias();
  }
}

/*Find out all the linked element*/
function findAllLinks (contentDocument) {
  var aElement = contentDocument.querySelectorAll("a");
  
  for(var i=0; i<aElement.length; i++)
  {
    if (aElement[i].firstChild.nodeName == "IMG")
    {
      aElement[i].firstChild.setAttribute("class", "links");
    }
    else
    {
      aElement[i].setAttribute("class", "links");
    }
  }
  
}

/*Find if the links are clicked or not*/
function allLinkClick () {
  //Listen to click event to  all link elements
  $("a").mousedown(function(event){
    //Add alias to html and mark which alias has been selected
    if (getAliasVal()!= undefined) {
      $(this).attr("aliasID",getAliasID());
      $(this).attr("alias",getAliasVal());
      
      alert(getAliasVal());

      
      var selectedAliasList = new Array();

      $("a").each(function() {
        var selectedRadio = $(this).attr("aliasID");
        if(selectedRadio != undefined) {
          
          if(selectedAliasList.indexOf(selectedRadio)==-1) {
            selectedAliasList.push(selectedRadio);
          }

          //Mark if the link element has chosen alias
          var linkElement = $(this).get(0);
          if (linkElement.firstChild.nodeName == "IMG") {
            var cn = linkElement.firstChild.className;
            //console.log(cn.indexOf("selectedAlias"));
            if(cn.indexOf("selectedAlias") == -1) 
              linkElement.firstChild.className += " selectedAlias";
          }
          else {
            var cn = linkElement.className;
            //console.log(cn.indexOf("selectedAlias"));
            if(cn.indexOf("selectedAlias") == -1)
              linkElement.className += " selectedAlias";
          }
        }
      });

      //Mark which alias has been selected
      for(var i=0; i<aliasNum; i++){
        //console.log(selectedAliasList.indexOf("radio"+i));
        if(selectedAliasList.indexOf("radio"+i)==-1) {

          $("label[for='radio"+i+"']").css("color","black");
        }
        else $("label[for='radio"+i+"']").css("color","red");
      }


    }
    else alert("You haven't selected alias!");
  });
}

/*Get selected radio value*/
function getAliasVal() {
  return $("input[type='radio']:checked").val();
}

/*Get selected radio id*/
function getAliasID() {
  return $("input[type='radio']:checked").attr("id");
}

/*Show alias if there is one*/
function showAlias () {
  //Listen to hover event to all link elements
  $("a").hover(function(event){
    if($(this).attr("alias"))
      $("#current_alias").html($(this).attr("alias"));
    else
      $("#current_alias").html('');
  });

}

/*Function append stylesheet*/
function appendStyleSheet(fileName, stylesheetId) {
  var fileref=document.createElement("link") 
  fileref.rel = "stylesheet"; 
  fileref.type = "text/css"; 
  fileref.href = fileName; 
  fileref.media="screen"; 
  fileref.id = stylesheetId;
  var headobj = document.getElementsByTagName('head')[0]; 
  headobj.appendChild(fileref); 
}

/*Remove stylesheet*/
function removeStyleSheet(stylesheetId) {
  var el = document.getElementById(stylesheetId);
  el.parentNode.removeChild(el);
}

/*Function append javascript*/
function appendScript(fileName, scriptId) {
  var headID = document.getElementsByTagName("head")[0];         
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = fileName;
  newScript.id = scriptId;
  headID.appendChild(newScript);
}

/*Remove javascript*/
function removeScript(scriptId) {
  var el = document.getElementById(scriptId);
  el.parentNode.removeChild(el);
}

/*Action after the upload_alias button is clicked*/
function aliasClick(e) {
  if (e.target.id=="upload_alias") {
  
  var list = document.all.alias_input.value.split('\n');
  aliasNum = list.length;

  //if alias list is not empty
  for(var i=0; i<aliasNum; i++)
  {
    if(list[i]!="" && list[i].match(/[^\s]/)) {

      $("#aliasList").append('<input type="radio" name="alias_item" id="radio'+i+'" value="'+list[i]+'">');
      $("#aliasList").append('<label for="radio'+i+'">'+list[i]+'</label><br />');
    }
  }
  $('#alias_input').hide();
  $('#upload_alias').hide(); 
  }
}

/*Action after the output button is clicked*/
function outputClick(e) {
  if (e.target.id=="output") {

    $('a').removeAttr('aliasID');
    $('a').removeAttr('class');
    $('img').removeAttr('class');
    $('a').each(function() {


      if($(this).attr('href')=="%%view_email_url%%" || 
        $(this).attr('href')=="%%ftaf_url%%" || 
        $(this).attr('href')=="EddieBauerEmail@em.eddiebauer.com" || 
        $(this).attr('href')=="http://pages.em.eddiebauer.com/Unsubscribe/?mail=%%mail%%") ;

      else
        $(this).attr('conversion', 'true');
    });

    var el = document.getElementById('aliasSidebar');
    el.parentNode.removeChild(el);
    removeStyleSheet("sidebarCss");
    removeStyleSheet("outlineCss");
    removeScript("mainScript");
    removeScript("jquery");

    var outputHTML = document.documentElement.outerHTML;
    
	$('head').empty();
	
	$('<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />').appendTo($('head'));
	
	$('\
	<style type="text/css">\
	#linkplus_final_result {\
	width: 1200px;\
	height: 900px;\
	}\
	</style>\
	').appendTo($('head'));
	
	$('body').empty();
	
	$('body').append('\
	<textarea id="linkplus_final_result">' + outputHTML + '</textarea>');
		
  }
}

/*Remove all the child nodes in an element*/
function removeAllChildNodes(elementId) {
  var el = document.getElementById(elementId);
  while( el.hasChildNodes() ){
      el.removeChild(el.lastChild);
  }
}

$('#outlineButton').click(outlineClick);
$('#upload_alias').click(aliasClick);
$('#output').click(outputClick);
