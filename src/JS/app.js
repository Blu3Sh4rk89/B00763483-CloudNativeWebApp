//The URIs of the REST endpoint
VUPS = "https://prod-13.ukwest.logic.azure.com:443/workflows/f05796eedbdb463c81b6af4857e448dd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6J7XHyZBP8aQ2CZdE9kiacJy-Hv9NrFiEp-7MfGiP5Q";
RAV = "https://prod-23.ukwest.logic.azure.com:443/workflows/77256ebd8f6d4e0ea326e96bb0db9939/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LMWMJdpMpJyY8jCqiYFlpWIYqvVNOTK-OKg_DBt729s";
DIV = "https://prod-00.ukwest.logic.azure.com:443/workflows/e7722f9d16f6455cb342960aa6866ffb/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=txZALkJt0RhCBfuojrwyST8T2VH5LFqLMViMDwFu4vs";
BLOB_ACCOUNT = "https://com682cloudnativeblob.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retVideos").click(function(){

      //Run the get asset list function
      getVideos();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  });
  
  $("#delVideo").click(function(){

    deleteVideo();
    
  });

  $("#updateVideo").click(function(){

    updateVideo();
    
  });
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){

  //Create a form data object
  submitData = new FormData();
  
  //Get form variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $('#UpFile')[0].files[0]);

  //Post the form data to the endpoint
  $.ajax({
    url: VUPS,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){

    }
  });
 

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos(){

//Replace the current HTML in that div with a loading message
 $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

 $.getJSON(RAV, function( data){

  //Create an array to hold all the retrieved assets
  var items = [];

  //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val){

      items.push("<hr />");
      items.push("<img src=" + BLOB_ACCOUNT + val["filePath"] + "width='400'/><br />");
      items.push("File: " + val["fileName"] + "<br />");
      items.push("Uploaded by:" + val[userName] + "(user id: " + val["userID"] + ")<br />");
      items.push("<hr />");
    });

    //Clear the assetlist div
    $('#VideoList').empty();

    //Append the contents of the items array to the VideoList div
    $("<ul/>",{
      "class":"my-new-list",
      html: items.join("")
    }).appendTo("VideoList");
 });
}

function deleteVideo(){


}

