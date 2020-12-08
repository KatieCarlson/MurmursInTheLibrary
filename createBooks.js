// these colors will bbe used for the background of the book and the stripes
// so make sure any combination of two colors looks good
var colors = ['#f5e7d7', '#fffceb', '#ffffff'];

// you can adjust these, and keep in mind some might go over the Max if
// the height would've been higher than the screen
var widthMin = 100;
var widthMax = 250;

// I will start the episode number at 175
var num = 175;

// Make sure that these correlate exactly. title[0] is the first episode
// and height[0] is also the first episode
var titles = ['Roses are Red', 'Violets are Blue', 'You are so Pretty', 'I Hope I am too', 'Yodel-ay-he-whoo', 'Potato', 'Lemon'];
var height = [200, 0, 300, 0, 5, 100, 300];

// Keep these audio files in order so that the numbers of the episodes are
// always increasing.  Make sure you have the right file path as well
var a1 = { Number: 176, Filename: 'audio/review1.mp3' };
var a2 = { Number: 180, Filename: 'audio/review2.mp3' };
var a3 = { Number: 188, Filename: 'audio/review3.mp3' };
var a4 = { Number: 193, Filename: 'audio/review4.mp3' };
var a5 = { Number: 199, Filename: 'audio/review5.mp3' };

// Add all of the audio file objects to this array, in the same order
var audioFiles = [a1, a2, a3, a4, a5];

var widthTracker = 15;

function makeBooks() {
  var fileIterator = 0;
  if (titles.length != height.length) {
    alert('Length of Title and Height Array is not the same!');
    alert('Title Array Length: ' + titles.length + ' Height Array Length: ' + height.length);
  } else {
    for (var i = 0; i < titles.length; i++) {
      var colorRand = Math.floor(Math.random() * colors.length);
      var stripeRand = Math.floor(Math.random() * colors.length);
      while (stripeRand == colorRand) {
        stripeRand = Math.floor(Math.random() * colors.length);
      }

      var width = Math.floor(Math.random() * (widthMax - widthMin)) + widthMin;

      var upperStripe = document.createElement('div');
      upperStripe.style.backgroundColor = colors[stripeRand];
      upperStripe.classList.add('upper_stripe');

      var title = document.createElement('p');
      var t = '<center>Episode ' + (num + i) + ':<br>' + titles[i] + '</center>';
      title.innerHTML = t;

      var audio;
      var img;
      var audioFileExists = 0;
      if (fileIterator < audioFiles.length && audioFiles[fileIterator].Number == (num + i)) {
        audioFileExists = 1;
        audio = document.createElement('audio');
        audio.preload = 'auto';

        var sourceMpg = document.createElement('source');
        sourceMpg.src = audioFiles[fileIterator].Filename;
        sourceMpg.type = 'audio/mpeg';

        var sourceOgg = document.createElement('source');
        sourceOgg.src = audioFiles[fileIterator].Filename;
        sourceOgg.type = 'audio/ogg';

        audio.innerHTML = 'Your browser does not support this audio format.';
        audio.appendChild(sourceMpg);
        audio.appendChild(sourceOgg);

        img = document.createElement('img');
        img.src = 'speaker.png';
        fileIterator += 1;
      }

      var lowerStripe = document.createElement('div');
      lowerStripe.style.backgroundColor = colors[stripeRand];
      lowerStripe.classList.add('lower_stripe');

      // 250 + height =
      // 610 - h = marginT
      var ht = 250 + height[i];
      var mt = 610 - ht;
      if (ht > 800) {
        width += (ht - 800) / 2;
        ht = 800;
        mt = 610 - ht;
      }

      var book = document.createElement('div');
      book.style.width = width + 'px';
      book.style.height = ht + 'px';
      book.style.marginTop = mt + 'px';
      book.style.backgroundColor = colors[colorRand];
      book.classList.add('book');

      book.appendChild(upperStripe);
      book.appendChild(title);
      if (audioFileExists == 1) {
        book.appendChild(audio);
        book.appendChild(img);
      }

      book.appendChild(lowerStripe);

      widthTracker += 10 + width;

      document.getElementById('inner_wrapper').appendChild(book);

      $(function () {
        $('.book img').hover(
            function () {
                $(this).prev()[0].play();
              },

            function () {
                $(this).prev()[0].pause();
              }
        );
      });

    }

    var iw = document.getElementById('inner_wrapper');
    iw.style.width = widthTracker + 'px';
  }
}
