QUnit.test( "imageTest", function( assert ) {
  var image = new Image(0, 1, 2, 3, 4);
  assert.ok( image.colour === 0, "Colour Correctly Assigned" );
  assert.ok( image.posX === 1, "X-Position Correctly Assigned" );
  assert.ok( image.posY === 2, "Y-Position Correctly Assigned" );
  assert.ok( image.height === 3, "Height Correctly Assigned" );
  assert.ok( image.width === 4, "Width Correctly Assigned" );
});
