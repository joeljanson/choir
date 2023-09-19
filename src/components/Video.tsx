import React from "react";

import "../css/Video.scss";

interface VideoProps {
	src: string; // URL to your video file
}

const VideoPlayer: React.FC<VideoProps> = ({ src }) => {
	return (
		<video autoPlay loop playsInline muted controls={false}>
			<source src={src} type="video/mp4" />{" "}
			{/* Change the type if your video format is different */}
			Your browser does not support the video tag.
		</video>
	);
};

export default VideoPlayer;
