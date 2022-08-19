function generateScreenshots() {
  
  var presentationId = ""; // Presentation ID goes within the quote
  var presentation = SlidesApp.openById(presentationId);
  var baseUrl =
    "https://slides.googleapis.com/v1/presentations/{presentationId}/pages/{pageObjectId}/thumbnail";
  var parameters = {
    method: "GET",
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
    contentType: "application/json",
    muteHttpExceptions: true
  };

  // Log URL of the main thumbnail of the deck
  Logger.log(baseUrl);
  //Logger.log(DriveApp.getFiles().get(presentationId).thumbnailLink);

  // For storing the screenshot image URLs
  var screenshots = [];

  var slides = presentation.getSlides().forEach(function(slide, index) {
    var url = baseUrl
      .replace("{presentationId}", presentationId)
      .replace("{pageObjectId}", slide.getObjectId());
    var response = JSON.parse(UrlFetchApp.fetch(url, parameters));

    Logger.log(baseUrl);
    Logger.log(response.contentUrl);
    

    // Upload Google Slide image to Google Drive
    var blob = UrlFetchApp.fetch(response.contentUrl).getBlob();
    DriveApp.createFile(blob).setName("Image " + (index + 1) + ".png");

    screenshots.push(response.contentUrl);
  });

  return screenshots;
}
