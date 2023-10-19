import React, { useEffect } from "react";

function IntroductionText() {
	useEffect(() => {
		// Define your ranges
	}, []);

	return (
		<div id="introduction">
			<h1>Introduction</h1>
			<p>
				This piece is about a trip. A long drive from the east coast of the
				United States of America to the west. This first part of the piece is
				you scrolling and reading through the text. Read it in your own time.
				Also, be sure to read this and all of the following text every time the
				piece is performed. So that you just don't scroll past it.
			</p>
			<p>
				At times you will see text that look like this:{" "}
				<span>This is how the text looks like, orange and big. </span>
				This is text that you are supposed to read out loud (never read the
				above text though). Phrase these words in any manner that you want but
				make sure to articulate it and say it loud so that the audience can hear
				your voice over what's going on in the speakers.
			</p>
			<p id="first">
				In the speakers, initially the audio coming from the speakers will be
				recordings representing the sounds that are somehow connected to the
				text. For example, if you have gotten the text that is about Las Vegas,
				the audio coming from your speaker will be sounds from a casino. One
				audio file might already have been triggered, the piece has begun!
			</p>
			<p>
				Worth mentioning is also that you will get different parts of the story
				each time this piece is performed, so sometimes you might get the text
				about Las Vegas, sometimes you will read about arriving in San
				Fransisco. At some point, after many rehearsals or performances, you
				will have a more complete story. With that said, let's get started.
			</p>
			<br />
			<br />
			<br />
			<br />
			<br />
		</div>
	);
}

export default IntroductionText;
