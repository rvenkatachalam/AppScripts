// The App script should be run from the Workbook where we have the data
// If not, then create another constant for Workbook ID and replace the getActiveSheet with Open Sheet with ID method

const PRESENTATION_ID = ''; //Set your presentation id here within single quote

function generatePresentationData() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let marketData = getDataFromSheet_(sheet);
  let slides = getSlides_();
  let slideLength = findSlideLength_(marketData);
  writeDataToPlayersSlide_(slides,marketData, slideLength);
}

// Get the Data from the sheet, the entire data range and return the array
function getDataFromSheet_(sheet) { 
  let dataRange = sheet.getDataRange();
  let data = dataRange.getValues();
  return data;
}

// To calculate the number of slides required to be duplicated from the base content
function findSlideLength_(marketData) { 
  let slideLength = 1;
  for (let index = 0; index < marketData.length-10; index= index + 10) { 
    slideLength++;
  }
  return slideLength+1;
}

// Open the slide on which we need to write the data
function getSlides_() { 
  let presentation = SlidesApp.openById(PRESENTATION_ID);
  let slides = presentation.getSlides();
  return slides;
}

// Write the data to slides, 10 rows at a time
function writeDataToPlayersSlide_(slides,marketData, slideLength) { 
  Logger.log(slideLength);
  for (let slideIndex = 1; slideIndex < slideLength; slideIndex ++) { 
    slidePlayers = SlidesApp.openById(PRESENTATION_ID).appendSlide(slides[0]);
    Logger.log(slideIndex);
    for (let index = 0; index < 10; index++) { 
      let dataRowIndex = (slideIndex-1)*10 + index;
      slidePlayers.replaceAllText(`tamil${index}`,marketData[dataRowIndex][0]);
      slidePlayers.replaceAllText(`english${index}`,marketData[dataRowIndex][1]);
    }
  }
}
